import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FLOWER } from '../graphql/schema'

export default function CreateFlower() {
  const [name, setName] = useState('');
  const [created, setCreated] = useState('');
  const [lastWatering, setLastWatering] = useState('');
  const [notification, setNotification] = useState('');
  const [createFlower] = useMutation(CREATE_FLOWER);

  const showNotification = (message, timeout) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, timeout);
  }

  return (
    <div>
      <span>{ notification }</span>
      <form
        onSubmit={event => {
          event.preventDefault();
          createFlower({
            variables: {
              name,
              created,
              lastWatering,
              user: "5e51b618442f985567d66845"
            }
          }).then(({data}) => {
            showNotification(`Dodano pomyślnie kwiat o nazwie: ${data.createFlower.name}`, 5000)
          }).catch(error => {
            throw error;
          })
        }}
      >
        <input
          value={name} onChange={event => setName(event.target.value)}
          placeholder="name"
        />
        <input
          value={created} onChange={event => setCreated(event.target.value)}
          placeholder="created"
        />
        <input
          value={lastWatering} onChange={event => setLastWatering(event.target.value)}
          placeholder="last watering"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}