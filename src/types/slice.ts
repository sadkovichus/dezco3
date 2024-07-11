export type UserState = {
    id: string;
    name: string;
    email: string;
    password: string;
    photoURL: string;
    friends: string;
    checkMark: boolean;
    balance?: number;
    level: number;
    role: 'admin' | 'user' | 'god';
}