import { User, Tweet } from '../models/index';
import tweets from '../assets/tweets.json'; 
import users from '../assets/users.json';
import mongodb from 'mongodb';
import bcrypt from 'bcrypt';

export async function buildDB(db: mongodb.Db | undefined) {
    const listOfTweets = tweets.tweets;
    const listOfUsers = users.users;
    const salt = await bcrypt.genSalt(10);
    if (db) {
        addCollections(db, 'users');
        addCollections(db, 'tweets');
        const collectionUsers = db.collection('users');
        const collectionTweets = db.collection('tweets');
        collectionUsers.createIndex({ "userName": 1, "id": 1,"email":1 }, { unique: true });
        collectionTweets.createIndex({ "id": 1 }, { unique: true });

        listOfUsers.forEach(
            async user => {
                const _id = new mongodb.ObjectID();
                user.id = _id.toHexString();//ASSIGN ID
                const pass = await bcrypt.hash(user.password, salt);
                user.password = pass;
                user = Object.assign({}, user, { _id: user.id, })
                await collectionUsers.insertOne(new User(_id, user.id, user.userName, user.email, user.password, user.image,new Date()));
            }
        )

        listOfTweets.forEach(
            async tweet => {
                const _id = new mongodb.ObjectID();
                tweet.id = _id.toHexString();//ASSIGN ID
                tweet = Object.assign({}, tweet, { _id: tweet.id, })
                const today = new Date();
                await collectionTweets.insertOne(new Tweet(_id, tweet.id, tweet.userName, tweet.userImage, today, tweet.content, tweet.numberOfStars,tweet.userListThatGaveStar));
            }
        )
    }
}

export async function addCollections(db: mongodb.Db, collectionsName: string) {
    console.log(collectionsName);
    if (db) await db.createCollection(collectionsName)
        .then(data => console.log("collection created:" + data))
        .catch((err) => console.log("error in creating collection" + err));
}
































// export async function dropCollection(db: mongodb.Db|undefined){
//     if(db) await db.dropDatabase();
// }


