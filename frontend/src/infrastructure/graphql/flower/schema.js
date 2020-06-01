import gql from 'graphql-tag';
export const CREATE_FLOWER = gql`
  mutation CreateFlower($name: String!, $created: String!, $lastWatering: String!, $user: String!, $image: Upload!, $imageName: String) {
    createFlower(
      flowerInput: {
        name: $name,
        created: $created,
        lastWatering: $lastWatering,
        user: $user
        imageName: $imageName
      }
    ) {
      _id
      name
      created
      lastWatering
      user {
        name
      }
    }
    singleImageUpload(
      image: $image
      imageName: $imageName
    ) {
      filename
    }
  }
`;

export const UPDATE_FLOWER = gql`
  mutation UpdateFlower($id: ID!, $name: String!, $created: String!, $lastWatering: String!, $user: String!, $image: Upload!) {
    updateFlower(
      idInput: {
        _id: $id
      }, 
      flowerInput: {
        name: $name,
        created: $created,
        lastWatering: $lastWatering,
        user: $user
      }
    ) {
      _id
      name
      created
      lastWatering
      user {
        name
      }
    }
    singleImageUpload(
      image: $image
    ) {
      filename
      imageName
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
        imageName
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
        imageName
      }
  }
`;

  export const UPLOAD_FILE = gql`
  mutation($image: Upload!) {
    singleImageUpload(image: $image) {
      filename
    }
  }
  `;
  