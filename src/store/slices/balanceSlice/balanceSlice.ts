import { createSlice } from "@reduxjs/toolkit";

const initialState = {value: 0};

const BalanceSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        incBalance(state, { payload }: { payload: number }) {
            state.value+=payload;
        }
    }
})

export const { incBalance } = BalanceSlice.actions;
export default BalanceSlice.reducer;
