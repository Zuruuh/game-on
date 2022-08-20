'use strict';

import { DOM } from '../helpers/DOM.js';

/**
 * @typedef {import('./Modal').Modal} Modal
 */

/**
 * Abstraction over the DOM modals container html element to group multiple modals on the same page.
 * When shown, will lock scroll on body as a side effect.
 */
export class ModalContainer {
  /**
   * @type {Modal[]}
   */
  modals = [];

  /**
   * @type {HTMLElement}
   */
  element;

  /**
   * @type {HTMLBodyElement}
   */
  htmlBody;

  /**
   * @param {string} containerSelector The CSS Selector which will be used to get the container from the DOM.
   */
  constructor(containerSelector) {
    this.element = DOM.selectOrThrow(containerSelector);
    this.htmlBody = DOM.selectOrThrow('body');
  }

  /**
   * Makes sure the container is always visible when a modals is currently being shown.
   *
   * @return {void}
   */
  updateContainerVisibility() {
    if (this.modals.some((modal) => modal.isVisible)) {
      return this.show();
    }

    this.hide();
  }

  /**
   * @param {Modal} modal
   */
  addModal(modal) {
    this.modals.push(modal);
    modal.container = this;
  }

  /**
   * @param {Modal} modal
   */
  removeModal(modal) {
    this.modals = this.modals.filter((m) => m !== modal);
    modal.container = null;
  }
  /**
   * @return {void}
   */
  show() {
    this.htmlBody.classList.add('scroll-lock');
    this.element.classList.add('shown');
  }

  /**
   * @return {void}
   */
  hide() {
    this.htmlBody.classList.remove('scroll-lock');
    this.element.classList.remove('shown');
  }
}
