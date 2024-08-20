import express from 'express';

const app = express();
const port = 3000;

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 1000,
  },
  {
    id: 2,
    name: 'Product 2',
    price: 2000,
  },
];

app.get('/', (req, res) => {
  res.send('Hello my server in express');
});

app.get('/about', (req, res) => {
  res.send('Hello im about route');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.get('/products/:id/name', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (product) {
    res.json(product.name);
  } else {
    res.status(404).send('Product not found');
  }
});

app.get("/users",(req,res)=>{
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send("There are no parameters")
  }

})

app.listen(port, () => {
  console.log('This app is in the 3000 port');
});
