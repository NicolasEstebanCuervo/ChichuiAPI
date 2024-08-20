import express from 'express';
import ProductService from '../services/product.service.js';
import { validatosHandler } from '../middlewares/validator.handler.js';
import {
  createProductDTO,
  updateProductDTO,
  getProductDTO,
} from '../dto/product.dto.js';

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  const products = await service.showAll();
  res.json(products);
});

router.get('/:id',
  validatosHandler(getProductDTO, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatosHandler(createProductDTO,'body'),
  async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id',
  validatosHandler(getProductDTO,'params'),
  validatosHandler(updateProductDTO,'body'),

  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product);
});

export default router;
