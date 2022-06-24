import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSearch=createAsyncThunk('search/getSearch',async (item:{
    searchText: string,
    searchFilter: string,
    token: string,
                })=>{
    return(
        axios("https://api.spotify.com/v1/search", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + item.token,
            "Content-Type": "application/json",
        },
        params: {
            q: item.searchText,
            type:item.searchFilter,
        }

}).then(function (response) {
    console.log(response.data);
    return response.data;
 })
    )
}
)




const initialState = {
    search: "",
    searchType: "track",
    searchResults: [],

    searchLoading: false,
    searchError: null,
};


const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setSearchLoading: (state, action) => {
            state.searchLoading = action.payload;
        },
        setSearchError: (state, action) => {
            state.searchError = action.payload;
        }
    },
    extraReducers: {
        [getSearch.pending.type]: (state, action) => {
            state.searchLoading = true;
        },
        [getSearch.fulfilled.type]: (state, action) => {
            state.searchLoading = false;
            state.searchResults = action.payload;
        },
        [getSearch.rejected.type]: (state, action) => {
            state.searchLoading = false;
            state.searchError = action.error;
        },
    },
});

export const { setSearch, setSearchType, setSearchResults, setSearchLoading, setSearchError } = searchSlice.actions;

export default searchSlice.reducer;