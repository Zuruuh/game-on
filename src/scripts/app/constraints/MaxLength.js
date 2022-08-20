'use strict';

import { _Validator } from './_Validator.js';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

export class MaxLength extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => {
    const max = this.options.max ?? Number.MAX_SAFE_INTEGER;

    return field.value.length < max;
  };
}
