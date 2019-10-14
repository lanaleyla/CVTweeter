import mongodb from 'mongodb';
import { buildDB } from '../service/createDBService';

export class MongoDBConnection {
    private client: mongodb.MongoClient | undefined;
    public db: mongodb.Db | undefined;
    private initialized = false;

    constructor(public readonly url: string, ) { }

    //CONNECT TO DATA BASE
    public async connect(): Promise<void> { 
        this.client = await mongodb.MongoClient.connect(
            this.url,
            { useUnifiedTopology: true, useNewUrlParser: true },
        );
        this.db = this.client.db();
        this.initialized = true;
    }

     //CREATE A DATA BASE
    public async createDB() {
        await buildDB(this.db);
    }

    //CLOSE DATA BASE CONNECTION
    public async close(): Promise<void> {
        if (!this.initialized) return;
        await this.client!.close();
        this.initialized = false;
    }
}