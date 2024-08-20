import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import  boom from '@hapi/boom';

class ProductService {
  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100
    for(let index = 1; index < limit; index++){
      this.products.push({
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.url({width:400,height:400,category: "cars"}),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  create (data){
    const newProduct = {
      id: uuidv4(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  showAll (){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve(this,this.products)
      },1000)
    })
  }

  async findOne(id) {
    const product = this.products.find(product => product.id === id);
    if(!product){
      throw boom.notFound("Product not found")
    }

    if(product.isBlock){
      throw boom.conflict("This product is block")
    }

    return product
  }

  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw boom.notFound("Product not found")
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ... changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)

    if(index === -1){
      throw boom.notFound("Product not found")
    }

    this.products.splice(index,1)
    return { id }
  }
}

export default ProductService
