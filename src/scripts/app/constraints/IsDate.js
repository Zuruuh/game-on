'use strict';

import { _Validator } from './_Validator';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Checks that a field's value is a valid date generated with html5's date input type
 */
export class IsDate extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => /\d{4}-\d{2}-\d{2}/.test(field.value);
}
