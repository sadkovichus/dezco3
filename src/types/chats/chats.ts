import { UserState } from "../slice";

type LastMsg = {
    message: string;
    viewed: boolean;
    time: string;
}

type Message = {
    author: {
        id: string;
        name: string;
        photoURL: string;
    };
    message: string;
    viewed: boolean;
}

export type Chat = {
    id: string;
    name: string;
    isGroup: boolean;
    chatPhoto: string;
    lastMsg?: LastMsg;
    messages?: Message[] | [];
    users: UserState[];
}