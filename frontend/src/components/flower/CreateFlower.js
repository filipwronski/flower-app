import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER, GET_FLOWER_LIST } from '../../infrastructure/graphql/flower/schema'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'

export default function CreateFlower() {
  const [notification, setNotification] = useState('');
  const [name] = useState('')
  const [created] = useState('')
  const [lastWatering] = useState('')
  const [createFlower] = useMutation(CREATE_FLOWER, {
    update(cache, { data }) {
      if(cache.data.data.GET_FLOWER_LIST) {
        const cacheData = cache.readQuery({ query: GET_FLOWER_LIST });
        cache.writeQuery({
          query: GET_FLOWER_LIST,
          data: {
            flowerList: [data.createFlower, ...cacheData.flowerList]
          },
        });
      }
    }
  });

  const createFlowerAction = ({
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