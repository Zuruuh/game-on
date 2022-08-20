'use strict';

import { arrayUnique } from '../utils/arrayUnique.js';
import { DOM } from '../helpers/DOM.js';

/**
 * @typedef {import('./ModalContainer').ModalContainer} ModalContainer
 */

/**
 * Represents a DOM modals element with a javascript abstraction class to facilitate interactions
 */
export class Modal {
  /**
   * @type {HTMLElement}
   * @readonly
   */
  element;

  /**
   * @type {ModalContainer|null}
   */
  container = null;

  /**
   * @param {string} modalSelector The CSS Selector which will be used to get the element from the DOM
   * @param {string[]} buttonsSelectors The CSS Selector for the buttons which will trigger the modals to show up.
   */
  constructor(modalSelector, buttonsSelectors) {
    this.element = DOM.selectOrThrow(modalSelector);

    this.#registerListeners(buttonsSelectors);
  }

  /**
   * @return {void}
   */
  toggleVisibility() {
    this.element.classList.toggle('shown');
    const ariaHidden = this.element.attributes.getNamedItem('aria-hidden');

    if (!ariaHidden) {
      throw new Error(
        `An "aria-hidden" attribute should be set on the modal element ${this.element}`
      );
    }

    ariaHidden.value = (ariaHidden.value === 'false').toString();
    if (this.element.classList.contains('shown')) {
      this.element.focus();
    }

    this.container?.updateContainerVisibility();
  }

  /**
   * @return {boolean}
   */
  get isVisible() {
    return this.element.classList.contains('shown');
  }

  /**
   * @param {string[]} buttonsSelectors @see{Modal.constructor.buttonsSelectors}
   *
   * @listens ["click"]
   * @return {void}
   */
  #registerListeners = (buttonsSelectors) => {
    const globalClosingButtons = buttonsSelectors
      .map((buttonSelector) =>
        Array.from(document.querySelectorAll(buttonSelector))
      )
      .reduce((previous, current) => [...current, ...previous]);

    const innerClosingButtons = Array.from(
      this.element.querySelectorAll('.modal-close-button')
    );

    const buttons = arrayUnique([
      ...globalClosingButtons,
      ...innerClosingButtons,
    ]);

    buttons.forEach((button) =>
      button.addEventListener('click', () => this.toggleVisibility.bind(this)())
    );
  };
}
