// Imports
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';

//port declaration
const port = process.env.PORT || 5000;

// Instantiate Express
const app = express();

//initialize connection message
const message = ()=>{
  console.log(`server running on port ${port}`);
};
//instanciate imported middlewares
app.use (logger('common'));
app.use(bodyParser.json());

// Routes
app.get('/api/v1/orders', routes.orders.getOrders);
app.get('/api/v1/orders/:orderId', routes.orders.getOrder);
app.post('/api/v1/orders', routes.orders.addOrder);
app.put('/api/v1/orders/:orderId', routes.orders.updateOrder);
app.delete('/api/v1/orders/:orderId', routes.orders.deleteOrder);

// Set listener to port for API queries
app.listen(port, message());


//export app for testing purpose
  export default app;