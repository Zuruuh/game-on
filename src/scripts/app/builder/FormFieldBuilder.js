'use strict';

import { MinLength } from '../constraints/MinLength';
import { NotBlank } from '../constraints/NotBlank';
import { MaxLength } from '../constraints/MaxLength';
import { Email } from '../constraints/Email';
import { Numeric } from '../constraints/Numeric';
import { Required } from '../constraints/Required';
import { IsDate } from '../constraints/IsDate';

/**
 * @typedef {import('./FormBuilder').FormBuilder} FormBuilder
 * @typedef {import('../constraints/_Validator')._Validator} Validator
 */

export class FormFieldBuilder {
  /**
   * @type {FormBuilder}
   * @readonly
   */
  formBuilder;

  /**
   * @type {String}
   * @readonly
   */
  name;

  /**
   * @type {HTMLInputElement|HTMLUListElement}
   */
  #cachedElement;

  /**
   * @type {Validator[]}
   */
  validators = [];

  /**
   * @type {'single'|'multiple'}
   * @readonly
   */
  #type;

  /**
   * @param {FormBuilder} formBuilder
   * @param {string} name
   * @param {'single'|'multiple'} type
   */
  constructor(formBuilder, name, type) {
    this.formBuilder = formBuilder;
    this.name = name;
    this.#type = type;
  }

  get isSingle() {
    return this.#type === 'single';
  }

  get isMultiple() {
    return this.#type === 'multiple';
  }

  /**
   * @alias FormFieldBuilder.getForm
   *
   * @return {FormBuilder}
   */
  done() {
    return this.getForm();
  }

  /**
   * @return {FormBuilder}
   */
  getForm() {
    return this.formBuilder;
  }

  /**
   * Adds a new field to the form
   *
   * @param {string} name Must be unique throughout the form, must reflect the *name* attribute of the html input element
   * @param {"single"|"multiple"} type
   *
   * @return {FormFieldBuilder}
   */
  add(name, type = 'single') {
    return this.formBuilder.add(name, type);
  }

  get element() {
    if (this.#cachedElement) {
      return this.#cachedElement;
    }

    let element;

    if (this.isMultiple) {
      element = this.formBuilder.form.querySelector(
        `ul[data-name=${this.name}]`
      );
    } else {
      element = this.formBuilder.form.querySelector(
        `input[name="${this.name}"]`
      );
    }

    const isValidHTMLElement =
      element instanceof HTMLUListElement ||
      element instanceof HTMLInputElement;

    if (!element || !isValidHTMLElement) {
      throw new Error(
        `Could not find a valid html element with name ${this.name} in the form ${this.formBuilder.form}`
      );
    }

    this.#cachedElement = element;

    return element;
  }

  //! Constraints

  /**
   * @see NotBlank
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  notBlank(message) {
    this.validators.push(new NotBlank({ message }));

    return this;
  }

  /**
   * @see MinLength
   * @param {number} min
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  min(min, message) {
    this.validators.push(new MinLength({ min, message }));

    return this;
  }

  /**
   * @see MaxLength
   * @param {number} max
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  max(max, message) {
    this.validators.push(new MaxLength({ max, message }));

    return this;
  }

  /**
   * @see Email
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  email(message) {
    this.validators.push(new Email({ message }));

    return this;
  }

  /**
   * @see Numeric
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  number(message) {
    this.validators.push(new Numeric({ message }));

    return this;
  }

  /**
   * @see Required
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  required(message) {
    this.validators.push(new Required({ message }));

    return this;
  }

  /**
   * @see IsDate
   * @param {string} message
   *
   * @return {FormFieldBuilder}
   */
  date(message) {
    this.validators.push(new IsDate({ message }));

    return this;
  }
}
