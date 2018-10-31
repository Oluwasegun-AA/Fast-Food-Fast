//Import statements
import express from 'express';
import Controller from '../controllers/orders'
import Validate from '../middleware/ordersValidation'
import userCheck from '../middleware/usersValidation';
import { verifyAdmin, verifyUserToken } from '../middleware/verifyToken';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateOrderId = Validate.orderIdValidation;
let postvalidation = Validate.PostIdValidation

//creates an instance of the imported controller class
const controller = new Controller(); 

// Routes
router.get('/orders',verifyUserToken, verifyAdmin, controller.getOrders);
router.get('/orders/:orderId', verifyUserToken, verifyAdmin,validateOrderId, controller.getOrder);
router.get('/users/:userId/orders', userCheck.userIdValidation , controller.userOrderHistory);
router.post('/orders',validate, controller.addOrder);
router.post('/orders/:orderId', postvalidation,validate);
router.put('/orders/', validateOrderId);
router.put('/orders/:orderId',verifyUserToken, verifyAdmin, validateOrderId, validate, controller.updateOrder);
router.delete('/orders/:orderId', validateOrderId, controller.deleteOrder);
router.delete('/orders',  validateOrderId);

export default router;