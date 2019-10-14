import { Router } from 'express';
import * as userController from '../controllers/usersController';
import { validateName, validateEmail, validateId } from '../validations/userValidation';


const router = Router(); //our router

//return all users  
router.get('/', userController.getAllUsers);

//get user by id
router.get('/:id', validateId, userController.getUserById);

//get user by email
router.get('/:email', validateEmail, userController.getUserByEmail);

//get tweets of a user
router.get('/:id/tweets', validateId, userController.getUsersTweets); //first get id, then get tweets using tweets service

export { router as userRouter };



