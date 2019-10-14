import { ObjectId } from "mongodb";

export interface ICredential {
    id: string;
    email: string;
    password: string;
}

export class UserCredential {
    constructor(public _id: ObjectId, public id: string, public email: string, public password: string) { }
}