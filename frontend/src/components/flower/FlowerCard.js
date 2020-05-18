import React from 'react'
import { CardHeader, IconButton, Card, CardMedia, CardContent, Typography, Paper } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

export default function FlowerCard(props) {
    const classes = useStyles();
    return (
        <Paper
            elevation={1}
            className={classes.root}
        >
            <Card>
                <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <CreateIcon />
                    </IconButton>
                }
                title={props.flower.name}
                subheader="September 14, 2016"
                />
                {/* <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
                /> */}
                <CardContent>
                {/* <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography> */}
                </CardContent>
            </Card>
        </Paper>
    )
}