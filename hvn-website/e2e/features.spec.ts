import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
  test('color mode switching works', async ({ page }) => {
    await page.goto('/');
    
    // Check initial color mode
    const body = page.locator('body');
    const initialBg = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });

    // Click color mode switch
    await page.click('button[aria-label="Toggle Color Mode"]');

    // Verify color mode changed
    const newBg = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(newBg).not.toBe(initialBg);
  });

  test('language switching works', async ({ page }) => {
    await page.goto('/');
    
    // Get initial title
    const initialTitle = await page.textContent('h1');

    // Switch language
    await page.click('button[aria-label="Switch Language"]');

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Get new title
    const newTitle = await page.textContent('h1');
    expect(newTitle).not.toBe(initialTitle);
  });

  test('event filtering and pagination works', async ({ page }) => {
    await page.goto('/events');
    
    // Check initial event count
    const initialEvents = await page.locator('[data-testid="event-card"]').count();
    
    // Change page
    await page.click('button[aria-label="Next Page"]');
    
    // Wait for new events to load
    await page.waitForLoadState('networkidle');
    
    // Verify events changed
    const newEvents = await page.locator('[data-testid="event-card"]').count();
    expect(newEvents).toBe(initialEvents);
  });

  test('sponsor tiers are correctly displayed', async ({ page }) => {
    await page.goto('/sponsors');
    
    // Check for sponsor tier badges
    const goldSponsors = await page.locator('text=GOLD SPONSOR').count();
    const silverSponsors = await page.locator('text=SILVER SPONSOR').count();
    const bronzeSponsors = await page.locator('text=BRONZE SPONSOR').count();
    
    // Verify at least one sponsor of each tier exists
    expect(goldSponsors + silverSponsors + bronzeSponsors).toBeGreaterThan(0);
  });

  test('responsive design works', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenu = await page.isVisible('button[aria-label="Toggle Navigation"]');
    expect(mobileMenu).toBeTruthy();
    
    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 800 });
    const desktopMenu = await page.isVisible('button[aria-label="Toggle Navigation"]');
    expect(desktopMenu).toBeFalsy();
  });
});
