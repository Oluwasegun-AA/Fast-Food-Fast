//Import statements
import express from 'express';
import Controller from '../controllers/users';
import Validate from '../middleware/usersValidation';
import {verifyUserToken} from '../middleware/verifyToken';
const router = express.Router();

//create an instance of the request validation middlewares
let validate = Validate.Validation;
let validateUserId = Validate.userIdValidation;
let postvalidation = Validate.PostIdValidation;

//creates an instance of the imported controller class
const controller = new Controller();

// Routes
router.get('/users', controller.getUsers);
router.get('/users/:userId', validateUserId, controller.getUser);
router.post('/auth/login', validate,verifyUserToken,controller.login);
router.post('/auth/signup', validate, controller.signup);
router.post('/users', validate, verifyUserToken,validate, controller.addUser);
router.post('/users/:userId', verifyUserToken,postvalidation);
router.put('/users', validateUserId);
router.put('/users/:userId', validateUserId, validate, controller.updateUser);
router.delete('/users/:userId', validateUserId, controller.deleteUser);
router.delete('/users',  validateUserId);

export default router;