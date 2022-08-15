'use strict';

/**
 * @typedef {import('playwright').Page} Page
 * @typedef {import('playwright').Locator} Locator
 */

/**
 * @param {Page} page
 *
 * @return {Locator}
 */
export async function getModalButtonAndScroll(page) {
  let button = await page.locator(
    '.hero-content > button.btn-signup.register-modal-btn'
  );
  try {
    await button.scrollIntoViewIfNeeded({ timeout: 500 });
  } catch (e) {
    button = await page.locator(
      '.hero-section > button.btn-signup.register-modal-btn'
    );
    await button.scrollIntoViewIfNeeded({ timeout: 500 });
  }

  return button;
}
