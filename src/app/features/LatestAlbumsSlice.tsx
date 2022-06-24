import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getLatestAlbumbs=createAsyncThunk("latestAlbumbs/getLatestAlbumbs", async (token:string)=>{
    return(
        axios("https://api.spotify.com/v1/browse/new-releases", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    }).then(function (response) {
        // console.log(response);
        return response.data.albums.items;
     }
    )

    )
});

const initialState = {
    latestAlbumbs: [{
        id: "",
        name: "",
        artists: [{
            id: "",
            name: "",
        }],
        popularity: 0,
        external_urls: {
            spotify: "",
        },
        images: [{
            url: "",
            width: 0,
            height: 0,
        }],
        release_date: "",
        total_tracks:0,
    }],
    latestAlbumbsLoading: false,
    latestAlbumbsError: null,
}

export const latestAlbumSlice=createSlice({
    name:"latestAlbumbs",
    initialState,
    reducers:{
        setLatestAlbumbs: (state, action) => {
            state.latestAlbumbs = action.payload;
        }
    },
    extraReducers:{
        [getLatestAlbumbs.pending.type]: (state, action) => {
            state.latestAlbumbsLoading = true;
            state.latestAlbumbsError = null;
        },
        [getLatestAlbumbs.fulfilled.type]: (state, action) => {
            state.latestAlbumbs = action.payload;
            state.latestAlbumbsLoading = false;
        },
        [getLatestAlbumbs.rejected.type]: (state, action) => {
            state.latestAlbumbsError = action.error;
            state.latestAlbumbsLoading = false;
        }
    }
})



export const {setLatestAlbumbs}=latestAlbumSlice.actions;

    export default latestAlbumSlice.reducer;