import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserCredential } from '../models';
import { CredentialDBService } from '../service/credentialDBService';
import { getDb } from '../middleware/store';
import { getSecretKey } from '../utils/config';
import bcrypt from 'bcrypt';

export function initPassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (email, password, callback) => {
            const credentials = new CredentialDBService(getDb()!);
            credentials.findCredentialByEmail(email)
                .then((data) => {
                    if (data) {
                        //check password
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
            secretOrKey: getSecretKey(),
        },
        (jwtPayload: UserCredential, callback) => {
            callback(null, jwtPayload);
        }
    ));
}
