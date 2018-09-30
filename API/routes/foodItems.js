//Import statements
import express from 'express';
import Controller from '../controller/foodItems'
import Validate from '../middleware/foodItemsValidation'
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation
let validateFoodItemId = Validate.foodItemIdValidation
let postvalidation = Validate.PostIdValidation

 //creates an instance of the imported controller class
const controller = new Controller(); 

// Routes
router.get('/api/v1/foodItems', controller.getFoodItems);
router.get('/api/v1/foodItems/:itemId', validateFoodItemId, controller.getFoodItem);
router.post('/api/v1/foodItems',validate, controller.addFoodItem);
router.post('/api/v1/foodItems/:itemId', postvalidation,validate);
router.put('/api/v1/foodItems', validateFoodItemId);
router.put('/api/v1/foodItems/:itemId', validateFoodItemId, validate, controller.updateFoodItem);
router.delete('/api/v1/foodItems/:itemId', validateFoodItemId, controller.deleteFoodItem);
router.delete('/api/v1/foodItems',  validateFoodItemId);

export default router;