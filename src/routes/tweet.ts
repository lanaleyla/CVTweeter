import { Router } from 'express';
import * as tweetController from '../controllers/tweetsController';
import { validateContent, validateId } from '../validations/tweetValidation';
import { authenticate } from '../middleware/auth';

const router = Router(); //our router

//post tweets
router.post('/', authenticate(), validateContent, tweetController.postTweet);
//authenticate()

//get all tweets //works
router.get('/', tweetController.getAllTweets);

//get tweet by id //works
router.get('/:id', validateId, tweetController.getTweetById)

//delete tweet by id //works
router.delete('/:id', authenticate(), validateId, tweetController.deleteTweetById);

//update star number of a tweet by id//ASK ABOUT THE USERS ID? WHERE IS IT IN THE HEADER???
router.post('/:id/star-toggle', authenticate(), validateId,tweetController.toggleTweetStar);

export { router as tweetRouter };