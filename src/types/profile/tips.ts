export type Role = {
    user: 'user';
    admin: 'admin';
    god: 'god';
}

type Tips = Record<'user' | 'admin' | 'god', {
    title: string;
    text: string;
}>

export default Tips;