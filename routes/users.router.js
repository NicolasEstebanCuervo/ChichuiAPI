import { faker } from '@faker-js/faker';
import express from 'express';

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  const {size} = req.query;
  const limit = size || 100

  for(let index = 1; index < limit; index++){
    users.push({
      id: index,
      name: faker.person.firstName(),
      bio: faker.person.bio()
    })
  }

  res.json(users)
});

router.get('/filter',(req,res)=>{
  res.send("I, im a filter")
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const users = users.find(u => u.id === parseInt(id));

  if (users) {
    res.json(users);
  } else {
    res.status(404).send('Person not found');
  }
});


export default router;
