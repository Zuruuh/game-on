'use strict';

/**
 * @abstract
 */
export class _Validator {
  /**
   * @type {Record<string, *>}
   */
  options;

  /**
   * @param {Record<string, *>} options
   */
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * @abstract
   * @param {HTMLInputElement} field
   *
   * @return {boolean}
   */
  validate = (field) => {
    throw new Error(`${this.constructor.name} was not implemented!`);
  };

  /**
   * @param {HTMLInputElement[]} fields
   *
   * @return {boolean}
   */
  validateMultiple = (fields) => {
    return fields.every(this.validate);
  };
}
