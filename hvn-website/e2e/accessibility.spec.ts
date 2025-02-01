import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test('home page meets WCAG standards', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('events page meets WCAG standards', async ({ page }) => {
    await page.goto('/events');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('sponsors page meets WCAG standards', async ({ page }) => {
    await page.goto('/sponsors');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to navigate through elements
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Continue tabbing and check focus order
    await page.keyboard.press('Tab');
    const secondFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(secondFocused).toBeTruthy();
    expect(secondFocused).not.toBe(firstFocused);
  });

  test('color contrast meets WCAG standards', async ({ page }) => {
    await page.goto('/');
    
    // Test both light and dark modes
    for (const mode of ['light', 'dark']) {
      if (mode === 'dark') {
        await page.click('button[aria-label="Toggle Color Mode"]');
      }
      
      const results = await new AxeBuilder({ page })
        .include('text')
        .options({
          rules: ['color-contrast']
        })
        .analyze();
      
      expect(results.violations).toEqual([]);
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = await page.locator('img').all();
    for (const image of images) {
      const altText = await image.getAttribute('alt');
      expect(altText).toBeTruthy();
    }
  });

  test('form controls have labels', async ({ page }) => {
    await page.goto('/');
    
    const results = await new AxeBuilder({ page })
      .options({
        rules: ['label']
      })
      .analyze();
    
    expect(results.violations).toEqual([]);
  });
});
