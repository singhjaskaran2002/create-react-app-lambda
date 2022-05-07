import { configureStore } from "@reduxjs/toolkit";
import { slotReducer } from "./reducers/slotSlice";

const store = configureStore({
    reducer: {
        slots: slotReducer
    }
})

export default store;