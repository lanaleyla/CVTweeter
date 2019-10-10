import { ObjectId } from "mongodb";

export interface IUser {
    id: string;
    userName: string;
    email: string;
    password: string;
    image: string;
    lastLogin:Date;
}

export class User{
    constructor(public _id:ObjectId,public id: string,public  userName: string,public email:string,public password:string,public image:string,public lastLogin:Date){}
}
