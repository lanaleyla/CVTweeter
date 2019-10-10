import mongodb from 'mongodb';
import { buildDB } from '../service/DBService';

export class MongoDBConnection {
    private client: mongodb.MongoClient | undefined;
    public db: mongodb.Db | undefined;
    private initialized = false;

    constructor(public readonly url: string, ) { }

    public async connect(): Promise<void> {
        this.client = await mongodb.MongoClient.connect(
            this.url,
            { useUnifiedTopology: true, useNewUrlParser: true },
        );
        this.db = this.client.db();
        this.initialized = true;
    }

    public async createDB() {
        await buildDB(this.db);
    }

    //DELETE I THINK////////////////////////////////////////////////////////
    /* public async addCollection(collectionName: string): Promise<void> {
         if (this.db) await this.db.createCollection(collectionName)
     }*/

    public async close(): Promise<void> {
        if (!this.initialized) return;
        await this.client!.close();
        this.initialized = false;
    }

    // public async dropCollection(): Promise<void> {
    //     await dropCollection(this.db);
    // }
}