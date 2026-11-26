import type { Locator, Page } from '@playwright/test';

import { BasePage } from './basePage';

export class DashboardPage extends BasePage {
  readonly welcomeHeading: Locator;
  readonly productsButton: Locator;
  readonly usersButton: Locator;
  readonly profileAndOrdersButton: Locator;
  readonly aiAssistantButton: Locator;
  readonly trafficMonitorButton: Locator;
  readonly generateQrCodesButton: Locator;
  readonly sendEmailsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByTestId('home-welcome-title');
    this.productsButton = page.getByTestId('home-products-button');
    this.usersButton = page.getByTestId('home-users-button');
    this.profileAndOrdersButton = page.getByTestId('home-profile-button');
    this.aiAssistantButton = page.getByTestId('home-llm-button');
    this.trafficMonitorButton = page.getByTestId('home-traffic-button');
    this.generateQrCodesButton = page.getByTestId('home-qr-button');
    this.sendEmailsButton = page.getByTestId('home-email-button');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
}
