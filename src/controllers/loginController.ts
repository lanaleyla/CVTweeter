import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { IVerifyOptions } from 'passport-local';
import { getSecretKey } from '../utils/config';
import { resolveStore } from '../middleware/store';
import { LocalStorageService } from '../service/localStorageService';
import { IUser, IUserResToClient } from '../models';

//const jwtSecret = getSecretKey('JWT_SECRET', '');
const jwtSecret = 'vas_adelante';
const localStorageL = new LocalStorageService();

//LOGIN USER TO THE SYSTEM 
export function loginUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    passport.authenticate('local', { session: false }, (err: Error, user: any, info: IVerifyOptions) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).send({//maybe delete
                message: err,
                user,
            });
        }
        req.login(user, { session: false }, (error) => {
            if (error) {
                res.send(error);
            }
            console.log('the user is', user);
            const store = resolveStore(res);
            let u: IUserResToClient;
            store.users.replaceLastLogin(user.id)
                .then((data) => {
                    console.log(data);
                    localStorageL.setLocalStorage('userId', data!.id);
                    localStorageL.setLocalStorage('userName', data!.userName);
                    u = { id: data!.id, userName: data!.userName }
                    const token = jwt.sign(user, jwtSecret);//CREATE A TOKEN
                    return res.send({ u, token });
                })
                .catch(err => next(err))
        });
    })(req, res);
}
