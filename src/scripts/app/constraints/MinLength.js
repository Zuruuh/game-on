'use strict';

import { _Validator } from './_Validator';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Makes sure a given string's length is at least a given characters count.
 */
export class MinLength extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => {
    const min = this.options.min ?? 0;

    return field.value && field.value.length > min;
  };
}
