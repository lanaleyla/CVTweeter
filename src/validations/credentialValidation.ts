import { Request, Response, NextFunction } from 'express';
import { credentialSchema } from './validationScheme';
import joi from 'joi';

//validate id
export function validateId(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    const result = joi.validate({ id: id }, credentialSchema);
    if (result.error !== null) {
        throw new Error("id format");
    }
    else next();
}

//validate password
export function validatePassword(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ password: req.body.password }, credentialSchema);
    if (result.error !== null) {
        throw new Error("password input");
    }
    else next();
}

//validate email
export function validateEmail(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ email: req.body.email }, credentialSchema);
    if (result.error !== null) {
        throw new Error("email input");
    }
    else next();
}

