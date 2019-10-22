import { Request, Response, NextFunction } from 'express';
import { resolveStore } from '../middleware/store';

//GET ALL USERS
export function getAllUsers(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    return store.users.all()
        .then(
            (data) => {
                res.send(data);
                res.status(200);
            }
        )
        .catch((err) => next(err));
}

//GET USER BY ID
export function getUserById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findById(req.params.id)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

//GET USER BY NAME
export function getUserByUserName(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findByUserName(req.params.userName)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

//GET USER BY EMAIL
export function getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findByEmail(req.params.email)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

//UPDATE USERS LAST LOGIN
export function updateUsersLastLoginById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.replaceLastLogin(req.params.id)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => {
            next(err);
        })
}

//GET TWEETS OF A SPECIFIC USER NAME
export function getUsersTweets(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.tweets.findTweetsByUserName(req.params.userName)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => {
            next(err);
        })
}

