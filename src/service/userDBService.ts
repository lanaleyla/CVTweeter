//USER QUERIES TO THE DATA BASE 
import mongodb from 'mongodb';
import { User, IUser } from '../models/index';

//USER DATA BASE MANGE SERVICE
export class UserDBService {
    private collection: mongodb.Collection;
    constructor(db: mongodb.Db, ) {
        this.collection = db.collection('users');
    }

    //GET ALL USERS
    public async all(): Promise<IUser[]> {//GET ALL USERS
        const projection = { _id: 0 };
        return await this.collection.find({}, { projection }).toArray();
    }

    //GET USER BY ID
    public async findById(id: string | mongodb.ObjectID): Promise<IUser | null> {//GET USER BY ID
        const documentId = new mongodb.ObjectID(id);
        const projection = { _id: 0 };
        const result = await this.collection.findOne({ _id: documentId }, { projection });
        if (!result) {
            throw new Error('no member')
        }
        else return result;
    }

    //GET USER BY EMAIL
    public async findByEmail(email: string): Promise<IUser | null> {//GET USER BY his email
        const projection = { _id: 0 };
        return await this.collection.findOne({ email: email }, { projection });
    }

    //GET USER BY USER NAME
    public async findByUserName(userName: string): Promise<IUser | null> {//GET USER BY his user name
        const projection = { _id: 0 };
        return await this.collection.findOne({ userName: userName }, { projection });
    }

    //ADD USER TO DATA BASE
    public async add(user: IUser): Promise<any> {
        const id = new mongodb.ObjectID();
        const userToAdd: User = new User(id, id.toHexString(), user.userName, user.email, user.image, new Date(), new Date());
        const result = await this.collection.insertOne(userToAdd);
        return result.ops;
    }

    //DELETE USER BY ID
    public async deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.deleteOne({ _id: documentId });
        return !!result.deletedCount;
    }

    //UPDATE USERS LAST LOGIN PROPERTY
    public async replaceLastLogin(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.updateOne(
            { _id: documentId },
            {
                $set: { lastLogin: new Date() }
            });
        return !!(result.modifiedCount + result.upsertedCount);
    }
}



















    // public async findByUserName(userName: string): Promise<T | null> {//GET USER BY ID
    //     const projection = { _id: 0 };
    //     return await this.collection.findOne({ userName: userName }, { projection });
    // }




