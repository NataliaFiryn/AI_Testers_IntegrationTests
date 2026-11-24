import { expect, test } from '@playwright/test';
import { ProductCategory } from '@enums/productCategory';
import { generateProduct, generateProducts } from '@helpers/productGenerator';

test('generates a product matching the backend response and accepts overrides', () => {
  const product = generateProduct({ category: ProductCategory.Audio, price: 42 });

  expect(product).toEqual({
    id: expect.any(Number),
    name: expect.any(String),
    description: expect.any(String),
    price: 42,
    stockQuantity: expect.any(Number),
    category: 'Audio',
    imageUrl: expect.stringMatching(/^\/images\/.+\.png$/),
    createdAt: expect.stringMatching(/^\d{4}-\d\d-\d\dT/),
    updatedAt: expect.any(String),
    averageRating: null,
    reviewCount: 0,
  });
});

test('generates the requested number of products with distinct IDs', () => {
  const products = generateProducts(20);

  expect(products).toHaveLength(20);
  expect(new Set(products.map((product) => product.id)).size).toBe(20);
  expect(generateProducts(0)).toEqual([]);
});
