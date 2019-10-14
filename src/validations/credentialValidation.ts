import { Request, Response, NextFunction } from 'express';
import { credentialSchema } from './validationScheme';
import joi from 'joi';

//validate id
export function validateId(req: Request, res: Response, next: NextFunction) {
    const id = req.body.id;
    const result = joi.validate({ id: id }, credentialSchema);
    if (result.error !== null) {
        throw new Error("id input");
    }
    else next();
}

//validate password
export function validatePassword(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ userName: req.body.password }, credentialSchema);
    if (result.error !== null) {
        throw new Error("password input");
    }
    else next();
}

//validate email
export function validateEmail(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ content: req.body.content }, credentialSchema);
    if (result.error !== null) {
        throw new Error("email input");
    }
    else next();
}

