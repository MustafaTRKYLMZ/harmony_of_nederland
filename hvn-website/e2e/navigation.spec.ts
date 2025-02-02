import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    // Start from the home page
    await page.goto('/');
    await expect(page).toHaveTitle(/HvN/);

    // Navigate to Events page
    await page.click('text=Events');
    await expect(page).toHaveURL(/.*events/);
    await expect(page.locator('h1')).toContainText(/Events/);

    // Navigate to Sponsors page
    await page.click('text=Sponsors');
    await expect(page).toHaveURL(/.*sponsors/);
    await expect(page.locator('h1')).toContainText(/Sponsors/);

    // Navigate back to home
    await page.click('text=Home');
    await expect(page).toHaveURL(/.*$/);
  });
});

test.describe('Events Page', () => {
  test('should display event cards', async ({ page }) => {
    await page.goto('/events');
    const eventCards = page.locator('[data-testid="event-card"]');
    await expect(eventCards).toHaveCount(await eventCards.count());
  });

  test('should have working event links', async ({ page }) => {
    await page.goto('/events');
    const firstEventLink = page.locator('[data-testid="event-card"]').first();
    await firstEventLink.click();
    await expect(page).toHaveURL(/.*events\/.*/);
  });
});

test.describe('Sponsors Page', () => {
  test('should display sponsor cards', async ({ page }) => {
    await page.goto('/sponsors');
    const sponsorCards = page.locator('[data-testid="sponsor-card"]');
    await expect(sponsorCards).toHaveCount(await sponsorCards.count());
  });

  test('should have working sponsor links', async ({ page }) => {
    await page.goto('/sponsors');
    const sponsorLinks = page.locator('[data-testid="sponsor-website"]');
    await expect(sponsorLinks.first()).toHaveAttribute('href', /.*/);
  });
});
