import { Request, Response, NextFunction } from 'express';
import { resolveStore } from '../middleware/store';

export function getAllTweets(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    return store.tweets.all()
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

export function getTweetsOfUserById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.tweets.findByUserName(req.params.userName)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

export function deleteTweetById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.tweets.deleteById(req.params.id)
        .then((data) => {
            res.send(data); //returns true or false
            res.status(200);
        })
        .catch((err) => next(err))
}
// export function postTweet(req: Request, res: Response, next: NextFunction{}
