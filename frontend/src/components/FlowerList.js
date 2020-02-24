import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const EXCHANGE_RATES = gql`
  {
    flowerList{
        _id
        name
        created
        lastWatering
      }
  }
`;

export default function FlowerList() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.flowerList.map(({ _id, name, created, lastWatering }) => (
    <div key={_id}>
      <p>
        name: {name}<br/>
        created: {created}<br/>
        last watering: {lastWatering}
      </p>
    </div>
  ));
}