'use strict';

/**
 * @final
 */
export class DOM {
  /**
   * @param {string} selector
   * @return {HTMLElement}
   */
  static selectOrThrow(selector) {
    const element = document.querySelector(selector);

    if (!(element instanceof HTMLElement)) {
      throw new Error(
        `Could not find a dom element for selector "${selector}"`
      );
    }

    return element;
  }
}
