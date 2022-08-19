'use strict';

import { expect, test } from '@playwright/test';
import { getModalButtonAndScroll } from './helpers/getModalButtonAndScroll';

test('Modal open when pressing registration button', async ({ page }) => {
  await page.goto('/');
  const modal = await page.locator('#registration-modal');
  await expect(modal).not.toBeVisible();

  const button = await getModalButtonAndScroll(page);

  await button.click();
  await expect(modal).toBeVisible();
});

test('Modal close when pressing closing button', async ({ page }) => {
  await page.goto('/');
  const modal = await page.locator('#registration-modal');
  await expect(modal).not.toBeVisible();

  const button = await getModalButtonAndScroll(page);
  await button.click();
  await expect(modal).toBeVisible();

  const closeModalButton = await modal.locator(
    'button.modal-close.modal-close-button'
  );
  await closeModalButton.click();

  await expect(modal).not.toBeVisible();
});
