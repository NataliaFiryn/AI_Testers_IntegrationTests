import { expect, test } from '@fixtures/login';
import { productSearchResponse } from '@fixtures/productSearchResponse';
import { ProductPage } from '@pages/productPage';

test('shows all eight products returned by the mocked catalog search', async ({
  page,
  baseURL,
  signInAsDemoClient,
}) => {
  if (!baseURL) {
    throw new Error('Set BASE_URL.');
  }

  const productPage = new ProductPage(page);
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const { content, totalElements } = productSearchResponse;

  await productPage.mockProductSearch(baseURL, productSearchResponse);
  await productPage.goto();
  await signInAsDemoClient();

  await expect(page).toHaveURL(new URL('/products', baseURL).href);
  await expect(productPage.productCount).toHaveText(`${totalElements} products match`);
  await expect(productPage.productCards).toHaveCount(totalElements);

  for (const product of content) {
    await test.step(`Display ${product.name}`, async () => {
      const card = productPage.productCard(product.name);
      await expect(card).toBeVisible();
      await expect(card.getByTestId('product-description')).toHaveText(product.description);
      await expect(card.getByTestId('product-price')).toHaveText(currency.format(product.price));
      await expect(card.getByTestId('product-category')).toHaveText(product.category);
    });
  }
});
