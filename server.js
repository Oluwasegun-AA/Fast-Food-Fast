// Imports
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/orders';

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
app.use(router);

// Set listener to port for API queries
app.listen(port, message());


//export app for testing purpose
  export default app;