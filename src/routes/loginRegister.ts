import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as registerController from '../controllers/registerController';
import { validatePassword } from '../validations/credentialValidation';

const router = Router(); //our router

//login to the system
router.post('/login',loginController.loginUser);

//register to the system
router.post('/register',validatePassword, registerController.registerUser);

export { router as loginRegisterRouter };
