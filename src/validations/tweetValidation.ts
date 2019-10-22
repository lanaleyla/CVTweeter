import { Request, Response, NextFunction } from 'express';
import { tweetSchema } from './validationScheme';
import joi from 'joi';

//validate id
export function validateId(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const result = joi.validate({ id: id }, tweetSchema);
    if (result.error !== null) {
        throw new Error("id format");
    }
    else next();
}

//validate content
export function validateContent(req: Request, res: Response, next: NextFunction) {
    const result = joi.validate({ content: req.body.content }, tweetSchema);
    if (result.error !== null) {
        throw new Error("content input");
    }
    else next();
}

