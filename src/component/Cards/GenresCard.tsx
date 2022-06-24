import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export const GenresCard=(props:string[]) =>{

    const data=Object.entries(props).map((result, index)=>{
        return(
            <div className="card" key={index}>
                <div className="card-body" key={index}>
                    <p>|  {result[1]}  |</p>
                </div>
            </div>
        )
    })


    return(
        <div>
            <Container sx={{
            padding: '0.5rem',
        }}>
            <h2>Available Genres</h2>
            <Grid container  rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>{data}</Grid>
        </Container>
        </div>
    )
}

export default GenresCard;