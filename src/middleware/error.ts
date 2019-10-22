import { Request, Response, NextFunction } from 'express';

export function clientErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (!req.xhr) {
    res.status(500).send({ error: 'Something failed!' });//server error
  } else {
    next(err);
  }
}

//error handler 
export function validationErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.log(err.message);
  if(err.message==='request entity too large')
  {
    res.status(413);
    res.send(`${err.message} error`);
  }
  else if (err.message === 'user name input' || err.message === 'id format' || err.message === 'password input' || err.message === 'invalid credentials' || err.message === 'content input' || err.message === 'email input') {
    res.status(400);
    res.send(`${err.message} error`);
  }
  else if (err.message === 'no member' || err.message === 'tweet not found') {
    res.status(404);
    res.send(`${err.message} error`);
  }
  else if (err.message === 'email exists' ||err.message === 'name exists') {
    res.status(409);
    res.send(`${err.message} error`);
  }
  else if (err.message === 'anauthorized') {
    res.status(401);
    res.send(`${err.message} error`);
  }
  else if (err.message === 'not the owner') {
    res.status(403);
    res.send(`${err.message} error`)
  }
  else next(err);
}
