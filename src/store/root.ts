import mongodb from 'mongodb';
//import CredentialsStore from './credentials';
import { TweetDBService } from '../service/tweetDBService';
import { UserDBService } from '../service/userDBService';

export interface RootStore {
  tweets: TweetDBService;
  users: UserDBService;
 // credentials: CredentialsStore;
}

export default (db: mongodb.Db): RootStore => ({
  tweets: new TweetDBService(db),
  users: new UserDBService(db),
  //credentials: new CredentialsStore(db),
});
