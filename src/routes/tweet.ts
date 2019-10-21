import { Router } from 'express';
import * as tweetController from '../controllers/tweetsController';
import { validateContent, validateId } from '../validations/tweetValidation';
import { authenticate } from '../middleware/auth';

const router = Router(); //our router

//post tweets
router.post('/', authenticate(), validateContent, tweetController.postTweet);

//get all tweets 
router.get('/', tweetController.getAllTweets);

//get tweet by id 
router.get('/:id', validateId, tweetController.getTweetById)

//delete tweet by id 
router.delete('/:id', authenticate(), validateId, tweetController.deleteTweetById);

//update star number of a tweet by id
router.post('/:id/star-toggle', authenticate(), validateId,tweetController.toggleTweetStar);

export { router as tweetRouter };