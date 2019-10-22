import { Router } from 'express';
import * as userController from '../controllers/usersController';
import { validateName } from '../validations/userValidation';

const router = Router(); //our router

//return all users  
router.get('/', userController.getAllUsers);

//get user by id 
router.get('/:userName', validateName, userController.getUserByUserName);

//get user by email 
router.get('/user/:email', userController.getUserByEmail);//add email validation

//get user by userName
router.get('/profile/:userName', userController.getUserByUserName);//add email validation

//get tweets of a user
router.get('/:userName/tweets',validateName, userController.getUsersTweets); 

export { router as userRouter };


