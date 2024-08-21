import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 200;
    const maxReviews = 5;

    for (let index = 1; index < limit; index++) {
      const reviews = [];
      const numReviews = Math.floor(Math.random() * maxReviews) + 1; 

      for (let reviewIndex = 0; reviewIndex < numReviews; reviewIndex++) {
        reviews.push({
          reviewID: uuidv4(),
          userName: faker.internet.userName(),
          email: faker.internet.email(),
          comment: faker.lorem.paragraph(),
          date: faker.date.recent(),
        });
      }

      this.products.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        image: faker.image.url({ width: 400, height: 400, category: 'p' }),
        review: reviews,
      });
    }
  }
  showAll() {
    return this.products;
  }

  findOne(id) {
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }

    return product;
  }

  findAllByCategory(category) {
    const products = this.products.filter(
      (product) => product.category === category,
    );
    if (products.length === 0) {
      throw boom.notFound('No products found in this category');
    }

    return products;
  }

  create(data) {
    const newProduct = {
      id: uuidv4(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }

    this.products.splice(index, 1);
    return { id };
  }
}

export default ProductService;
