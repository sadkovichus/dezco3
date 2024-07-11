import { getDatabase, ref, set } from "firebase/database";
import { NavigateFunction } from "react-router";
import TypePost from "../../../types/entities/posts/TypePost";

const createPostFn = async (e: any, storageValue: any, navigate: NavigateFunction, postImg?: string[]) => {
    e.preventDefault();

    const db = getDatabase();
    // const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
    let id = Date.now().toString();

    const now = new Date();
    const USDDate = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    const setData: TypePost = {
        id,
        title: e.target.title.value,
        text: e.target.text.value.split('\n').filter((item: string) => item !== ''),
        time: USDDate.format(now) + ` - ${now.getHours()}:${now.getMinutes()}`,
        postImg,
        comments: ['Kw0724gtbnM3JbQ7IkoagfgePP43', 'LzvPpY1tKlV06fGqlQzQ2SNXm9z2'],
        likes: 0,
        liked: [{ id: 'dev' }]
    };
    console.log(`${storageValue.id}<>${id}`)
    await set(ref(db, `posts/${id}_${storageValue.id}`), setData);
    navigate('/', { replace: false });
}

export default createPostFn;









// author: {
//     id: storageValue.id,
//     name: storageValue.name,
//     email: storageValue.email,
//     photoURL: storageValue.photoURL,
//     role: storageValue.role,
// },