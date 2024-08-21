import express from 'express';
import ProductService from '../services/product.service.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import {
  createProductDTO,
  updateProductDTO,
  getProductDTO,
} from '../dto/product.dto.js';

const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
  const products = service.showAll();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductDTO, 'params'),
  (req, res, next) => {
  try {
    const { id } = req.params;
    const product = service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.get('/category/:category',
  (req, res, next) => {
    try {
      const { category } = req.params;
      const products = service.findAllByCategory(category);
      console.log(products)
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductDTO,'body'),
  (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatorHandler(getProductDTO,'params'),
  validatorHandler(updateProductDTO,'body'),

  (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.delete(id);
  res.json(product);
});

export default router;
