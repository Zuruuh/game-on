'use strict';

import { _Validator } from './_Validator.js';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Makes sure input is not blank (empty string, only spaces, etc...)
 */
export class NotBlank extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => field.value && field.value.trim() === field.value;
}
