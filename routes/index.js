import productsRouter from "./products.router.js"
import usersRouter from "./users.router.js"
import express from 'express';

const routerApi = (app)=>{
  const router = express.Router()
  app.use('/chichuiapi/v1',router)
  router.use('/products',productsRouter)
  router.use('/users', usersRouter)
}

export default routerApi
