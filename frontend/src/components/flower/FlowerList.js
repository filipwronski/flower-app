import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_FLOWER_LIST, DELETE_FLOWER } from '../../infrastructure/graphql/flower/schema';
import { deleteFlower } from '../../infrastructure/graphql/flower';
import { Link } from "react-router-dom";

export default function FlowerList() {
  const { loading, error, data } = useQuery(GET_FLOWER_LIST);
  const [deleteFlowerMutation] = useMutation(DELETE_FLOWER, deleteFlower);

  const deleteFlowerAction = (id) => {
    deleteFlowerMutation({
      variables: {
        id
      }
    })
      .then(() => {
        console.log('deleted');
      })
      .catch((error) => {
        throw error;
      })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.flowerList.map(({ _id, name, created, lastWatering }) => (
        <li key={_id}>
          <p>
            name: {name}<br />
            created: {created}<br />
            last watering: {lastWatering}
          </p>
          <button onClick={event => deleteFlowerAction(_id)}>delete</button>
          <Link to={`/update-flower/${_id}`}>edit</Link>
        </li>
      ))}
    </ul>
  );
}