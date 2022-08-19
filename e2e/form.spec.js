'use strict';

import { setTimeout } from 'timers/promises';

import { expect, test } from '@playwright/test';
import { getModalButtonAndScroll } from './helpers/getModalButtonAndScroll';
import { FormModal } from '../src/scripts/app/modals/FormModal';

/**
 * @typedef {import('playwright').Page} Page
 * @typedef {import('playwright').Locator} Locator
 */

/**
 * @param {Page} page
 *
 * @return {Promise<Locator>}
 */
async function openForm(page) {
  await page.goto('/');
  const button = await getModalButtonAndScroll(page);
  await button.click();

  return page.locator('#registration-modal');
}

test('Form validation on un-focus field', async ({ page }) => {
  await page.goto('/');
  const formModal = await openForm(page);

  await expect(formModal).toBeVisible();

  const formControlContainers = await formModal.locator(
    'div.form-control.text'
  );
  const [firstInputContainer, secondInputContainer] = [
    await formControlContainers.nth(0),
    await formControlContainers.nth(1),
  ];

  const [firstInput, secondInput] = await Promise.all(
    [firstInputContainer, secondInputContainer].map((container) =>
      container.locator('input')
    )
  );

  expect(await firstInputContainer.getAttribute('data-error')).toBeNull();
  expect(await secondInputContainer.getAttribute('data-error')).toBeNull();

  await firstInput.focus();
  expect(await firstInputContainer.getAttribute('data-error')).toBeNull();

  await secondInput.focus();
  expect(await firstInputContainer.getAttribute('data-error')).not.toBeNull();

  await firstInput.focus();
  expect(await secondInputContainer.getAttribute('data-error')).not.toBeNull();
});

test('Form validation on-type', async ({ page }) => {
  await page.goto('/');
  const formModal = await openForm(page);

  const inputContainer = (
    await formModal.locator('div.form-control.text')
  ).first();
  const input = await inputContainer.locator('input');

  await input.focus();
  await input.type('e');

  expect(
    await inputContainer.getAttribute('data-error', { timeout: 100 })
  ).toBeNull();

  await setTimeout(FormModal.INPUT_DEBOUNCE_TIMEOUT);
  expect(
    await inputContainer.getAttribute('data-error', { timeout: 100 })
  ).not.toBeNull();
});
