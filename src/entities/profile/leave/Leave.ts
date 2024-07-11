import { Dispatch } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";
import { NavigateFunction } from "react-router";
import useStorage from "../../../hooks/useStorage";
import { UserState } from "../../../types/slice";
import { removeUser } from "../../../store/slices/userSlices/userSlice";

const Leave = (dispatch: Dispatch, user:UserState, navigate: NavigateFunction) => {
    const { setValue } = useStorage('userData', user);
    const auth = getAuth();
    signOut(auth).then(() => {
        dispatch(removeUser());
        setValue({});
        navigate('/', { replace: true });
    }).catch((error) => {
        console.log(error);
    });
};

export default Leave;
