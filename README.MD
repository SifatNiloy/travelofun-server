# Travelofun Backend

Welcome to the backend service for Travelofun, a travel and tour booking application. This service is built using Node.js, Express, and MongoDB, and it provides RESTful APIs for managing travel packages and orders.

[Live Site](https://travelofun.sifatniloy.top/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
  - [Packages](#packages)
  - [Orders](#orders)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Travelofun backend provides a robust API to support operations related to travel packages and orders. It connects to a MongoDB database to store and retrieve data and allows CRUD operations through its endpoints.

## Features

- **Travel Packages Management**: Create, read, update, and delete travel packages.
- **Orders Management**: Create, read, update, and delete orders.
- **Database Integration**: Uses MongoDB for data storage.
- **RESTful API**: Exposes endpoints for seamless integration with frontend applications.

## Technologies

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for scalable and flexible data storage.
- **Nodemon**: Tool for automatically restarting the server during development.

## API Endpoints

### Packages

- **GET /packages**: Retrieve all travel packages.
- **GET /packages/:id**: Retrieve a travel package by ID.
- **POST /packages**: Create a new travel package.
- **PUT /packages/:id**: Update an existing travel package by ID.
- **DELETE /packages/:id**: Delete a travel package by ID.

### Orders

- **GET /orders**: Retrieve all orders.
- **GET /orders/:id**: Retrieve an order by ID.
- **POST /orders**: Create a new order.
- **PUT /orders/:id**: Update an existing order by ID.
- **DELETE /orders/:id**: Delete an order by ID.
