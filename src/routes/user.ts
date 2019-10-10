import { Router } from 'express';
import * as userController from '../controllers/usersController';

const router = Router(); //our router

//return all users  
router.get('/',userController.getAllUsers);

//register new user
router.post('/auth/register');

//login to the system
router.post('/auth/login');

//get user by id
router.get('/:id',userController.getUserById);

//get tweets of a user
router.get('/members/:id/tweets');

export { router as userRouter };



