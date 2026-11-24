import type { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly heading: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly registerButton: Locator;
  readonly registerLink: Locator;
  readonly notifications: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByTestId('login-title');
    this.usernameInput = page.getByTestId('login-username-input');
    this.passwordInput = page.getByTestId('login-password-input');
    this.signInButton = page.getByTestId('login-submit-button');
    this.forgotPasswordButton = page.getByTestId('login-forgot-link');
    this.registerButton = page.getByTestId('login-register-link');
    this.registerLink = page.getByTestId('register-link');
    this.notifications = page.getByRole('region', { name: 'Notifications (F8)', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
