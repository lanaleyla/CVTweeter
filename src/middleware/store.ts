import { MongoDBConnection } from '../utils/mongoDB-connections';
import { getDBUrl } from '../utils/config';
import { Request, Response, NextFunction } from 'express';
import rootStore, { RootStore } from '../store/root';

const url = getDBUrl();
const connection = new MongoDBConnection(url);//fix this

export async function connectDb(): Promise<void> {
    await connection.connect();
}

export function createDataBase() {
    connection.createDB();
}

export function getDb() {
    return connection.db;
}

export function closeConnection() {
    return connection.close();
}

export function resolveStore(res: Response): RootStore {
    const store = res.locals.store;
    if (!store) throw new Error('Store in not available');
    return store as RootStore;
}

const storeMiddleware = () =>
    (req: Request, res: Response, next: NextFunction) => {
        if (connection.db) {
            res.locals.store = rootStore(connection.db);
        }
        next();
    };

export default storeMiddleware;

















/*export async function addCollection(nameOfCollection: string) {
    await connection.addCollection(nameOfCollection)
    .then(data=>
        console.log(data)
    )
    .catch((err)=>{
        console.log("error");
    })
}*/

