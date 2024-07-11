
export type DevOrLiked = {
    id: 'dev' | string;
}

type TypeNews = {
    id: string;
    title: string;
    text: string[];
    time: string;
    newsImg?: string;
    likes: number;
    liked: DevOrLiked[];
}

export default TypeNews;