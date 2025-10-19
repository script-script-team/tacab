import { DEFAULT_ERROR_MESSAGE } from "@/pages/constant";
import type { ILoginBody, ILoginResponse } from "@/pages/types/login.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios"

const initialState = {
    loading: false,
    data: {} as ILoginResponse,
    error: ""
};

export const loginFn = createAsyncThunk("login", async(data: ILoginBody, {rejectWithValue}) => {
    try {

        const res = await axios.post("/login", data);

        return res.data
        
    } catch (error) {
        if(error instanceof AxiosError) {
            return rejectWithValue(error.response?.data.Message || DEFAULT_ERROR_MESSAGE);
        }

        return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
});

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(builder) {
            builder.loading = false;
            builder.data = {} as ILoginResponse;
            builder.error = "";

            localStorage.clear();
        }
    },
    extraReducers(builder) {
        builder.addCase(loginFn.pending, (state) => {
            state.loading = true;
            state.data = {} as ILoginResponse;
            state.error = "";
        });
        builder.addCase(loginFn.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = "";
        });
        builder.addCase(loginFn.rejected, (state, action) => {
            state.loading = false;
            state.data = {} as ILoginResponse;
            state.error = action.payload as string;
        });
    }
});

export const { logout } = loginSlice.actions;