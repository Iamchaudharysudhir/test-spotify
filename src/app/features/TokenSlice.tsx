import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const getToken=createAsyncThunk('token/getToken',async ()=>{
    return(
        axios("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + btoa("540a7b4d0e6a4c03ae820b16dc8d15d2:5737677a88794eedb5810a6346d20516"),
        },
        data: "grant_type=client_credentials",
    })
        .then((response) => {
            // console.log(response.data.access_token)
            return response.data.access_token;}
            )
        
    )
}
)

const initialState = {
    token: "",
    tokenLoading: false,
    tokenError: null,
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: {
        [getToken.pending.type]: (state) => {
            state.tokenLoading = true;
        },
        [getToken.fulfilled.type]: (state, action) => {
            state.token = action.payload;
            state.tokenLoading = false;
        },
        [getToken.rejected.type]: (state, action) => {
            state.tokenError = action.error;
            state.tokenLoading = false;
        }
    }
    
})



export default tokenSlice.reducer;