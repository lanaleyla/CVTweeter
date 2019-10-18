import { Router } from 'express';
import * as userController from '../controllers/usersController';
import { validateName, validateEmail, validateId } from '../validations/userValidation';

const router = Router(); //our router

//return all users  //works
router.get('/', userController.getAllUsers);

//get user by id //works
router.get('/:id', validateId, userController.getUserById);

//get user by email //works
router.get('/:email', validateEmail, userController.getUserByEmail);

//get tweets of a user
router.get('/:userName/tweets',validateName, userController.getUsersTweets); 

export { router as userRouter };



