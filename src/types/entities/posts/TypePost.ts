import { ReactNode } from "react";
import { UserState } from "../../slice";

export type DevOrLiked = {
    id: 'dev' | string;
}

export type TypeComment = {
    author: UserState;
    text: string;
    date: string;
}

type TypePost = {
    id: string;
    title: string;
    text: ReactNode[];
    time: string;
    liked: DevOrLiked[];
    postImg?: string[];
    comments?: string[];
    likes: number;
}

export default TypePost;

