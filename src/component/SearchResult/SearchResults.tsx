import React from 'react';
import ArtistCard from '../Cards/ArtistCard';
import AlbumCard from '../Cards/AlbumCard';
import TrackCard from '../Cards/TrackCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useAppSelector } from '../../app/hooks';


export default function CardList(props:any) {

    const searchResults=useAppSelector(state=>state.search.searchResults);

    // if searchResults is empty, return empty div
    if (Object.keys(searchResults).length === 0) {
        return (<div></div>);
    }

    console.log(searchResults);

    const data = JSON.parse(JSON.stringify(searchResults));
    // console.log(data);

    // check if data has property 'artists'
    // if (data.hasOwnProperty('artists')) {

    // split searchType into an array of strings
    const cards = ['artist', 'album', 'track'].map(type => {
        if(type === 'artist' && data.hasOwnProperty('artists')) {
            return data.artists.items.map((artist: {
                name: string,
                id: string,
                images: [{
                    url: string,
                    width: number,
                    height: number
                }],
                genres: string[],
                followers: {
                    total: number
                },
                external_urls: {
                    spotify: string
                },
                popularity: number
            }, index: number) => {
                // if images is empty, set default image to no-image-available.png
                const image = (artist.images.length > 0)?
                                artist.images[0].url:
                                './no-image-available.png';
                return (
                    <ArtistCard 
                        artist={artist.name} 
                        key={artist.id} 
                        image={image}
                        genres={artist.genres}
                        followers={artist.followers.total}
                        spotifyLink={artist.external_urls.spotify}
                        popularity={artist.popularity}
                    />
                );
            });
        }
        if(type === 'album' && data.hasOwnProperty('albums')) {
            return data.albums.items.map((album: {
                name: string,
                id: string,
                images: [{
                    url: string
                }],
                artists: [{
                    external_urls: {
                        spotify: string
                    }
                    name: string
                }],
                release_date: string,
                external_urls: {
                    spotify: string
                },
                total_tracks: number,
            }, index: number) => {
                
                return (
                    <AlbumCard  
                    key={index}
                        {...album}
                    />
                );
            });
        }
        if(type === 'track' && data.hasOwnProperty('tracks')) {
            return data.tracks.items.map((track: {
                name: string,
                id: string,
                track_number: number,
                popularity: number,
                explicit: boolean,
                duration_ms: number,
                artists: [{
                    name: string,
                    external_urls: {
                        spotify: string
                    }
                }],
                album: {
                    name: string,
                    release_date: string,
                    images: [{
                        url: string
                    }],
                    external_urls: {
                        spotify: string
                    },
                    total_tracks: number,
                },
                external_urls: {
                    spotify: string
                }
            }, index: number) => {
                const image = (track.album.images.length > 0)?
                                track.album.images[0].url:
                                './no-image-available.png';
                return (
                    <TrackCard
                        track={track.name}
                        key={track.id}
                        image={image}
                        artists={track.artists}
                        album={track.album}
                        releaseDate={track.album.release_date}
                        spotifyLink={track.external_urls.spotify}
                        popularity={track.popularity}
                        explicit={track.explicit}
                        duration={track.duration_ms}
                    />
                );
            });
        }
    });
    return (
        <Container sx={{
            padding: '0.5rem',
        }}>
            <h1>Your Search Result</h1>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>{cards}</Grid>
        </Container>
    );
}