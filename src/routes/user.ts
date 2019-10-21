import { Router } from 'express';
import * as userController from '../controllers/usersController';
import { validateName, validateEmail, validateId } from '../validations/userValidation';

const router = Router(); //our router

//return all users  //works
router.get('/', userController.getAllUsers);

//get user by id //works
router.get('/:id', validateId, userController.getUserById);

//get user by email //works
router.get('/user/:email', userController.getUserByEmail);//add email validation

router.get('/profile/:userName', userController.getUserByUserName);//add email validation

//get tweets of a user
router.get('/:userName/tweets',validateName, userController.getUsersTweets); 

router.get('/:id/tweets',validateName, userController.getUsersTweets); 

export { router as userRouter };



