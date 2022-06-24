import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/SearchSlice";
import tokenReducer from "./features/TokenSlice";
import featuredPlaylistsReducer from "./features/FeaturedPlaylistSlice";
import latestAlbumsReducer from "./features/LatestAlbumsSlice";
import availableGenresReducer from "./features/AvailableGenresSlice";


export const store=configureStore({
    reducer:{
        search: searchReducer,
        token: tokenReducer,
        featuredPlaylists: featuredPlaylistsReducer,
        latestAlbums: latestAlbumsReducer,
        availableGenres: availableGenresReducer,

    }
})

//export default RootState of the store
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;