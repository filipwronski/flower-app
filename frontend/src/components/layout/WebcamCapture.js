import React from 'react'
import Webcam from "react-webcam";
import { Button, makeStyles } from '@material-ui/core';

const videoConstraints = {
    width: 720,
    height: 1360,
    facingMode: "environment"
 };

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '4px',
        display: 'block',
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
}));
  
export default function WebcamCapture ({onImageUpload}) {
    const classes = useStyles();
    const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onImageUpload(imageSrc)
      },
      [webcamRef, onImageUpload]
    );
  
    return (
      <>
        <Webcam
          audio={false}
          height={200}
          className={classes.root}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={'100%'}
          videoConstraints={videoConstraints}
        />
        <Button className={classes.button} variant="contained" color="primary" onClick={capture}>Capture photo</Button>
      </>
    );
  };