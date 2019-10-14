import { Request, Response, NextFunction } from 'express';
import { userSchema } from './validationScheme';
import joi from 'joi';

//validate id
export function validateId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = joi.validate({ id: id }, userSchema);
    if (result.error !== null) {
        throw new Error("id input");
    }
    else next();
}

//validate user name
export function validateName(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ userName: req.body.userName }, userSchema);//notice that the userName is in the body
    if (result.error !== null) {
        throw new Error("name input");
    }
    else next();
}

//validate content
export function validateEmail(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ content: req.body.content }, userSchema);//notice user email is in the body
    if (result.error !== null) {
        throw new Error("email input");
    }
    else next();
}

