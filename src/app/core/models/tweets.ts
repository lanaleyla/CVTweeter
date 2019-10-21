export interface ITweet {
    id: string;
    userName: string;
    userImage: string;
    date: Date;
    content: string;
    numberOfStars: number;
    starByMe:boolean;
    userListThatGaveStar: string[];
}


