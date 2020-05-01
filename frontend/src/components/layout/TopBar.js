import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    topBar: {
      marginBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function TopBar(props) {
    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.topBar}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}