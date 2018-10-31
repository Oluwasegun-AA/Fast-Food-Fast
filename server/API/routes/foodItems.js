//Import statements
import express from 'express';
import Controller from '../controllers/foodItems'
import Validate from '../middleware/foodItemsValidation'
import { verifyAdmin, verifyUserToken } from '../middleware/verifyToken';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation
let validateFoodItemId = Validate.foodItemIdValidation
let postvalidation = Validate.PostIdValidation

 //creates an instance of the imported controller class
const controller = new Controller(); 

// Routes
router.get('/menu', controller.getFoodItems);
router.get('/menu/:itemId', validateFoodItemId, controller.getFoodItem);
router.post('/menu',verifyUserToken, verifyAdmin, validate, controller.addFoodItem);
router.post('/menu/:itemId', postvalidation,validate);
router.put('/menu', validateFoodItemId);
router.put('/menu/:itemId',verifyUserToken, verifyAdmin, validateFoodItemId, validate, controller.updateFoodItem);
router.delete('/menu/:itemId',verifyUserToken, verifyAdmin, validateFoodItemId, controller.deleteFoodItem);
router.delete('/menu',  validateFoodItemId);

export default router;