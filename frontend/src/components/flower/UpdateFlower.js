import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { UPDATE_FLOWER, GET_FLOWER } from '../../infrastructure/graphql/flower/schema'
import { updateFlower } from '../../infrastructure/graphql/flower'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'

export default function UpdateFlower() {
    let { flowerId } = useParams();
    const [notification, setNotification] = useState('');
    const [name, setName] = useState('')
    const [created, setCreated] = useState('')
    const [lastWatering, setLastWatering] = useState('')
    const onFlowerDataChange = (data) => {
      setName(data.name)
      setCreated(data.created)
      setLastWatering(data.lastWatering)
    }
    const [editFlower] = useMutation(UPDATE_FLOWER, updateFlower);
    useQuery(GET_FLOWER,
      {
        variables: { id: flowerId },
        onCompleted: (data) => {
          onFlowerDataChange(data.flower)
        },
        onError: (error) => {
          throw error;
        },
      }
    );

    const updateFlowerAction = ({
        name,
        created,
        lastWatering
      }) => {
        editFlower({
          variables: {
            id: flowerId,
            name,
            created,
            lastWatering,
            user: "5e51b618442f985567d66845"
          }
        }).then(({ data }) => {
          onFlowerDataChange(data.updateFlower)
          setNotification(`Zaktualizowano pomyślnie kwiat o nazwie: ${data.updateFlower.name}`)
          
        }).catch(error => {
          throw error;
        })
      }

    return (
        <div>
          {flowerId}
          {notification &&
            <Notification
              content={notification}
            />
          }
          <FlowerForm
            formAction={updateFlowerAction}
            buttonLabel="Update Flower"
            defaultData={{name, created, lastWatering}}
          />
        </div>
      );    
}