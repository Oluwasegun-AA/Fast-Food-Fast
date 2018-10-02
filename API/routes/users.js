//Import statements
import express from 'express';
import Controller from '../controller/users'
import Validate from '../middleware/usersValidation'
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateUserId = Validate.userIdValidation
let postvalidation = Validate.PostIdValidation

//creates an instance of the imported controller class
const controller = new Controller(); 

// Routes
router.get('/api/v1/users', controller.getUsers);
router.get('/api/v1/users/:userId', validateUserId, controller.getUser);
router.post('/api/v1/users',validate, controller.addUser);
router.post('/api/v1/users/:userId', postvalidation,validate);
router.put('/api/v1/users', validateUserId);
router.put('/api/v1/users/:userId', validateUserId, validate, controller.updateUser);
router.delete('/api/v1/users/:userId', validateUserId, controller.deleteUser);
router.delete('/api/v1/users',  validateUserId);

export default router;