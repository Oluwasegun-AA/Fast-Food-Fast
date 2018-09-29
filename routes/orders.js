//Import statements
import express from 'express';
import controller from '../controller/orders'
import validation from '../middleware/validation'
const router = express.Router();

//creates an instance of the imported controller class
const Controller = new controller(); 

// Routes
router.get('/api/v1/orders', Controller.getOrders);
router.get('/api/v1/orders/:orderId', Controller.getOrder);
router.post('/api/v1/orders', validation, Controller.addOrder);
router.put('/api/v1/orders/:orderId', validation, Controller.updateOrder);
router.delete('/api/v1/orders/:orderId', Controller.deleteOrder);

export default router;