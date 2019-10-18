import { ObjectId } from "mongodb";

export interface ITweet {
    id: string;
    userName: string;
    userImage: string;
    //userId
    date: Date;
    content: string;
    numberOfStars: number;
    userListThatGaveStar: string[] | ObjectId[];
}

export interface ITweetResponseToClient {
    id: string; //tweet id
    userName: string;
    userImage: string;
    userId:string;
    date: Date;
    content: string;
    numberOfStars: number;
    starByMe:boolean;
}


export class Tweet {
    constructor(public _id: ObjectId, public id: string, public userName: string, public userImage: string, public date: Date, public content: string, public numberOfStars: number, public userListThatGaveStar: string[] | ObjectId[]) { }
}
