'use strict';

import { _Validator } from './_Validator';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Makes sure the field has a value
 */
export class Required extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => {
    switch (field.type) {
      case 'checkbox':
        return field.checked;
      default:
        return field.value !== null || field.value !== undefined;
    }
  };

  /**
   * @override
   * @param {HTMLInputElement[]} fields
   *
   * @return {boolean}
   */
  validateMultiple = (fields) => fields.some((field) => field.checked);
}
