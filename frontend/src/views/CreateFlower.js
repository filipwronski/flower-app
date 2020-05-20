import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER, UPLOAD_FILE } from '../infrastructure/graphql/flower/schema'
import FlowerForm from '../components/flower/FlowerForm'
import Notification from '../components/layout/Notification'
import { createFlower } from '../infrastructure/graphql/flower'
import PrimaryButton from '../components/button/PrimaryButton'
import TopBar from '../components/layout/TopBar';
import ContentBox from '../components/layout/ContentBox';
import BottomBar from '../components/layout/BottomBar';
import WebcamCapture from '../components/layout/WebcamCapture';

export default function CreateFlower() {
  const [notification, setNotification] = useState('');
  const [name] = useState('')
  const [created] = useState('')
  const [lastWatering] = useState('')
  const [createFlowerMutation] = useMutation(CREATE_FLOWER, createFlower);
  const [mutate] = useMutation(UPLOAD_FILE);

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
        user: "5e51b618442f985567d66845"
      }
    }).then(({ data }) => {
      setNotification(`Dodano pomyślnie kwiat o nazwie: ${data.createFlower.name}`)
    }).catch(error => {
      throw error;
    })
  }

  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) mutate({ variables: { file } });
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
        <WebcamCapture onImageUpload={onChange} />
        <input type="file" required onChange={onChange} />
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