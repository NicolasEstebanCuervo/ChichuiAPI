import express from 'express';
import UsersService from '../services/users.service.js';
import { validatorHandler } from '../middlewares/validator.handler.js';
import { createUserDTO, getUserDTO, updateUserDTO } from '../dto/users.dto.js';

const router = express.Router();
const service = new UsersService();

router.get('/', (req, res) => {
  const products = service.showAll();
  res.json(products);
});

router.get('/:id',
  validatorHandler(getUserDTO,"params"),
  (req, res, next) => {
  try {
    const { id } = req.params;
    const user = service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createUserDTO,"body"),
  (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
});

router.patch('/:id',
  validatorHandler(getUserDTO,"params"),
  validatorHandler(updateUserDTO,"body"),
  (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.delete(id);
  res.json(user);
});

export default router;
