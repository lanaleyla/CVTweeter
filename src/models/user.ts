import { ObjectId } from "mongodb";

export interface IUser {
    id: string;
    userName: string;
    email: string;
    image: string;
    registrationDate: Date;
    lastLogin: Date;
}

export class User {
    constructor(public _id: ObjectId, public id: string, public userName: string, public email: string, public image: string, public registrationDate: Date, public lastLogin: Date) { }
}
