import React, { useState } from "react"
import { makeStyles } from '@material-ui/styles';
import ImageUploadButton from '../button/ImageUploadButton';
import ImageUploadPreview from '../image-upload-preview/ImageUploadPreview';

const useStyles = makeStyles({
  button: {
    marginBottom: 8
  }
})

export default function ImageForm(props) {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState(null)

  const onImageSelect = ({
    target: {
      validity,
      files: [image],
    },
    }) => {
    props.onImageSelect(image, validity)
    var reader = new FileReader();
    reader.onload = function(){
      setImageSrc(reader.result)
    };
    reader.readAsDataURL(image);
  }

  const removeImage = () => {
    console.log('test')
    setImageSrc(null)
  }

  return (
    <React.Fragment>
      {imageSrc!==null
        ? <ImageUploadPreview
          removeImage={removeImage}
          imageSrc={imageSrc}
        />
        : <ImageUploadButton
          className={classes.button}
          onImageSelect={onImageSelect}
        >
          Add Photo
        </ImageUploadButton>
    }
      
    </React.Fragment>
  )
}
