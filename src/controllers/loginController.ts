import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import { getSecretKey } from '../utils/config';
import { resolveStore } from '../middleware/store';

//const jwtSecret = getSecretKey('JWT_SECRET', '');
const jwtSecret = 'vas_adelante';

//LOGIN USER TO THE SYSTEM 
export function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('local', { session: false }, (err: Error, user: any, info: IVerifyOptions) => {
        if (err || !user) {
            return res.status(400).send({
                message: 'Failed',
                user,
            });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                res.send(error);
            }
            const store = resolveStore(res);
            store.users.replaceLastLogin(user.id)
            .catch(err=>next(err))
            const token = jwt.sign(user, jwtSecret);//CREATE A TOKEN
            return res.send({ user, token });
        });
    })(req, res);
}

