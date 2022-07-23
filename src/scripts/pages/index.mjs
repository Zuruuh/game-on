'use strict';

import '/src/styles/modal.css';
import '/src/styles/form-control.css';
import { ModalContainer } from '../app/modals/ModalContainer.js';
import { FormModal } from '../app/modals/FormModal';
import { registrationForm } from '../forms/RegistrationForm';

class Index {
  async start() {
    const form = this.#getRegistrationFormHtmlElement();

    const modalContainer = new ModalContainer('#modals-container');
    const modal = new FormModal(
      registrationForm(form),
      '#registration-modal',
      ['.register-modals-btn', '.btn-signup'],
      () => {}
    );

    modalContainer.addModal(modal);
  }

  /**
   * @return {HTMLFormElement}
   */
  #getRegistrationFormHtmlElement() {
    const form = document.querySelector('form[name="registration"]');

    if (!(form instanceof HTMLFormElement)) {
      throw new Error('Could not find registration form html element');
    }

    return form;
  }
}

await new Index().start();
