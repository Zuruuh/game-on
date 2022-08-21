'use strict';

import { ModalContainer } from '../app/modals/ModalContainer.js';
import { FormModal } from '../app/modals/FormModal.js';
import { registrationForm } from '../forms/RegistrationForm.js';

class Index {
  async start() {
    const form = this.#getRegistrationFormHtmlElement();

    const modalContainer = new ModalContainer('#modals-container');
    const modal = new FormModal(
      registrationForm(form),
      '#registration-modal',
      ['.register-modals-btn', '.btn-signup'],
      async (e, data, modal) => {
        /**
         * @type {{target: HTMLFormElement}}
         */
        /// @ts-ignore
        const { target: formElement } = e;

        if (!formElement || !formElement.parentElement) {
          return;
        }

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('modal-message');

        const message = document.createElement('p');
        message.textContent = 'Merci pour votre inscription';

        const closeButton = document.createElement('button');
        closeButton.classList.add('btn');
        closeButton.textContent = 'Fermer';
        closeButton.addEventListener(
          'click',
          modal.toggleVisibility.bind(modal)
        );

        messageContainer.append(message, closeButton);

        const { clientHeight: modalHeight } = formElement;
        while (formElement.lastChild) {
          formElement.removeChild(formElement.lastChild);
        }

        formElement.style.height = `${modalHeight}px`;
        formElement.append(messageContainer);

        console.table(data);
      }
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

new Index().start().catch(console.error);
