// @ts-check
'use strict';

import { arrayUnique } from './utils';
import { ModalContainer } from './ModalContainer'; // eslint-disable-line no-unused-vars

/**
 * Represents a DOM modal element with a javascript abstraction class to facilitate interactions
 */
export class Modal {
  /**
   * @type {HTMLElement} element
   * @readonly
   */
  element;

  /**
   * @type {?ModalContainer}
   */
  container = null;

  /**
   * @param {string} modalSelector The CSS Selector which will be used to get the element from the DOM
   * @param {string[]} buttonsSelectors The CSS Selector for the buttons which will trigger the modal to show up.
   */
  constructor(modalSelector, buttonsSelectors) {
    this.element = document.selectOrThrow(modalSelector);

    this.#registerListeners(buttonsSelectors);
  }

  /**
   * Call this method to show/hide the modal on screen
   *
   * @return {void}
   */
  toggle() {
    this.element.classList.toggle('shown');
    const ariaHidden = this.element.attributes.getNamedItem('aria-hidden');

    if (!ariaHidden) {
      throw new Error(
        `An "aria-hidden" attribute should be set on the modal element ${this.element}`
      );
    }

    ariaHidden.value = Boolean(ariaHidden.value === 'false').toString();

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
   * @listen ["click"]
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
      button.addEventListener('click', () => this.toggle.bind(this)())
    );
  };
}
