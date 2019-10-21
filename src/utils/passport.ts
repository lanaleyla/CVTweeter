import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//import { getSecretKey } from './config';
import { UserCredential } from '../models';
import { CredentialDBService } from '../service/credentialDBService';
import { LocalStorageService } from '../service/localStorageService';
import { getDb } from '../middleware/store';
import bcrypt from 'bcrypt';

export function initPassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, callback) => {
            const credentials = new CredentialDBService(getDb()!);
            console.log(email);
            credentials.findCredentialByEmail(email)
                .then((data) => {
                    if (data) {
                        bcrypt.compare(password, data.password, function (err, res) {
                            if (res) {
                                callback(null, data, { message: 'succeeded' });
                            } else {
                                callback(null, false, { message: 'invalid credentials' });
                            }
                        })
                    }
                    else {
                        callback(null, false, { message: 'no member' });
                    }
                })
                .catch(err => console.log(err))
        }));



    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'vas_adelante',
        },
        (jwtPayload: UserCredential, callback) => {
            callback(null, jwtPayload);
        }
    ));
}
