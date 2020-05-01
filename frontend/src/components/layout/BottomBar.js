import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import HomeIcon from '@material-ui/icons/Home';
import { BottomNavigation, BottomNavigationAction, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router'

const useStyles = makeStyles({
    root: {
        width: '100%',  
        position: 'fixed',
        bottom: 0,
        left: 0,
    },
});

export default function BottomBar() {
    const classes = useStyles();
    const [currentRoute, setCurrentRoute] = React.useState('/');
    let location = useLocation()

    useEffect(
      () => {
        setCurrentRoute(location.pathname)
      },
      [location]
    )

    return (
        <Paper
            elevation={3}
            className={classes.root}
        >
            <BottomNavigation
                value={currentRoute}
                showLabels
                >
                    <BottomNavigationAction
                        label="Home"
                        value="/"
                        icon={<HomeIcon />}
                        component={Link}
                        to="/"
                    />
                    <BottomNavigationAction
                        label="Flowers"
                        value="/flower-list"
                        icon={<LocalFloristIcon />}
                        component={Link}
                        to="/flower-list"
                    />
                    <BottomNavigationAction
                        label="Add Flower"
                        value="/add-flower"
                        icon={<AddCircleIcon />}
                        component={Link}
                        to="/add-flower"
                    />
            </BottomNavigation>
        </Paper>
    );
}