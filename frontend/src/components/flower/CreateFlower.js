import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER } from '../../graphql/schema'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'

export default function CreateFlower() {
  const [notification, setNotification] = useState('');
  const [createFlower] = useMutation(CREATE_FLOWER);

  const showNotification = (message, timeout) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, timeout);
  }

  const addFlower = ({
    name,
    created,
    lastWatering
  }) => {
    createFlower({
      variables: {
        name,
        created,
        lastWatering,
        user: "5e51b618442f985567d66845"
      }
    }).then(({ data }) => {
      showNotification(`Dodano pomyślnie kwiat o nazwie: ${data.createFlower.name}`, 5000)
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
        formAction={addFlower}
        buttonLabel="Add Flower"
      />
    </div>
  );
}