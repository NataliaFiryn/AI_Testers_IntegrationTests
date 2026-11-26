import { expect, test as base } from '@playwright/test';
import { LoginPage } from '@pages/loginPage';

export { expect };

export const test = base.extend<{ signInAsDemoClient: () => Promise<void> }>({
  signInAsDemoClient: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await use(async () => {
      await expect(loginPage.heading).toBeVisible();
      await loginPage.signInAsDemoClient();
    });
  },
});
