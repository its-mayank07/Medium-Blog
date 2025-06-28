import { configureStore } from "@reduxjs/toolkit";
import InfoReducer from "./InfoSlicer"

const store = configureStore({
    reducer : {
        infoslice : InfoReducer
    }
})

export default store;