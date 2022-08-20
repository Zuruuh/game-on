'use strict';

import { _Validator } from './_Validator.js';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Checks if the value is a number
 */
export class Numeric extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => !isNaN(parseInt(field.value));
}
