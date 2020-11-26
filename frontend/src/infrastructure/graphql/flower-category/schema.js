import gql from 'graphql-tag';

export const GET_FLOWER_CATEGORY_LIST = gql`
  {
    flowerCategoryList{
        _id
        name
      }
  }
`;