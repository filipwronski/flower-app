import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER } from '../infrastructure/graphql/flower/schema'
import FlowerForm from '../components/flower/FlowerForm'
import Notification from '../components/layout/Notification'
import { createFlower } from '../infrastructure/graphql/flower'
import PrimaryButton from '../components/button/PrimaryButton'
import TopBar from '../components/layout/TopBar';
import ContentBox from '../components/layout/ContentBox';
import BottomBar from '../components/layout/BottomBar';
import ImageUploadButton from '../components/button/ImageUploadButton';
import { makeStyles } from '@material-ui/styles';
import ImageForm from '../components/layout/ImageForm';

const useStyles = makeStyles({
  button: {
    marginBottom: 8
  },
});

export default function CreateFlower() {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [name] = useState('')
  const [created] = useState('')
  const [lastWatering] = useState('')
  const [createFlowerMutation] = useMutation(CREATE_FLOWER, createFlower);
  // const [mutate] = useMutation(UPLOAD_FILE);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const createFlowerAction = ({
    name,
    created,
    lastWatering
  }) => {
    createFlowerMutation({
      variables: {
        name,
        created,
        lastWatering,
        user: "5e51b618442f985567d66845",
        image,
        imageName
      }
    }).then(({ data }) => {
      setNotification(`Dodano pomyślnie kwiat o nazwie: ${data.createFlower.name}`)
    }).catch(error => {
      throw error;
    })
  }

  const onImageSelect = (image, validity) => {
    console.log(validity.valid)
    if (validity.valid) {
      setImageName(`flower-${Date.now() + '-' + Math.round(Math.random() * 1E9)}.jpg`)
      setImage(image)
    }
  }

  return (
    <React.Fragment>
      <TopBar
        title="Add Flower"
      />
      {notification &&
        <Notification
          content={notification}
        />
      }
      <ContentBox>
        <ImageForm  onImageSelect={onImageSelect}/>
        {/* <ImageUploadButton
          className={classes.button}
          onImageSelect={onImageSelect}
        >
          Add Photo
        </ImageUploadButton> */}
        {/* <input type="file" required onChange={onChange} /> */}
        <FlowerForm
          formAction={createFlowerAction}
          submitButton={
            <PrimaryButton>
              Submit
            </PrimaryButton>
          }
          defaultData={{name, created, lastWatering}}
        />
      </ContentBox>
      <BottomBar/>
    </React.Fragment>
  );
}