import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getGenres=createAsyncThunk("genres/getGenres", async (token:string)=>{
    return(
        axios("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token,
        },
    }).then(function (response) {
        console.log(response.data.genres);
        return response.data.genres;
    }
    )
    )
})


const initialState = {
    genres: [""],
    genresLoading: false,
    genresError: null,
}

export const AvailableGenresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload;
        }
    },
    extraReducers: {
        [getGenres.pending.type]: (state, action) => {
            state.genresLoading = true;
            state.genresError = null;
        },
        [getGenres.fulfilled.type]: (state, action) => {
            state.genres = action.payload;
            state.genresLoading = false;
        },
        [getGenres.rejected.type]: (state, action) => {
            state.genresError = action.error;
            state.genresLoading = false;
        }
    }
})

export default AvailableGenresSlice.reducer;

export const {setGenres} =AvailableGenresSlice.actions;