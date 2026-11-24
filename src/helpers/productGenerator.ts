import { faker } from '@faker-js/faker';
import { ProductCategory } from '@enums/productCategory';
import type { Product } from '@typing/product';

export function generateProduct(overrides: Partial<Product> = {}): Product {
  const dateInThePast = faker.date.past().toISOString();

  return {
    id: faker.number.int({ min: 1, max: 1_000_000 }),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 1, max: 2000 })),
    stockQuantity: faker.number.int({ min: 0, max: 200 }),
    category: faker.helpers.enumValue(ProductCategory),
    imageUrl: `/images/${faker.string.uuid()}.png`,
    createdAt: dateInThePast,
    updatedAt: dateInThePast,
    averageRating: null,
    reviewCount: 0,
    ...overrides,
  };
}

export function generateProducts(count: number): Product[] {
  const products: Product[] = [];

  for (let index = 0; index < count; index++) {
    const product = generateProduct({ id: index + 1 });
    products.push(product);
  }

  return products;
}
