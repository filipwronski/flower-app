import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_FLOWER_LIST, DELETE_FLOWER } from '../../infrastructure/graphql/flower/schema';
import { Link } from "react-router-dom";

export default function FlowerList() {
  const { loading, error, data } = useQuery(GET_FLOWER_LIST);
  const [deleteFlowerAction] = useMutation(DELETE_FLOWER,
    {
      update(cache, { data }) {
        const { flowerList } = cache.readQuery({ query: GET_FLOWER_LIST });
        cache.writeQuery({
          query: GET_FLOWER_LIST,
          data: {
            flowerList: flowerList.filter((flower) => {
              return flower._id !== data.deleteFlower
            })
          },
        });
      }
    });

  const deleteFlower = (id) => {
    deleteFlowerAction({
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
          <button onClick={event => deleteFlower(_id)}>delete</button>
          <Link to={`/update-flower/${_id}`}>edit</Link>
        </li>
      ))}
    </ul>
  );
}