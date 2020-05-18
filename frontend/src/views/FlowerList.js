import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_FLOWER_LIST, DELETE_FLOWER } from '../infrastructure/graphql/flower/schema';
import { deleteFlower } from '../infrastructure/graphql/flower';
import TopBar from '../components/layout/TopBar';
import FlowerCard from '../components/flower/FlowerCard'
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <TopBar
        title="Add Flower"
      />
      {data.flowerList.map((flower) => (
        <FlowerCard
          elevation={3}
          flower={flower}
          key={flower._id}
        />
      ))}
    </React.Fragment>
  );
}