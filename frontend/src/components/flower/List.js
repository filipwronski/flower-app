import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_FLOWER_LIST } from '../../infrastructure/graphql/flower/schema';
import ListItem from './ListItem';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginBottom: 70,
  }
})

export default function FlowerList() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_FLOWER_LIST);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={classes.root}>
      {data.flowerList.map(({ _id, name, imageName}) => (
        <ListItem
          imageName={imageName}
          name={name}
          id={_id}
          key={_id}
        />
      ))}
    </div>
  );
}