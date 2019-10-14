import { User, Tweet, UserCredential } from '../models/index';
import tweets from '../assets/tweets.json';
import users from '../assets/users.json';
import credentials from '../assets/credentials.json';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';

//DATA BASE CREATION//not finished //////////////////////////////****************************************** */
export async function buildDB(db: mongodb.Db | undefined) {
    const listOfTweets = tweets.tweets;
    const listOfUsers = users.users;
    const listOfCredentials = credentials.credentials;

    //preper hash salt for the password encryption
    const salt = await bcrypt.genSalt(10);

    if (db) {

        //add collections to the data base
        addCollections(db, 'users');
        addCollections(db, 'tweets');
        addCollections(db, 'credentials');

        //get the collections
        const collectionUsers = db.collection('users');
        const collectionTweets = db.collection('tweets');
        const collectionCredentials = db.collection('credentials');

        //create indexes
        collectionUsers.createIndex({ "userName": 1, "id": 1, "email": 1 }, { unique: true });
        collectionTweets.createIndex({ "id": 1 }, { unique: true });
        collectionCredentials.createIndex({ "id": 1, "email": 1 }, { unique: true });

        //insert data to the collections
        listOfUsers.forEach(
            async user => {
                const _id = new mongodb.ObjectID();//create object id
                user.id = _id.toHexString();
                const credential = listOfCredentials.find(credential => credential.email === user.email);
                if (credential) {
                    const pass = await bcrypt.hash(credential.password, salt);
                    const credToAdd = new UserCredential(_id, _id.toHexString(), credential.email, pass);
                    await collectionCredentials.insertOne(credToAdd);//insert credential
                }
                const date = new Date();
                await collectionUsers.insertOne(new User(_id, user.id, user.userName, user.email, user.image, date, date));//insert user
            }
        )

        listOfTweets.forEach(
            async tweet => {
                const _id = new mongodb.ObjectID();
                tweet.id = _id.toHexString();//ASSIGN ID
                const today = new Date();
                await collectionTweets.insertOne(new Tweet(_id, tweet.id, tweet.userName, tweet.userImage, today, tweet.content, tweet.numberOfStars, tweet.userListThatGaveStar)); //insert tweet
            }
        )
    }
}

export async function addCollections(db: mongodb.Db, collectionsName: string) {
    if (db) await db.createCollection(collectionsName)
        .then(data => console.log("collection created:" + data))
        .catch((err) => console.log("error in creating collection" + err));
}
































// export async function dropCollection(db: mongodb.Db|undefined){
//     if(db) await db.dropDatabase();
// }


