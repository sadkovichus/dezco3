import { Dispatch } from "@reduxjs/toolkit";
import { UserState } from "../../../types/slice";
import { getDatabase, ref, set } from "firebase/database";
import { setUser } from "../../../store/slices/userSlices/userSlice";

const createPhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    storageValue: any,
    setValue: (data: UserState) => void,
    dispatch: Dispatch
) => {
    const db = getDatabase();
    const file = e.target.files ? e.target.files[0] : '';
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = async function () {
            const updateData: UserState = {
                ...storageValue,
                photoURL: reader.result,
            };
            set(ref(db, `users/${storageValue.id}`), updateData);
            setValue(updateData);
            dispatch(setUser(updateData));
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
    }
};

export default createPhoto;
