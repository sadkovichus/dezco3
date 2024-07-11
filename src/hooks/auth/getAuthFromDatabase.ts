import { get, getDatabase, ref, set } from "firebase/database";
import { UserState } from "../../types/slice"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

const useAuthFrom = async (user: UserState, path: string, dispatch: Dispatch, actionCreater: (payload: any) => UnknownAction) => {
    const db = getDatabase();

    await get(ref(db, path))
        .then(async data => {
            let resultData: UserState = user;
            if (!data.val()) {
                await set(ref(db, path), user);
                resultData = user
            } else {
                resultData = data.val();
            }
            dispatch(actionCreater(resultData));
        })
        .catch(err => err);
}

export default useAuthFrom;