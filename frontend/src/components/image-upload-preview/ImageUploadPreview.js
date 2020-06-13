import React from 'react'
import { makeStyles, Button } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        border: '1px solid gray',
        borderRadius: 4,
        marginBottom: 10,
        borderColor: '#c4c4c4',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    image: {
        maxWidth: '100%',
        maxHeight: 150,
        padding: 10,
    }
})
export default function ImageUploadPreview(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button
                onClick={props.removeImage}
                className={classes.removeIcon}
                variant="contained"
                color="secondary"
            >
                <HighlightOffIcon/>
            </Button>
            <img alt="Upload preview" className={classes.image} src={props.imageSrc} />
        </div>
    )
}