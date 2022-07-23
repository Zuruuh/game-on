'use strict';

import { FormFieldBuilder } from './FormFieldBuilder';

export class FormBuilder {
  /**
   * @type {HTMLFormElement}
   * @readonly
   */
  form;

  /**
   * @type {FormFieldBuilder[]}
   */
  fields = [];

  /**
   * @param {HTMLFormElement} form
   */
  constructor(form) {
    if (!(form instanceof HTMLFormElement)) {
      throw new Error('Invalid html element passed to form builder!');
    }

    this.form = form;
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
    const field = new FormFieldBuilder(this, name, type);
    this.fields.push(field);

    return field;
  }

  /**
   * @param {string} fieldName
   *
   * @return {?FormFieldBuilder}
   */
  getFieldByName(fieldName) {
    return this.fields.find((field) => field.name === fieldName) ?? null;
  }
}
