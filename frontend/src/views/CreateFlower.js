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
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  button: {
    width: '100%'
  }
})

export default function CreateFlower() {
  const classes = useStyles();
  const [notification, setNotification] = useState('');
  const [name] = useState('')
  const [created] = useState('')
  const [lastWatering] = useState('')
  const [createFlowerMutation] = useMutation(CREATE_FLOWER, createFlower);

  const createFlowerAction = ({
    name,
    created,
    lastWatering,
    image,
    imageName
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
        <FlowerForm
          formAction={createFlowerAction}
          submitButton={
            <PrimaryButton className={classes.button}>
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