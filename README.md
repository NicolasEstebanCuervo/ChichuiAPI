<div id="Header" align="center">

   <img src="https://media.giphy.com/media/JWuBH9rCO2uZuHBFpm/giphy.gif?cid=790b761144hvogl2k378docb7f5n07qymdlp8z2g22qu2j09&ep=v1_gifs_search&rid=giphy.gif" width="300">   
   <h1 align="center">Chichui API 🤖 - Finalizado </h1>

</div>

Welcome to the documentation for the Chichui API. This API was developed as part of my first backend project using Node.js and Express.js. It uses Faker to generate random data and Joi to validate the fields.

[Chichui API](https://chichui-api.vercel.app/chichui/api/)

## Available Endpoints

- **Users**
- **Products**

## Features

### Users

- **GET** `chichui/api/v1/users`: Retrieves complete user information.
- **GET** `chichui/api/v1/users/:id`: Retrieves user information by ID.
- **POST** `chichui/api/v1/users`: Creates a new user.
- **PATCH** `chichui/api/v1/users/:id`: Updates a specific field of a user.
- **DELETE** `chichui/api/v1/users/:id`: Deletes a user.

### Products

- **GET** `chichui/api/v1/products`: Retrieves complete product information.
- **GET** `chichui/api/v1/products/:id`: Retrieves product information by ID.
- **GET** `chichui/api/v1/products/category/:category`: Retrieves products matching a category.
- **POST** `chichui/api/v1/products`: Creates a new product.
- **PATCH** `chichui/api/v1/products/:id`: Updates a specific field of a product.
- **DELETE** `chichui/api/v1/products/:id`: Deletes a product.

## Dependencies

Three dependencies were used for this project:

- `uuidv4`: To generate unique IDs.
- `faker-js`: To generate fake information.
- `Joi`: To validate creation, editing, and deletion of fields.

