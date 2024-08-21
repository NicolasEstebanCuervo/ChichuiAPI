import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 200;
    for (let index = 1; index < limit; index++) {
      this.users.push({
        id: uuidv4(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number,
        birth: faker.date.birthdate().toLocaleDateString('es-CO'),
        profile:{
          userName: faker.internet.userName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          bio: `${faker.person.bio()} 🎵 I always find myself humming "${faker.music.songName()}" whenever I think about my favorite moments.`,
        },
        address:{
          county: faker.location.country(),
          city: faker.location.city(),
          streetAddress: faker.location.streetAddress(),
        }
      });
    }
  }

  showAll() {
    return this.users;
  }

  findOne(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw boom.notFound('User not found');
    }

    return user;
  }

  create(data) {
    const newUser = {
      id: uuidv4(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('User not found');
    }

    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw boom.notFound('User not found');
    }

    this.users.splice(index, 1);
    return { id };
  }

}


export default UsersService
