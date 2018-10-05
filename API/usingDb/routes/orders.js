//Import statements
import express from 'express';
import Controller from '../controllers/orders'
import Validate from '../../usingDb/middleware/ordersValidation'
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateOrderId = Validate.orderIdValidation;
let postvalidation = Validate.PostIdValidation

//creates an instance of the imported controller class
const controller = new Controller(); 

// Routes
router.get('/api/v1/orders', controller.getOrders);
router.get('/api/v1/orders/:orderId', validateOrderId, controller.getOrder);
router.post('/api/v1/orders',validate, controller.addOrder);
router.post('/api/v1/orders/:orderId', postvalidation,validate);
router.put('/api/v1/orders', validateOrderId);
router.put('/api/v1/orders/:orderId', validateOrderId, validate, controller.updateOrder);
router.delete('/api/v1/orders/:orderId', validateOrderId, controller.deleteOrder);
router.delete('/api/v1/orders',  validateOrderId);

export default router;