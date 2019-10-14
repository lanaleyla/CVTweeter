import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
//import { getSecretKey } from './config';
import { UserCredential } from '../models';
import { CredentialDBService } from '../service/credentialDBService';
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
            credentials.findCredentialByEmail(email)
                .then(data => {
                    if (data) {
                        bcrypt.compare(password, data.password, function (err, res) {
                            if (res) {
                                callback(null, data, { message: 'succeeded' });
                            } else {
                                console.log('error in login, please try again');
                                callback(null, false, { message: 'failed' });
                            }
                        });
                    }
                })
                .catch((err) => {
                    callback(null, false, { message: 'failed' });
                })
        }
    ));

    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'vas_adelante',
        },
        // in this case the user credential is actually the same as jwtPayload
        // can consider simply passing jwtPayload, however it might be stale (common though)
        // trade-off: lightweight token vs. required info for most API's to reduce user re-query needs
        (jwtPayload: UserCredential, callback) =>
            callback(null, jwtPayload),
    ));
}
