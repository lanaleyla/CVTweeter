import { Router } from 'express';
import * as tweetController from '../controllers/tweetsController';

const router = Router(); //our router

//post tweets
router.post('/tweets')

//get all tweets
router.get('/', tweetController.getAllTweets);

//delete tweet by id
router.delete('/:id', tweetController.deleteTweetById);

//get all tweets of a user by his id
router.get('/:id/tweets', tweetController.getTweetsOfUserById);

//update star number of a tweet by id//ASK ABOUT THE USERS ID? WHERE IS IT IN THE HEADER???
router.post('/tweets/:id/star-toggle');

export { router as tweetRouter };