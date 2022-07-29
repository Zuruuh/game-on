'use strict';

/**
 * @typedef {import('../builder/FormBuilder').FormBuilder} FormBuilder
 * @typedef {import('../builder/FormFieldBuilder').FormFieldBuilder} FormFieldBuilder
 * @typedef {import('../constraints/_Validator')._Validator} Validator
 */

export class FormValidator {
  /**
   * @type {FormBuilder}
   * @readonly
   */
  formBuilder;

  /**
   * @param {FormBuilder} formBuilder
   */
  constructor(formBuilder) {
    this.formBuilder = formBuilder;
  }

  get form() {
    return this.formBuilder.form;
  }

  /**
   * @param {string} fieldName
   *
   * @return {true|string[]}
   */
  validateFieldByName(fieldName) {
    const field = this.formBuilder.getFieldByName(fieldName);

    if (!field) {
      throw new Error(
        `Could not find a field with name "${fieldName}" inside form ${this.formBuilder.form.name}`
      );
    }

    return this.validateField(field);
  }

  /**
   * @param {FormFieldBuilder} field
   *
   * @return {string[]}
   */
  validateField(field) {
    return field.validators
      .filter((validator) =>
        field.isMultiple
          ? !validator.validateMultiple(
              Array.from(
                field.element.querySelectorAll(`input[name="${field.name}"]`)
              )
            )
          : !validator.validate(field.element)
      )
      .map((validator) => validator.options.message);
  }

  /**
   * @return {true|Record<string, string[]>} Returns true if the form is valid, and returns an object if not.
   *                                       Object keys are the field names which are invalid, and values are the error messages.
   */
  validateForm() {
    /**
     * @type {Record<string, string[]>}
     */
    const errorsMap = this.formBuilder.fields
      .map((field) => {
        const errors = this.validateField(field);

        return { [field.name]: errors };
      })
      .reduce((previous, current) => ({ ...previous, ...current }));

    if (Object.values(errorsMap).some((errorMap) => errorMap.length)) {
      return errorsMap;
    }

    return true;
  }
}
