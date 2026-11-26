import type { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  readonly shopApiSelect: Locator;
  readonly currencySelect: Locator;
  readonly cartLink: Locator;
  readonly mainMenuButton: Locator;

  constructor(protected readonly page: Page) {
    this.shopApiSelect = page.getByTestId('commerce-transport');
    this.currencySelect = page.getByTestId('currency-selector');
    this.cartLink = page.getByTestId('desktop-cart-icon');
    this.mainMenuButton = page.getByTestId('mobile-menu-toggle');
  }
}
