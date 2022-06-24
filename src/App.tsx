import React from 'react';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { AlbumCard } from './component/Cards/AlbumCard';
import {  useAppSelector } from './app/hooks';
import FeaturedPlaylistCard from './component/Cards/FeaturedPlaylistCard';
import { LatestAlbumCard } from './component/Cards/LatestAlbumCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenresCard from './component/Cards/GenresCard';
import CardList from './component/SearchResult/SearchResults';




function App() {


  const search = useAppSelector((state) => state.search.searchResults);

  const featuredPlaylist=useAppSelector(state=>state.featuredPlaylists.featuredPlaylist);

  const latestAlbums=useAppSelector(state=>state.latestAlbums.latestAlbumbs);

  const genres=useAppSelector(state=>state.availableGenres.genres);

  


  return (
    <Router>
    <div className="App">
      <header className='app-header'>
      <Navbar/>
      </header>
      <Box sx={{ flexGrow: 1 }}>
      <Grid direction ="row" container spacing={20}>
        <Grid item xs={20}>
        

            <Routes>
            <Route path="/" element={<CardList {...search}/>}/>
            
          
            <Route path="/featured-playlists" element={<FeaturedPlaylistCard {...featuredPlaylist}/>}/>
           
            <Route path="/latest-albums" element={<LatestAlbumCard {...latestAlbums}/>}/>
         
            <Route path="/genres" element={<GenresCard {...genres}/>} />
          
            </Routes>
        </Grid>
      </Grid>
    </Box>
      <footer className='footer'>
      <Footer/>
      </footer>
    </div>
    </Router>
  );
}

export default App;
