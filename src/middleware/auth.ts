import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export function authenticate(callback?: (...args: any[]) => any) {
    return passport.authenticate('jwt', {session: false}, callback);
  }