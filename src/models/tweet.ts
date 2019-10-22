import { ObjectId } from "mongodb";

export interface ITweet {
    id: string;
    userName: string;
    userImage: string;
    date: Date;
    content: string;
    numberOfStars: number;
    starByMe:boolean;
    userListThatGaveStar: string[] | ObjectId[];
}

export class Tweet {
    constructor(public _id: ObjectId, public id: string, public userName: string, public userImage: string, public date: Date, public content: string, public numberOfStars: number,public starByMe:boolean, public userListThatGaveStar: string[] | ObjectId[]) { }
}