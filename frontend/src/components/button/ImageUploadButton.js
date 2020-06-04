import React from 'react';
import { makeStyles } from '@material-ui/core';
import { ThemeProvider, Button } from '@material-ui/core';
import { basicTheme } from '../../ui-theme';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const useStyles = makeStyles({
    input: {
      display: "none"
    },
    buttonText: {
        display: 'inline-block',
        position: 'relative',
        top: 2,
    }
});

export default function ImageUploadButton (props) {
    const classes = useStyles();
    return (
        <ThemeProvider theme={ basicTheme }>
            <input
                accept="image/*"
                className={classes.input}
                id="image-upload-button"
                required
                type="file"
                onChange={props.onImageSelect}
            />
            <label htmlFor="image-upload-button">
                <Button variant="contained" className={props.className} component="span" color="primary">
                    <AddPhotoAlternateIcon />
                    <span className={classes.buttonText}>
                        {props.children}
                    </span>
                </Button>
            </label>
        </ThemeProvider>
    ) 
}