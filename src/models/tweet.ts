import { ObjectID } from "bson";

export interface ITweet {
    id: string;
    userName: string;
    userImage: string;
    date: Date;
    content: string;
    numberOfStars: number;
    userListThatGaveStar: string[] | ObjectID[];
}

export class Tweet {
    constructor(public _id: ObjectID, public id: string, public userName: string, public userImage: string, public date: Date, public content: string, public numberOfStars: number, public userListThatGaveStar: string[] | ObjectID[]) { }
}
