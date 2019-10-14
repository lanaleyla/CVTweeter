import mongodb from 'mongodb';
import {CredentialDBService} from '../service/credentialDBService'
import { TweetDBService } from '../service/tweetDBService';
import { UserDBService } from '../service/userDBService';

export interface RootStore {
  tweets: TweetDBService;
  users: UserDBService;
  credentials: CredentialDBService;
}

export default (db: mongodb.Db): RootStore => ({
  tweets: new TweetDBService(db),
  users: new UserDBService(db),
  credentials: new CredentialDBService(db),
});
