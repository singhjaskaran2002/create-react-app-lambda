import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    slots: []
}

const slotSlice = createSlice({
    initialState,
    name: 'slots',
    reducers: {
        addSlots: (state, { payload }) => {
            state.slots = [...state.slots, ...payload.slots];
        }
    }
})

export const slotReducer = slotSlice.reducer;
export const { addSlots } = slotSlice.actions;