# Fast Food Fast
[![Build Status](https://travis-ci.org/shegsteham/Fast-Food-Fast.svg?branch=gh-pages)](https://travis-ci.org/shegsteham/Fast-Food-Fast)    [![Maintainability](https://api.codeclimate.com/v1/badges/c2dc0578de1fdecc0c8f/maintainability)](https://codeclimate.com/github/shegsteham/Fast-Food-Fast/maintainability)    [![Test Coverage](https://api.codeclimate.com/v1/badges/c2dc0578de1fdecc0c8f/test_coverage)](https://codeclimate.com/github/shegsteham/Fast-Food-Fast/test_coverage)    [![Coverage Status](https://coveralls.io/repos/github/shegsteham/Fast-Food-Fast/badge.svg)](https://coveralls.io/github/shegsteham/Fast-Food-Fast)    ![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)

## Table of Contents

* [Project Overview](#Project-Overview)
* [Features](#Features)
* [Demo](#demo)
* [Built with](#built-with)
* [API End Points](#API-End-Points)
* [Known Issues](#Known-issues)
* [Installation](#Installation)
* [Contributing](#contributing)
* [License](#License)

## Project Overview
**Fast Food Fast** is a food delivery service app for restaurants. it was built from scratch using `Html` , `Css` , `JavaScript` and `Node.js`

## Features

- Users can create an account and log in,
- A user can add food to cart,
- A user can order for food,
- A user can see a history of ordered food,
- A user can write a review/ query
- The admin can add, edit or delete the fast-food items,
- The admin can see a list of fast-food items,
- The admin can See a list of orders,
- The admin can accept and decline orders
- The admin can mark orders as completed

## Demo
![fast](https://user-images.githubusercontent.com/25525765/45334718-e903b180-b573-11e8-8ecf-746704c24585.gif)

Visit [User Dashboard](https://shegsteham.github.io/Fast-Food-Fast/UI/)

Visit [Admin Dashboard](https://shegsteham.github.io/Fast-Food-Fast/UI/admin.html)

## Built with
- `HTML 5`
- `CSS`
- `JavaScript`
- `Node.js`
- `Express framework`

##### Middle Wares
- `body-parser`
- `morgan`

## API End Points
- `GET /api/v1/orders`                -   Fetches all Available Orders in the Database
- `GET /api/v1/orders/< orderId >`    -   Fetches a particular order in the database
- `POST /api/v1/orders/< orderId >`   -   Saves an Order in the database
- `PUT /api/v1/orders/< orderId >`    -   Updates the status of an order in the database
- `DELETE /api/v1/orders/< orderId >` -   Deletes an order in the database

## Known issues
Everything works as expected; However:
- the front-end is not complete, i.e. no authentication, few client-side
   validation and no link for API calls yet.
- Data structures were used to save data instead of a database, hence data gets
   erased once the server is restarted

## Installation

- $ git clone `https://github.com/shegsteham/Fast-Food-Fast.git`
- $ cd Fast-Food-Fast
- $ npm i , to install dependencies
- $ npm start, to start the server
Once the server starts-up, you can query the api at `http://localhost:5000/api/v1` using the end points stated above

## Contributing
>  Feel free to 🍴 fork this repository

>  👯 Clone this repository to your local machine using `https://github.com/shegsteham/Fast-Food-Fast.git`

> Make Contributions

> 🔃 Create a new pull request using `https://github.com/shegsteham/Fast-Food-Fast/compare`

## License
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)

- **[MIT license](https://shegsteham.github.io/Fast-Food-Fast/UI/LICENSE.md)**
- Copyright 2018 © <a href="https://shegsteham.github.io/Fast-Food-Fast/UI/" target="_blank">Fast-Food-Fast</a>
