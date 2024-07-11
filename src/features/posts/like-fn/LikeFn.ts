import { getDatabase, ref, set } from "firebase/database";
import TypePost from "../../../types/entities/posts/TypePost";
import { UserState } from "../../../types/slice";
import TypeNews from "../../../types/news/NewsType";

type TypeSetLikeLoader = (state: boolean) => void;

const likeFn = async (
    e: any, 
    currentItem: TypePost | TypeNews, 
    author: UserState | undefined, 
    setLikeLoader: TypeSetLikeLoader, 
    setItems: any, 
    storageValue: any,
    link: string,
) => {
    const db = getDatabase();

    if (e.target.dataset.name === 'post-like-loader') return false;

    setLikeLoader(true);

    let authoId = author ? author.id : '';
    let postId = currentItem.id;
    let linkForDb = authoId ? `${link}${postId}_${authoId}` : `${link}${postId}`
    let returnData: TypePost = currentItem;

    if (currentItem.liked.filter(item => item.id === storageValue.id).length) {
        returnData = {
            ...returnData,
            likes: returnData.likes -= 1,
            liked: [...returnData.liked.filter(item => item.id !== storageValue.id)],
        };
    } else {
        returnData = {
            ...returnData,
            likes: returnData.likes += 1,
            liked: [...returnData.liked, { id: storageValue.id }],
        };
    }
    await set(ref(db, linkForDb), returnData);
    setItems((prev: {post: TypePost, author: UserState}[]) =>
        prev.map(item => {
            if (item.post.id === postId) {
                return { post: returnData, author };
            }
            return item;
        })
    );
    setTimeout(() => setLikeLoader(false), 1000);
};

export default likeFn;