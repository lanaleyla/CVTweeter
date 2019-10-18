//CREDENTIALS QUERIES TO THE DATA BASE 
import mongodb from 'mongodb';
import { ICredential, UserCredential } from '../models';
import bcrypt from 'bcrypt';

//CREDENTIAL HANDLE DATA BASE MANAGER SERVICE
export class CredentialDBService {
    private collection: mongodb.Collection;
    constructor(db: mongodb.Db, ) {
        this.collection = db.collection('credentials');
    }

    //GET ALL CREDENTIALS //change to ICredential
    public async all(): Promise<ICredential[]> {
        const projection = { _id: 0 };
        return await this.collection.find({}, { projection }).toArray();
    }

    //GET CREDENTIALS BY EMAIL
    public async findCredentialByEmail(email: string): Promise<ICredential | null> {
        const projection = { _id: 0 };
        return await this.collection.findOne({ email: email }, { projection });
    }

    //ADD CREDENTIAL TO DATA BASE
    public async addCredential(credential: ICredential): Promise<any> {
        const id = new mongodb.ObjectID(credential.id);
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(credential.password, salt);
        const credentialToAdd = new UserCredential(id, credential.id, credential.email, pass);
        const result = await this.collection.insertOne(credentialToAdd);
        return result.ops;
    }

    // DELETE CREDENTIAL FROM DATA BASE
    public async deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const result = await this.collection.deleteOne({ _id: documentId });
        return !!result.deletedCount;
    }
}