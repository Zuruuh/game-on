'use strict';

import { Modal } from './Modal';
import { FormValidator } from '../validator/FormValidator';

/**
 * @typedef {import('../builder/FormBuilder').FormBuilder} FormBuilder
 */

export class FormModal extends Modal {
  /**
   * @type {FormValidator}
   * @readonly
   */
  formValidator;

  /**
   * @type {function(SubmitEvent): *}
   * @readonly
   */
  onSubmit;

  get form() {
    return this.formValidator.form;
  }

  get formBuilder() {
    return this.formValidator.formBuilder;
  }

  /**
   * @param {FormBuilder} formBuilder
   * @param {string} modalSelector The CSS Selector which will be used to get the element from the DOM
   * @param {string[]} buttonsSelectors The CSS Selector for the buttons which will trigger the modals to show up.
   * @param {function(SubmitEvent): *} onSubmit
   */
  constructor(formBuilder, modalSelector, buttonsSelectors, onSubmit) {
    super(modalSelector, buttonsSelectors);

    this.formValidator = new FormValidator(formBuilder);
    this.onSubmit = onSubmit;

    this.#registerListeners();
  }

  /**
   * @listens ["submit","change"]
   */
  #registerListeners() {
    this.formValidator.form.addEventListener('submit', this.submit.bind(this));

    // TODO: Listen on change on all inputs to validate in real time ()
  }

  /**
   * Callback called when form is submitted
   *
   * @param {SubmitEvent} event
   */
  submit(event) {
    event.preventDefault();
    const errors = this.formValidator.validateForm();

    if (errors === true) {
      this.onSubmit(event);

      return;
    }

    this.#displayErrors(errors);
  }

  /**
   * Display errors in form html element
   *
   * @param {Record<string, string[]>} errors
   */
  #displayErrors(errors) {
    Object.entries(errors).forEach(([fieldName, [error]]) => {
      const element = this.formBuilder.getFieldByName(fieldName).element;

      if (error) {
        element.parentElement.setAttribute('data-error', error);
      } else {
        element.parentElement.removeAttribute('data-error');
      }
    });
  }
}
