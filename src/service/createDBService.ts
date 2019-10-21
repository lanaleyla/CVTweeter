import mongodb from 'mongodb';

//DATA BASE CREATION//
export async function buildDB(db: mongodb.Db | undefined) {

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
    }
}

export async function addCollections(db: mongodb.Db, collectionsName: string) {
    if (db) {
        await db.createCollection(collectionsName)
            .then(data => console.log("collection created:" + data))
            .catch((err) => console.log("error in creating collection" + err));
    }
}

