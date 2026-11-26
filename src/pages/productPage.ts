import type { Locator, Page } from '@playwright/test';
import type { ProductCategory } from '@enums/productCategory';

import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  readonly heading: Locator;
  readonly productCount: Locator;
  readonly filtersToggle: Locator;
  readonly categoryFilter: Locator;
  readonly allProductsButton: Locator;
  readonly minPriceInput: Locator;
  readonly maxPriceInput: Locator;
  readonly applyPriceButton: Locator;
  readonly minRatingSelect: Locator;
  readonly inStockOnlyCheckbox: Locator;
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly searchSummary: Locator;
  readonly emptySearchActions: Locator;
  readonly productList: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByTestId('products-title');
    this.productCount = page.getByTestId('products-count-summary');
    this.filtersToggle = page.getByTestId('products-filters-toggle');
    this.categoryFilter = page.getByTestId('product-filter-category');
    this.allProductsButton = this.categoryFilter.getByTestId('products-category-all');
    this.minPriceInput = page.getByTestId('product-min-price');
    this.maxPriceInput = page.getByTestId('product-max-price');
    this.applyPriceButton = page.getByTestId('product-price-apply');
    this.minRatingSelect = page.getByTestId('product-min-rating');
    this.inStockOnlyCheckbox = page.getByTestId('product-in-stock-only');
    this.searchInput = page.getByTestId('product-search');
    this.sortSelect = page.getByTestId('product-sort');
    this.searchSummary = page.getByTestId('product-search-summary');
    this.emptySearchActions = page.getByTestId('empty-search-actions');
    this.productList = page.getByTestId('product-list');
    this.productCards = this.productList.getByTestId('product-item');
  }

  async goto(): Promise<void> {
    await this.page.goto('/products');
  }

  categoryCheckbox(category: ProductCategory): Locator {
    return this.categoryFilter.getByTestId(
      `products-category-${category.toLowerCase().replaceAll(' ', '-')}`,
    );
  }

  productCard(name: string): Locator {
    return this.productCards.filter({
      has: this.page
        .getByRole('link', { name, exact: true })
        .and(this.page.getByTestId('product-name-link')),
    });
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).getByTestId('product-name-link').click();
  }

  addToCartButton(name: string): Locator {
    return this.productCard(name).getByTestId('product-add-button');
  }
}
