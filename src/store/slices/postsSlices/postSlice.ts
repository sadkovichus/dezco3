import { createSlice } from "@reduxjs/toolkit";
import Post from "../../../types/entities/posts/TypePost";

const initialState: Post[] = []

const postsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setPosts(state, { payload }: { payload: Post }) {
            const { id, text, title, author, time } = payload;

            state.push({
                id,
                title,
                text,
                time,
                author
            })
        }
    }
})

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;


// {
//     id: '',
//         title: '',
//             text: '',
//                 time: '',
//                     author: {
//         id: '',
//             name: '',
//                 email: '',
//                     photoURL: '',
//                         role: 'user',
//     }
// }