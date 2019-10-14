//TWEET QUERIES TO THE DATA BASE 
import mongodb from 'mongodb';
import { Tweet, ITweet } from '../models/index';

//TWEETS DATA BASE MANGE SERVICE
export class TweetDBService {
    private collection: mongodb.Collection;
    constructor(db: mongodb.Db, ) {
        this.collection = db.collection('tweets');
    }

    //GET ALL TWEETS
    public async all(): Promise<ITweet[]> {//GET ALL TWEETS //change to ITweet
        const projection = { _id: 0 };
        return await this.collection.find({}, { projection }).toArray();
    }

    //GET TWEET BY ID
    public async findById(id: string | mongodb.ObjectID): Promise<ITweet | null> {
        const documentId = new mongodb.ObjectID(id);
        const projection = { _id: 0 };
        return await this.collection.findOne({ _id: documentId }, { projection });
    }

    //GET TWEETS BY USER NAME
    public async findByUserName(userName: string): Promise<ITweet[] | null> {
        const projection = { _id: 0 };
        return await this.collection.find({ userName: userName }, { projection }).toArray();
    }

    //GET TWEETS BY USER ID
    public async findTweetsById(id: string | mongodb.ObjectID): Promise<ITweet[] | null> {
        const documentId = new mongodb.ObjectID(id);
        const projection = { _id: 0 };
        return await this.collection.find({ _id: documentId }, { projection }).toArray();
    }

    //ADD TWEET TO DATA BASE
    public async add(tweet: ITweet): Promise<void> {
        if (tweet) {
            const id = new mongodb.ObjectID();
            const date = new Date();
            const tweetToAdd: Tweet = new Tweet(id, id.toHexString(), tweet.userName, tweet.userImage, date, tweet.content, tweet.numberOfStars, tweet.userListThatGaveStar);
            await this.collection.insertOne(tweetToAdd);
        }
    }

    //DELETE TWEET BY ID
    public async deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.deleteOne({ _id: documentId });
        return !!result.deletedCount;
    }

    public async findIfUserGaveAStarToTheTweet(tweetId: string | mongodb.ObjectID, userId: string | mongodb.ObjectID): Promise<void> {
        const documentId = new mongodb.ObjectID(tweetId);
        const projection = { _id: 0, id: 0, userName: 0, userImage: 0, date: 0, content: 0, numberOfStars: 0 };
        let users: Array<string>;
        let foundUserIndex: number;
        await this.collection.findOne({ _id: documentId }, { projection })
            .then(async (data) => {
                users = data;
                users.findIndex((u: string | mongodb.ObjectID) => u === userId);
                if (foundUserIndex > -1) {//user found remove star
                    users.splice(foundUserIndex, 1);
                    await this.updateNumberOfStarsOfATweet(tweetId, -1, users);
                    return 'removed';
                } else {//user not found add star
                    users.push(userId.toString());
                    await this.updateNumberOfStarsOfATweet(tweetId, 1, users);
                    return 'added';
                }
            }).catch((err) => console.log(err))
    }

    public async updateNumberOfStarsOfATweet(tweetId: string | mongodb.ObjectID, num: number, userList: Array<string>): Promise<boolean> {
        const documentId = new mongodb.ObjectID(tweetId);
        const resultOfUpdateCount = await this.collection.updateOne({ _id: documentId }, { $inc: { numberOfStars: num } });
        const resultOfUpdateList = await this.collection.replaceOne({ _id: documentId }, userList);
        return !!(resultOfUpdateCount.result && resultOfUpdateList.result);
    }
}




