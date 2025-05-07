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
