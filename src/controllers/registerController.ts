import express from 'express';
import { resolveStore } from '../middleware/store';
import { IUser, ICredential } from '../models';

export function registerUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const store = resolveStore(res);
    store.users.findByUserName(req.body.userName)
        .then((data) => {
            if (data) {
                //throw user exist error
            }
            else {
                const date = new Date();
                const userToAdd: IUser = { id: '', userName: req.body.userName, email: req.body.email, image: req.body.image, registrationDate: date, lastLogin: date }
                store.users.add(userToAdd)//add user
                    .then((data) => {
                        const credentialToAdd: ICredential = { id: data[0].id, email: req.body.email, password: req.body.password };
                        store.credentials.addCredential(credentialToAdd)//add credential
                            .catch((err) => next(err))
                        res.send(data); //send add result to client
                        res.status(200);
                    })
                    .catch((err) => next(err))
            }
        })
        .catch((err) => next(err))
}









