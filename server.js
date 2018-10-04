// Imports
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ordersRoute from './API/routes/orders';
import itemsRoute from './API/routes/foodItems'
import usersRoute from './API/routes/users'
dotenv.config();
//port declaration
const port = process.env.PORT || process.env.SV_PORT;

// Instantiate Express
const app = express();

//initialize connection message
const message = ()=>{
  console.log(`server running on port ${port}`);
};
//instanciate imported middlewares
app.use (logger('common'));
app.use(bodyParser.json());

app.use(ordersRoute);
app.use(itemsRoute);
app.use(usersRoute);


// Set listener to port for API queries
app.listen(port, message());


//export app for testing purpose
  export default app;