import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_FLOWER = gql`
  mutation CreateFlower($name: String!, $created: String!, $lastWatering: String!, $user: String!) {
    createFlower(flowerInput: {name: $name, created: $created, lastWatering: $lastWatering, user: $user}) {
      _id
      name
      created
      lastWatering
      user {
        name
      }
    }
  }
`;
export default function CreateFlower() {
  let nameInput, createdInput, lastWateringInput;
  const [createFlower, { data }] = useMutation(CREATE_FLOWER);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log(nameInput.value)
          createFlower({
            variables: {
              name: nameInput.value,
              created: createdInput.value,
              lastWatering: lastWateringInput.value,
              user: "5e51b618442f985567d66845"
            }
          });
        }}
      >
        <input
          ref={node => {
            nameInput = node;
          }}
          placeholder="name"
        />
        <input
          ref={node => {
            createdInput = node;
          }}
          placeholder="created"
        />
        <input
          ref={node => {
            lastWateringInput = node;
          }}
          placeholder="last watering"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}