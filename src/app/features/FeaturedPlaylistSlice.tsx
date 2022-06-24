import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getFeaturedPlaylist=createAsyncThunk('featuredPlaylist/getFeaturedPlaylist',async (token:string)=>{
    return(
        axios("https://api.spotify.com/v1/browse/featured-playlists", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    }).then(function (response) {
        // console.log(response);
        return response.data.playlists.items;
     }
    )


    )
}
)


const initialState = {
    featuredPlaylist: [{
        description: "",
    external_urls: {
        spotify: "",
    },
    id: "",
    images: [
        {
            height: 0,
            url: "",
            width: 0
        }
    ],
    name: "",
    owner: {
        display_name: "",
        external_urls: {
            spotify: ""
        },
        href: "",
        id: "",
        type: "",
    },
    tracks: {
        href: "",
        total: 0
    },
    type: "",
    }],
    featuredPlaylistLoading: false,
    featuredPlaylistError: null,
}

const featuredPlaylistSlice = createSlice({
    name: "featuredPlaylist",
    initialState,
    reducers: {
        setFeaturedPlaylist: (state, action) => {
            state.featuredPlaylist = action.payload;
        }
    },
    extraReducers: {
        [getFeaturedPlaylist.pending.type]: (state, action) => {
            state.featuredPlaylistLoading = true;
        },
        [getFeaturedPlaylist.fulfilled.type]: (state, action) => {
            console.log(action.payload);
            state.featuredPlaylist = action.payload;
            state.featuredPlaylistLoading = false;
            console.log(state.featuredPlaylist);
        },
        [getFeaturedPlaylist.rejected.type]: (state, action) => {
            state.featuredPlaylistError = action.error;
            state.featuredPlaylistLoading = false;
        }
    }
}
);

export default featuredPlaylistSlice.reducer;

export const { setFeaturedPlaylist } = featuredPlaylistSlice.actions;