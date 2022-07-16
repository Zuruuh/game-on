// @ts-check
'use strict';

import '/src/styles/app.css';
import { Modal } from './Modal.js';
import './DOM';
import { ModalContainer } from './ModalContainer.js';

class App {
  async run() {
    this.#setupNavigation();
    const modalContainer = new ModalContainer('#modal-container');
    const modal = new Modal('#inscription-modal', [
      '.register-modal-btn',
      '.btn-signup',
    ]);

    modalContainer.addModal(modal);
  }

  /**
   * @listen ["click"]
   */
  #setupNavigation() {
    const $nav = document.selectOrThrow('nav.layout');
    const $navButton = document.selectOrThrow('#nav-menu-icon');

    $navButton.addEventListener('click', () =>
      $nav.classList.toggle('responsive')
    );
  }
}

new App().run();
