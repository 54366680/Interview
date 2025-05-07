import { test, expect } from '@playwright/test';

test('Verify user can log in and see dashboard', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://example.com/login');

    // Fill in the username and password
    await page.fill('#username', 'test_user');
    await page.fill('#password', 'password123');

    // Click the login button
    await page.click('button#login');

    // Wait for the dashboard to load
    await page.waitForTimeout(5000); 

    // Verify the URL
    expect(page.url() === 'https://example.com/dashboard'); 

    // Verify the welcome message
    const welcomeMessage = await page.locator('.welcome-text').textContent();
    expect(welcomeMessage).toBe('Welcome, test_user!'); 

    // Verify the navigation menu items
    const navItems = await page.locator('nav a');
    const actualNavItems = await navItems.allTextContents();
    expect(actualNavItems).toContain(['Home', 'Profile', 'Settings', 'Logout']); 
});

test('Verify search functionality', async ({ page }) => {
    // Navigate to the search page
    await page.goto('https://example.com/search');

    // Enter a search term
    await page.fill('#search-box', 'Playwright');

    // Click the search button
    await page.click('#search-button');

    // Wait for results to load
    await page.waitForSelector('.result-item');

    // Verify the first result contains the search term
    const firstResult = await page.locator('.result-item').first().textContent();
    expect(firstResult.includes('Playwright')).toBeTruthy();

    // Verify the total number of results
    const totalResults = await page.locator('.result-count').textContent();
    expect(parseInt(totalResults)).toBeGreaterThan(0);

    // Click on the first result
    await page.click('.result-item');

    // Verify the URL of the first result page
    expect(page.url()).toContain('/details');
});
