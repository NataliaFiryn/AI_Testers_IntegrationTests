import type { Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly welcomeHeading: Locator;
  readonly productsButton: Locator;
  readonly usersButton: Locator;
  readonly profileAndOrdersButton: Locator;
  readonly aiAssistantButton: Locator;
  readonly trafficMonitorButton: Locator;
  readonly generateQrCodesButton: Locator;
  readonly sendEmailsButton: Locator;
  readonly shopApiSelect: Locator;
  readonly currencySelect: Locator;
  readonly cartLink: Locator;
  readonly mainMenuButton: Locator;

  constructor(private readonly page: Page) {
    this.welcomeHeading = page.getByTestId('home-welcome-title');
    this.productsButton = page.getByTestId('home-products-button');
    this.usersButton = page.getByTestId('home-users-button');
    this.profileAndOrdersButton = page.getByTestId('home-profile-button');
    this.aiAssistantButton = page.getByTestId('home-llm-button');
    this.trafficMonitorButton = page.getByTestId('home-traffic-button');
    this.generateQrCodesButton = page.getByTestId('home-qr-button');
    this.sendEmailsButton = page.getByTestId('home-email-button');
    this.shopApiSelect = page.getByTestId('commerce-transport');
    this.currencySelect = page.getByTestId('currency-selector');
    this.cartLink = page.getByTestId('desktop-cart-icon');
    this.mainMenuButton = page.getByTestId('mobile-menu-toggle');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
