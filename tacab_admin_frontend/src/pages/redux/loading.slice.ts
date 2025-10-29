import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    loading: false,
}

export const whoImLoading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading(state, acion) {
            state.loading = acion.payload;
        }
    }
});

export const {setLoading} = whoImLoading.actions;