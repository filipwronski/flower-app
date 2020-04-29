import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER } from '../../infrastructure/graphql/flower/schema'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'
import { createFlower } from '../../infrastructure/graphql/flower'

export default function CreateFlower() {
  const [notification, setNotification] = useState('');
  const [name] = useState('')
  const [created] = useState('')
  const [lastWatering] = useState('')
  const [createFlowerMutation] = useMutation(CREATE_FLOWER, createFlower);

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

  return (
    <div>
      {notification &&
        <Notification
          content={notification}
        />
      }
      <FlowerForm
        formAction={createFlowerAction}
        buttonLabel="Add Flower"
        defaultData={{name, created, lastWatering}}
      />
    </div>
  );
}