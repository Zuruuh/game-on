'use strict';

import '/src/styles/app.css';
import { DOM } from './app/helpers/DOM';

class App {
  async start() {
    this.#setupNavigation();
  }

  /**
   * @listens ["click"]
   */
  #setupNavigation() {
    const $nav = DOM.selectOrThrow('nav.layout');
    const $navButton = DOM.selectOrThrow('#nav-menu-icon');

    $navButton.addEventListener('click', () =>
      $nav.classList.toggle('responsive')
    );
  }
}

new App().start().catch(console.error);
