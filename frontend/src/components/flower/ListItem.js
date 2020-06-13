import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_FLOWER } from '../../infrastructure/graphql/flower/schema';
import { Card, CardActionArea, CardMedia, Typography, CardActions, CardContent, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { deleteFlower } from '../../infrastructure/graphql/flower';

const useStyles = makeStyles({
    root: {
      maxWidth: '100%',
      margin: 10,
    },
    media: {
      height: 140,
    },
});

export default function ListItem(props) {
    const classes = useStyles();
    const [deleteFlowerMutation] = useMutation(DELETE_FLOWER, deleteFlower);
    const deleteFlowerAction = () => {
        deleteFlowerMutation({
          variables: {
            id: props.id
          }
        })
          .then(() => {
            console.log('deleted');
          })
          .catch((error) => {
            throw error;
          })
      }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={`https://192.168.0.73:4000/flower/images/${props.imageName}`}
                title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button variant="contained" color="primary" type="submit" href={`/update-flower/${props.id}`}>
                    Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={deleteFlowerAction}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}