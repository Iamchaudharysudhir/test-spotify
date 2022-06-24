import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import TracksData from '../../TracksData.json';
import {setSearch} from '../../app/features/SearchSlice';

import { RootState} from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSearch } from '../../app/features/SearchSlice';
 import { getToken } from '../../app/features/TokenSlice';
import { Link } from 'react-router-dom';

const passObj={
  searchText: "",
  searchFilter: "",
  token: "",
}

export const SearchBar = () => {

    const dispatch = useAppDispatch();

  const {searchType} = useAppSelector((state: RootState)  => state.search);

  const token=useAppSelector((state: RootState) => state.token.token);

  React.useEffect(() => {
    dispatch(getToken())
  },[dispatch])


  function handleChange(value: string) {
    dispatch(setSearch(value as string));
    passObj.searchText=value;
    passObj.searchFilter=searchType;
    passObj.token=token;
    
  
    dispatch(getSearch(passObj));
  }

    return (
      <Link to="/">
        <Stack spacing={2} sx={{ width: 300 }} >
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={TracksData.tracks.map((option) => option.album.name)}
            renderInput={(params) => <TextField {...params} label={`Search ` }/>}
            onChange={(event, value) => {
              if (value) {
                handleChange(value);
              }
            }
            }
            />
        </Stack>
        </Link>
      );
    }
    
    export default SearchBar;   