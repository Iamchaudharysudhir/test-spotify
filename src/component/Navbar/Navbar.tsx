import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';


import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import Checkbox from '@mui/material/Checkbox';

import SearchBar from './SearchBar';
import {setSearchType} from '../../app/features/SearchSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getToken } from '../../app/features/TokenSlice';
import { getFeaturedPlaylist } from '../../app/features/FeaturedPlaylistSlice';
import { getLatestAlbumbs } from '../../app/features/LatestAlbumsSlice';
import { getGenres } from '../../app/features/AvailableGenresSlice';
import { Link } from 'react-router-dom';




export const Navbar = () => {

    const [open, setOpen] = React.useState(false);

    const dispatch = useAppDispatch();

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    useEffect(() => {
      dispatch(getToken())
    }, [dispatch]);

    const token=useAppSelector(state=>state.token.token);

    const searchType=useAppSelector(state=>state.search.searchType);


    


    const handlePlaylist = (event: Event | React.SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
        dispatch(getFeaturedPlaylist(token));
        setOpen(false);
      };

      const handleAlbum = (event: Event | React.SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
        dispatch(getLatestAlbumbs(token));
        setOpen(false);
      };

      const handleGenres= (event: Event | React.SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
        dispatch(getGenres(token));
        setOpen(false);
      };

      const handleClose= (event: Event | React.SyntheticEvent) => {
        if (
          anchorRef.current &&
          anchorRef.current.contains(event.target as HTMLElement)
        ) {
          return;
        }
        setOpen(false);
      };


      function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }

      function handleSearchType(type: string){

        
        if(searchType==='')
        {
          dispatch(setSearchType(type));
        }
        //convert searchtype to array
        let searchTypeArray=searchType.split(",");

        if(searchTypeArray.includes(type)){
          const index=searchTypeArray.indexOf(type);
          searchTypeArray.splice(index,1);
        }
        else{
          searchTypeArray.push(type);
        }

        //convert array to string
        let searchTypeString=searchTypeArray.join(',');
        console.log(searchTypeString);

        dispatch(setSearchType(searchTypeString))
      }


    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };


    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
            className='menu-button'
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              
              ref={anchorRef}
              aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
              <MenuIcon />
            </IconButton>
          <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                  className='menu-list'
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <Link to="/featured-playlists">
                    <MenuItem onClick={handlePlaylist} >Featured Playlist</MenuItem>
                    </Link>
                    <Link to="/latest-albums">
                    <MenuItem onClick={handleAlbum}>Latest Albumbs</MenuItem>
                    </Link>
                    <Link to="/genres">
                    <MenuItem onClick={handleGenres}>Available Genres</MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Spotify-Search
            </Typography>
            <div>
               <Checkbox className='nav-checkboxes' id='Track' color="default" 
              onClick={()=>handleSearchType("track")}
              defaultChecked={true}
              />
               <label htmlFor='Track'>Track</label>
               <Checkbox className='nav-checkboxes' id='Artist' color="default" 
              onClick={()=>handleSearchType("artist")}
              />
               <label htmlFor='Artist'>Artist</label>
               <Checkbox className='nav-checkboxes' id='Album' color="default" 
              onClick={()=>handleSearchType("album")}
              />
               <label htmlFor='Album'>Album</label>
           </div>
            <SearchBar />
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default Navbar;