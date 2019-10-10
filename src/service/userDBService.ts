//USER QUERIES TO THE DATA BASE 
import mongodb from 'mongodb';
import { User, IUser } from '../models/index';

export class UserDBService {//REPLACE T TO I TWEET INTERFACE
    private collection: mongodb.Collection;
    constructor(db: mongodb.Db,) {
        this.collection = db.collection('users');
    }

    public async all(): Promise<void[]> {//GET ALL USERS
        const projection = { _id: 0 };
        return await this.collection.find({}, { projection }).toArray();
    }

    public async findById(id: string | mongodb.ObjectID): Promise<null> {//GET USER BY ID
        const documentId = new mongodb.ObjectID(id);
        const projection = { _id: 0 };
        return await this.collection.findOne({ _id: documentId }, { projection });
    }

    public async findByEmail(email: string): Promise<null> {//GET USER BY his email
        const projection = { _id: 0 };
        return await this.collection.findOne({ email: email }, { projection });
    }

    //ASK IF ITS OK TO NOT PASS PROMISE OR HANDLE IT INSIDE THIS FUNCTION
    public async add(user: IUser): Promise<void> {//ADD USER TO DATA BASE
        if (user) {
            const id = new mongodb.ObjectID();
            const userToAdd: User = new User(id, id.toHexString(), user.userName, user.email, user.password, user.image, new Date());
            await this.collection.insertOne(userToAdd)
                .then(user => console.log(user))
                .catch(err => console.log(err.errmsg))
        }
    }

    public async deleteById(id: string | mongodb.ObjectID): Promise<boolean> {//DELETE USER BY ID
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.deleteOne({ _id: documentId });
        return !!result.deletedCount;
    }

    public async replaceLastLogin(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.updateOne(
            { _id: documentId },
            {
                $set: { date: new Date() }
            });
        return !!(result.modifiedCount + result.upsertedCount);
    }

    //UPDATE TWEETS THAT USER STARED???//

}



















    // public async findByUserName(userName: string): Promise<T | null> {//GET USER BY ID
    //     const projection = { _id: 0 };
    //     return await this.collection.findOne({ userName: userName }, { projection });
    // }




