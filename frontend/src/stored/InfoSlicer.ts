import { createSlice } from "@reduxjs/toolkit";

const info = createSlice({
    name : "infoslice",
    initialState : {
        userId : ""
    },
    reducers : {
        setUserId: (state, action) => {
            state.userId = action.payload;
        }
    }
})
export const { setUserId } = info.actions;
export default info.reducer