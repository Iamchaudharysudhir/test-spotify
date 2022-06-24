import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {FeaturedPlaylistType} from '../../ReturnDataTypes/AllDataTypes';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export const FeaturedPlaylistCard = (props:FeaturedPlaylistType[]) => {


    const [expanded, setExpanded] = React.useState(false);
    const data=Object.entries(props);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const resultData=data.map((result, index)=>{
        return(
            <Card key={index}
            sx={{
                width: 280,
                margin: '1em',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                padding: '0.2em',
                backgroundColor: 'grey',
                '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
        <CardHeader title={result[1].name}/>
        <CardMedia
                    component="img"
                    height="auto"
                    image={result[1].images[0].url}
                    alt="props.album"
        />
        <CardActions disableSpacing>
            <Button 
                        variant="contained"
                        href={result[1].external_urls.spotify}
                        target="_blank"
            >View in Spotify</Button>
            <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Total Tracks: {result[1].tracks.total}</Typography>
                        <Typography paragraph>Owner: {result[1].owner.display_name}</Typography>
                        <Typography paragraph>Description: {result[1].description}</Typography>
                        
                    </CardContent>
                </Collapse>
        </Card>

        )
    })

    return (
        
            <Container sx={{
            padding: '0.5rem',
        }}>
            <h2>Featured Playlist</h2>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>{resultData.length>1&&resultData}</Grid>
        </Container>

    )
}


export default FeaturedPlaylistCard;