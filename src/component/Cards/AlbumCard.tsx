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
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';
import {AlbumCardType} from '../../ReturnDataTypes/AllDataTypes';
import { useAppSelector } from '../../app/hooks';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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


export const AlbumCard = (props:AlbumCardType) => {

    const {search, searchType}=useAppSelector(state=>state.search)

    const [expanded, setExpanded] = React.useState(false);

    // const data = props.keys().map(key => {
    //     return props[key];
    // });

    // console.log(data)
    

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const image = (props.images.length > 0)?
                                props.images[0].url:
                                './no-image-available.png';




    return (
        <div>
            <h2>Your Search Results for '{search}'</h2>
            <Card 
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
    <CardHeader title={props.name}/>
    <CardMedia
                component="img"
                height="auto"
                image={image}
                alt="props.album"
    />
    <CardActions disableSpacing>
        <Button 
                    variant="contained"
                    href={props.external_urls.spotify}
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
                    <Typography paragraph>Total Tracks: {props.total_tracks}</Typography>
                    <Typography paragraph>Release Date: {props.release_date}</Typography>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                Artists:
                                {props.artists.map((artist, index) => {
                                    return (
                                    <ListItem key={index} disablePadding>
                                    <ListItemText key={index} primary={artist.name} />
                                    </ListItem>
    
                                         );
                                    })}
                            </List>
                        </nav>
                    </Box>
                </CardContent>
            </Collapse>
    </Card>
        
    </div>
    )
}

export default AlbumCard;