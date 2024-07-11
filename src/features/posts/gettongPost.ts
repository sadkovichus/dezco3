import { child, get, getDatabase, ref } from "firebase/database";
import TypePost from "../../types/entities/posts/TypePost";
import { Dispatch, SetStateAction } from "react";

type setIsLoadingT = Dispatch<SetStateAction<boolean>>;
type setPostsT = any


const getPost = async (setIsLoading: setIsLoadingT, setPosts: setPostsT) => {
    const db = getDatabase();
    let returnedArr = [] as TypePost[];
    let postSnapshot = await get(child(ref(db), 'posts'));
    let userSnapshot = await get(child(ref(db), 'users'));
    if (!postSnapshot.val()) {
        setIsLoading(false);
        return false;
    }

    const allPosts = Object.values(postSnapshot.val());
    const allIds = Object.keys(postSnapshot.val());
    for (let j = 0; j < Object.keys(postSnapshot.val()).length; j++) {
        // let currentUser = userSnapshot.val()[[Object.keys(postSnapshot.val())[j]].toString()]; // user
        let currentUser = userSnapshot.val()[allIds[j].split('_')[1]]
        setPosts((prev: TypePost[]) =>
            [...prev, { post: allPosts[j], author: currentUser }]
        );
        // if (!allPosts[j]) return false;
        // let currentPosts = Object.values(allPosts[j] as DataSnapshot);
        // for (let i = 0; i < currentPosts.length; i++) {
        //     // await returnedArr.sort((a, b) => a.likes > b.likes ? 1 : -1);
        // }
    }
    console.log(returnedArr);
    setIsLoading(false);
}

export default getPost;




// for (let j = 0; j < Object.keys(postSnapshot.val()).length; j++) {
//     let currentUser = userSnapshot.val()[[Object.keys(postSnapshot.val())[j]].toString()]; // user
//     if (!allPosts[j]) return false;
//     let currentPosts = Object.values(allPosts[j] as DataSnapshot);
//     for (let i = 0; i < currentPosts.length; i++) {
//         // await returnedArr.sort((a, b) => a.likes > b.likes ? 1 : -1);
//         setPosts((prev: TypePost[]) =>
//             [...prev, { post: currentPosts[i], author: currentUser }]
//         );
//     }
// }