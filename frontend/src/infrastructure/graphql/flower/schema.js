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

export const UPDATE_FLOWER = gql`
  mutation UpdateFlower($id: ID!, $name: String!, $created: String!, $lastWatering: String!, $user: String!) {
    updateFlower(
      idInput: {_id: $id}, 
      flowerInput: {name: $name, created: $created, lastWatering: $lastWatering, user: $user}
      ) {
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

export const GET_FLOWER = gql`
  query Flower($id: ID!) {
    flower(_id: $id){
        _id
        name
        created
        lastWatering
      }
  }
`;

  export const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
  `;
  