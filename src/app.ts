import express from "express";
import cors from "cors";
import { logMiddleware } from './middleware/log';
import { initConfig } from "./utils/config";
import { userRouter } from './routes/user';
import { tweetRouter } from './routes/tweet';
import storeMiddleware from './middleware/store';
import { loginRouter } from "./routes/login";
import { initPassport } from './utils/passport';
import { validationErrorHandler } from "./middleware/error";

initConfig();
initPassport();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logMiddleware); //works

app.use(storeMiddleware());
app.use('/api/auth', loginRouter);   //handle request about login/register
app.use('/api/members', userRouter); //handle requests about products
app.use('/api/tweets', tweetRouter); //handle requests about categories

app.use(validationErrorHandler);

export default app;












// import path from 'path';
//app.use('/static', express.static(path.join(__dirname, 'public')));
