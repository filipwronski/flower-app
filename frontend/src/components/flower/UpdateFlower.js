import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { UPDATE_FLOWER, GET_FLOWER } from '../../graphql/schema'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'

export default function UpdateFlower() {
    let { flowerId } = useParams();
    const [notification, setNotification] = useState('');
    const [editFlower] = useMutation(UPDATE_FLOWER);
    const [name, setName] = useState('')
    const [created, setCreated] = useState('')
    const [lastWatering, setLastWatering] = useState('')
    useQuery(GET_FLOWER,
      {
        variables: { id: flowerId },
        onCompleted: (data) => {
          setName(data.flower.name)
          setCreated(data.flower.created)
          setLastWatering(data.flower.lastWatering)
        }
      }
    );

    const showNotification = (message, timeout) => {
        setNotification(message)
        setTimeout(() => {
          setNotification('')
        }, timeout);
    }

    const updateFlower = ({
        name,
        created,
        lastWatering
      }) => {
        editFlower({
          variables: {
            id: flowerId,
            name: name,
            created: created,
            lastWatering: lastWatering,
            user: "5e51b618442f985567d66845"
          }
        }).then(({ data }) => {
          showNotification(`Zaktualizowano pomyślnie kwiat o nazwie: ${data.updateFlower.name}`, 5000)
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
            formAction={updateFlower}
            buttonLabel="Update Flower"
            defaultData={{name, created, lastWatering}}
          />
        </div>
      );    
}