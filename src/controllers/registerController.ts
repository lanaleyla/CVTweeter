import express from 'express';
import { resolveStore } from '../middleware/store';

export function registerUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const store = resolveStore(res);
    store.users.findByEmail(req.body.email)//check if user already exists
        .then((data) => {
            if (data) {
                throw new Error('email exists');//findByUserName
            }
            else {
                store.users.findByUserName(req.body.userName)
                    .then((data) => {
                        if (data) {
                            throw new Error('name exists');
                        } else {
                            const date = new Date();
                            store.users.add({ id: '', userName: req.body.userName, email: req.body.email, image: req.body.userImage, registrationDate: date, lastLogin: date })
                                .then((data) => {
                                    store.credentials.addCredential({ id: data[0].id, email: req.body.email, password: req.body.password })
                                        .then((data) => {
                                            res.status(201);
                                            res.send(data);
                                        })
                                        .catch((err) => next(err))
                                })
                                .catch((err) => next(err))
                        }
                    }).catch((err) => next(err))
            }
        })
        .catch((err) => next(err))
}































  // const store = resolveStore(res);
    // let userT;
    // store.users.findByUserName(req.body.userName)
    //     .then((data) => {
    //         userT = data;
    //     }).catch(err => next(err))
    // if (userT) {
    //     console.log(userT);
    //     throw new Error('duplicate user');
    // }
    // else {
    //     const date = new Date();
    //     const userToAdd: IUser = { id: '', userName: req.body.userName, email: req.body.email, image: req.body.image, registrationDate: date, lastLogin: date }
    //     store.users.add(userToAdd)//add user
    //         .then((data) => {
    //             const credentialToAdd: ICredential = { id: data[0].id, email: req.body.email, password: req.body.password };
    //             store.credentials.addCredential(credentialToAdd) //add credential
    //                 .then((data) => console.log(data))
    //                 .catch((err) => next(err))
    //             res.send(data[0]); //send add result to client
    //             res.status(201);
    //         })
    //         .catch((err) => next(err))
    // }
