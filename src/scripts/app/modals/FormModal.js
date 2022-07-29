'use strict';

import { Modal } from './Modal';
import { FormValidator } from '../validator/FormValidator';

/**
 * @typedef {import('../builders/FormBuilder').FormBuilder} FormBuilder
 */

export class FormModal extends Modal {
  /**
   * @type {FormValidator}
   * @readonly
   */
  formValidator;

  /**
   * @type {function(SubmitEvent, Record<string, *>): *}
   * @readonly
   */
  onSubmit;

  get form() {
    return this.formValidator.form;
  }

  get formBuilder() {
    return this.formValidator.formBuilder;
  }

  get formFields() {
    return this.formBuilder.fields;
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
   * @listens ["submit","focusout","input"]
   */
  #registerListeners() {
    this.formValidator.form.addEventListener('submit', this.submit.bind(this));

    this.formFields.forEach((field) => {
      if (field.isMultiple) {
        return;
      }
      // Revalidates the field when use leaves it.
      field.element.addEventListener('focusout', (event) => {
        const errors = this.formValidator.validateField(field);

        field.displayErrors(errors);
      });

      field.element.addEventListener('input', (event) => {
        field.container.removeAttribute('data-error');
        if (field.debounceTimeout) {
          clearTimeout(field.debounceTimeout);
        }

        field.debounceTimeout = setTimeout(() => {
          const errors = this.formValidator.validateField(field);

          field.displayErrors(errors);
        }, 3000);
      });
    });
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
      const data = Array.from(new FormData(event.target).entries())
        .map(([key, value]) => ({ [key]: value }))
        .reduce((previous, current) => ({ ...previous, ...current }));

      this.onSubmit(event, data);

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
