import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "../../../types/slice";

const initialState: UserState = {
    id: '',
    name: '',
    email: '',
    password: '',
    photoURL: '',
    friends: '[]',
    checkMark: false,
    level: 1,
    role: 'user',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }: { payload: UserState | any }) {
            const { id, name, email, level, password, friends, role, photoURL, checkMark } = payload;

            console.log(payload);

            state.id = id;
            state.name = name || email;
            state.email = email;
            state.password = password;
            state.photoURL = photoURL;
            state.friends = friends;
            state.checkMark = checkMark;
            state.level = level;
            state.role = role;
        },
        removeUser(state) {
            const keys = Object.keys(initialState);
            const value = Object.values(initialState);
            localStorage.removeItem('userData');
            for (let k = 0; k < Object.keys(initialState).length; k++) {
                state[keys[k]] = value[k];
            }
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;