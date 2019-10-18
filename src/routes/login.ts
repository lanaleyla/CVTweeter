import { Router } from 'express';
import * as loginController from '../controllers/loginController';
import * as registerController from '../controllers/registerController';
import { validatePassword, validateEmail } from '../validations/credentialValidation';

const router = Router(); //our router

router.post('/login', loginController.loginUser);

router.post('/register', validatePassword, registerController.registerUser);

export { router as loginRouter };
