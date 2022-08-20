'use strict';

import { _Validator } from './_Validator.js';
import { MaxLength } from './MaxLength.js';
import { MinLength } from './MinLength.js';

/**
 * @typedef {import('../../typings').ValidatorFunction} ValidatorFunction
 */

/**
 * Makes sure a given string's length is between a range of characters
 */
export class Length extends _Validator {
  /**
   * @type {ValidatorFunction}
   */
  validate = (field) => {
    const { min, max } = {
      min: 0,
      max: Number.MAX_SAFE_INTEGER,
      ...this.options,
    };

    return (
      new MaxLength({ max }).validate(field.value) &&
      new MinLength({ min }).validate(field.value)
    );
  };
}
