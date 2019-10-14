import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as registerController from '../controllers/registerController';

const router = Router(); //our router

router.post('/login', loginController.loginUser);

router.post('/register',registerController.registerUser);//save in db after validation and then preform login

export { router as loginRouter };
