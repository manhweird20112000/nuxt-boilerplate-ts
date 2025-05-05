import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/en')
  await page.getByRole('button', { name: 'Click open dialog' }).click()
})
