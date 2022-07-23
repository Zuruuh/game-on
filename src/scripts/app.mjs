'use strict';

import '/src/styles/app.css';
import './app/helpers/DOM';

class App {
  async start() {
    this.#setupNavigation();
  }

  /**
   * @listens ["click"]
   */
  #setupNavigation() {
    const $nav = document.selectOrThrow('nav.layout');
    const $navButton = document.selectOrThrow('#nav-menu-icon');

    $navButton.addEventListener('click', () =>
      $nav.classList.toggle('responsive')
    );
  }
}

await new App().start();
