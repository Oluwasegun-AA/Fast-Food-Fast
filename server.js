// Imports
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import ordersRoute from './API/routes/orders';
import itemsRoute from './API/routes/foodItems';
import usersRoute from './API/routes/users';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';

let apiDocs = YAML.load('./API/api_docs.yaml');

dotenv.config();
//port declaration
const port = process.env.PORT || process.env.SV_PORT;

// Instantiate Express
const app = express();

//initialize connection message
const message = () => {
  console.log(`server running on port ${port}`);
};
//instanciate imported middlewares
app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/v1', ordersRoute);
app.use('/api/v1', itemsRoute);
app.use('/api/v1', usersRoute);

app.get('/api/v1', (req, res) => {
  return res.status(404).send({
    status: "connection successful",
    message: 'Welcome to Fast Food Fast!'
  });
});

app.use('*', (req, res) => {
  return res.status(404).send({
    status: "success",
    error: "404",
    message: ` Route  ${req.params} does not exist. You may navigate to the home route at api/v1`
  })
});


// Set listener to port for API queries
app.listen(port, message());

//export app for testing purpose
export default app;