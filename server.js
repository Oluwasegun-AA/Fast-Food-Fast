// Imports
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;

// Instantiations
let app = express();

//Middlewares
app.use (logger('common'));
app.use(bodyParser.json());

// Routes
app.get('/api/v1/orders', routes.orders.getOrders);
app.get('/api/v1/orders/:orderId', routes.orders.getOrder);
app.post('/api/v1/orders', routes.orders.addOrder);
app.put('/api/v1/orders/:orderId', routes.orders.updateOrder);
app.delete('/api/v1/orders/:orderId', routes.orders.deleteOrder);

// Bootup
app.listen(port,  () => {
    console.log(`server running on port ${port}`);
  });