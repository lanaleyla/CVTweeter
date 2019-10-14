import { Router } from 'express';
import * as tweetController from '../controllers/tweetsController';
import { validateContent, validateId } from '../validations/tweetValidation';

const router = Router(); //our router

//post tweets
router.post('/tweets', validateContent);

//get all tweets
router.get('/', tweetController.getAllTweets);

//get tweet by id 
router.get('/:id', validateId, tweetController.getTweetById)

//delete tweet by id
router.delete('/:id', validateId, tweetController.deleteTweetById);

//get all tweets of a user by his id
router.get('/:id/tweets', validateId, tweetController.getTweetsOfUserById);

//update star number of a tweet by id//ASK ABOUT THE USERS ID? WHERE IS IT IN THE HEADER???
router.post('/tweets/:id/star-toggle', validateId);

export { router as tweetRouter };