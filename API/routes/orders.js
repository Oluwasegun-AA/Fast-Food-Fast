//Import statements
import express from 'express';
import controller from '../controller/orders'
import validation from '../middleware/validation'
const router = express.Router();

//create an instance of the request validation middlewares
let Validate = validation.Validation;
let validateOrderId = validation.orderIdValidation;
let postvalidation = validation.PostIdValidation

//creates an instance of the imported controller class
const Controller = new controller(); 

// Routes
router.get('/api/v1/orders', Controller.getOrders);
router.get('/api/v1/orders/:orderId', validateOrderId, Controller.getOrder);
router.post('/api/v1/orders',Validate, Controller.addOrder);
router.post('/api/v1/orders/:orderId', postvalidation,Validate);
router.put('/api/v1/orders', validateOrderId);
router.put('/api/v1/orders/:orderId', validateOrderId, Validate, Controller.updateOrder);
router.delete('/api/v1/orders/:orderId', validateOrderId, Controller.deleteOrder);
router.delete('/api/v1/orders',  validateOrderId);

export default router;