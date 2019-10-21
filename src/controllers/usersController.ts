import { Request, Response, NextFunction } from 'express';
import { resolveStore } from '../middleware/store';

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

export function getUserById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findById(req.params.id)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

export function getUserByUserName(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findByUserName(req.params.userName)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

export function getUserByEmail(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findByEmail(req.params.email)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

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


