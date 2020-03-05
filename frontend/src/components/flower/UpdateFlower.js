import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { UPDATE_FLOWER, GET_FLOWER, GET_FLOWER_LIST } from '../../graphql/schema'
import FlowerForm from './FlowerForm'
import Notification from '../Notification'

export default function UpdateFlower() {
    let { flowerId } = useParams();
    const [notification, setNotification] = useState('');
    const [name, setName] = useState('')
    const [created, setCreated] = useState('')
    const [lastWatering, setLastWatering] = useState('')
    const onFloweDataChange = (data) => {
      setName(data.name)
      setCreated(data.created)
      setLastWatering(data.lastWatering)
    }
    const [editFlower] = useMutation(UPDATE_FLOWER, {
      update(cache, { data }) {
        onFloweDataChange(data.updateFlower)
        if(cache.data.data.GET_FLOWER_LIST) {
          console.log(cache.readQuery({ query: GET_FLOWER_LIST }))
          const cacheData = cache.readQuery({ query: GET_FLOWER_LIST });
          cache.writeQuery({
            query: GET_FLOWER_LIST,
            data: {
              flowerList: cacheData.flowerList.map((flower) => {
                if(flower._id === data.updateFlower._id) {
                  return data.updateFlower
                }
                return flower
              })
            },
          });
        }
      }
    });
    useQuery(GET_FLOWER,
      {
        variables: { id: flowerId },
        onCompleted: (data) => {
          onFloweDataChange(data.flower)
        },
        onError: (error) => {
          throw error;
        },
      }
    );

    const updateFlower = ({
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
            formAction={updateFlower}
            buttonLabel="Update Flower"
            defaultData={{name, created, lastWatering}}
          />
        </div>
      );    
}