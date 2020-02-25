import gql from 'graphql-tag';
export const CREATE_FLOWER = gql`
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

export const DELETE_FLOWER = gql`
    mutation DeleteFlower($id: ID!) {
        deleteFlower(idInput: {_id: $id})
    }
`;

export const GET_FLOWER_LIST = gql`
  {
    flowerList{
        _id
        name
        created
        lastWatering
      }
  }
`;