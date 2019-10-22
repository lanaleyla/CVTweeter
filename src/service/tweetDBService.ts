//TWEET QUERIES TO THE DATA BASE 
import mongodb from 'mongodb';
import { Tweet, ITweet, IUser } from '../models/index';
import { LocalStorageService } from './localStorageService';

const localStorageL = new LocalStorageService();

//TWEETS DATA BASE MANGE SERVICE
export class TweetDBService {
    private collection: mongodb.Collection;
    constructor(db: mongodb.Db, ) {
        this.collection = db.collection('tweets');
    }

    //GET ALL TWEETS (AND ASSIGN STARBYME PROPERTY)
    public async all(): Promise<ITweet[]> {//GET ALL TWEETS //change to ITweet
        const projection = { _id: 0};
        const result = await this.collection.find({}, { projection }).toArray();
        result.forEach(element => {
            const foundUserIndex = element.userListThatGaveStar.findIndex((u: string) => u === localStorageL.getLocalStorage('userId'));
            if (foundUserIndex > -1) {
                element.starByMe = true;
            }
            else element.starByMe = false;
        })
        return result;
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
    public async findTweetsByUserName(userName: string): Promise<ITweet[] | null> {
        const projection = { _id: 0 };
        const result = await this.collection.find({ userName: userName }, { projection }).toArray();
        if (!result) {
            throw new Error('no member');
        }
        else {
            result.forEach(element => {
                const foundUserIndex = element.userListThatGaveStar.findIndex((u: string) => u === localStorageL.getLocalStorage('userId'));
                if (foundUserIndex > -1) {
                    element.starByMe = true;
                }
                else element.starByMe = false;
            })
            return result;
        }
    }

    //ADD TWEET TO DATA BASE 
    public async add(tweetontent: string, user: IUser): Promise<any> {
        const id = new mongodb.ObjectID();
        const date = new Date();
        const tweetToAdd: Tweet = new Tweet(id, id.toHexString(), user.userName, user.image, date, tweetontent, 0, false, []);
        const result = await this.collection.insertOne(tweetToAdd);
        return result.ops;
    }

    //DELETE TWEET BY ID 
    public async deleteById(id: string | mongodb.ObjectID, user: IUser): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        await this.findById(documentId)//get the tweet for owner validation
            .then((data) => {
                if (data && data.userName !== user.userName)//fix this to compare to user id or username
                    throw new Error('not the owner');
            })
        const result = await this.collection.deleteOne({ _id: documentId });//delete the tweet
        if (!result.deletedCount) {
            throw new Error('tweet not found');
        }
        else
            return !!result.deletedCount;
    }

    //TOGGLE A STAR
    public async updateStarsCount(tweetId: string | mongodb.ObjectID, userId: string | mongodb.ObjectID): Promise<any> {
        const documentId = new mongodb.ObjectID(tweetId);
        const projection = { _id: 0, id: 0, userName: 0, userImage: 0, date: 0, content: 0 };//returns the users that gave a star array
        let foundUserIndex: number;
        return await this.collection.findOne({ _id: documentId }, { projection })//find the tweet
            .then(async (data) => {//the tweet
                if (data) {
                    foundUserIndex = data.userListThatGaveStar.findIndex((u: string) => u === userId.toString());
                    if (foundUserIndex > -1) {//user found remove star 
                        data.userListThatGaveStar.splice(foundUserIndex, 1);
                        await this.updateNumberOfStarsOfATweet(tweetId, -1, data.userListThatGaveStar);
                        return { stars: data.numberOfStars - 1, starByMe: false };
                    } else {//user not found add star
                        data.userListThatGaveStar.push(userId.toString());
                        await this.updateNumberOfStarsOfATweet(tweetId, 1, data.userListThatGaveStar);
                        return { stars: data.numberOfStars + 1, starByMe: true };
                    }
                }
                else {
                    throw new Error('tweet not found');
                }
            })
    }

    //UPDATE STARBYME PROPERTY AND USERS THAT GAVE A STAR ARRAY PROPERTY
    public async updateNumberOfStarsOfATweet(tweetId: string | mongodb.ObjectID, num: number, userList: Array<string>): Promise<boolean> {
        const documentId = new mongodb.ObjectID(tweetId);
        const resultOfUpdateCount = await this.collection.updateOne({ _id: documentId }, { $inc: { numberOfStars: num } });//inc number od stars
        const resultOfUpdateList = await this.collection.replaceOne({ _id: documentId }, { $set: { userListThatGaveStar: userList } });//replace list
        return !!(resultOfUpdateCount.result && resultOfUpdateList.result);
    }
}
