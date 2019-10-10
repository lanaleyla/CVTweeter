import express from "express";
import cors from "cors";
import { logMiddleware } from './middleware/log';
import { initConfig } from "./utils/config";
import { userRouter } from './routes/user';
import { tweetRouter } from './routes/tweet';
import storeMiddleware from './middleware/store';

// import { validationErrorHandler } from "./middleware/error";
// import path from 'path';

initConfig();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logMiddleware); //works

//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(storeMiddleware());
app.use('/api/members', userRouter); //handle requests about products
app.use('/api/tweets', tweetRouter); //handle requests about categories

//app.use(validationErrorHandler);

export default app ;





