import { Request, Response, NextFunction } from 'express';
import { resolveStore } from '../middleware/store';
import { LocalStorageService } from '../service/localStorageService';

const localStorageL = new LocalStorageService();

export function getAllTweets(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    return store.tweets.all()
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

// export function getTweetsOfUserById(req: Request, res: Response, next: NextFunction) {
//     const store = resolveStore(res);
//     store.tweets.findByUserName(req.params.userName)
//         .then((data) => {
//             res.send(data);
//             res.status(200);
//         })
//         .catch((err) => next(err))
// }

//fix this to be with userName
export function deleteTweetById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findById(localStorageL.getLocalStorage('userId'))
        .then((data) => {
            store.tweets.deleteById(req.params.id, data!)
                .then((data) => {
                    res.send(data); //returns true or false
                    res.status(204);
                })
                .catch((err) => next(err))
        }).catch((err) => next(err))

}

//works stage 1
export function getTweetById(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.tweets.findById(req.params.id)
        .then((data) => {
            res.send(data);
            res.status(200);
        })
        .catch((err) => next(err))
}

//works stage 1
export function postTweet(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.users.findById(localStorageL.getLocalStorage('userId'))
        .then((data) => {
            store.tweets.add(req.body.content, data!)
                .then((data) => {
                    res.send(data);
                    res.status(201);
                })
                .catch((err) => next(err))
        })
        .catch((err) => next(err))
}

export function toggleTweetStar(req: Request, res: Response, next: NextFunction) {
    const store = resolveStore(res);
    store.tweets.updateStarsCount(req.params.id, localStorageL.getLocalStorage('userId'))
        .then((data) => {
            res.send(data);
            res.status(201);
        })
        .catch((err) => next(err))
}

