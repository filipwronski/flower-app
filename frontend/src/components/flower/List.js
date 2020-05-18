import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_FLOWER_LIST } from '../../infrastructure/graphql/flower/schema';
import ListItem from './ListItem';

export default function FlowerList() {
  const { loading, error, data } = useQuery(GET_FLOWER_LIST);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.flowerList.map(({ _id, name}) => (
        <ListItem
          name={name}
          id={_id}
          key={_id}
        />
      ))}
    </div>
  );
}