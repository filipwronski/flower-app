const { gql } = require('apollo-server-express');

export const typeDefs = gql`
  type Flower {
    _id: ID!
    name: String!
    created: String!
    lastWatering: String!
    user: User
  }
  input FlowerInput {
    name: String
    created: String
    lastWatering: String
    user: String
  }
  input IdInput {
    _id: ID
  }
  type User {
    _id: ID
    name: String
  }
  input UserInput {
    name: String!
  }
  type Query {
    flowerList: [Flower!]
    userList: [User!]
  }
  type Mutation {
    createFlower(flowerInput: FlowerInput): Flower
    deleteFlower(idInput: IdInput): String
    updateFlower(idInput: IdInput, flowerInput: FlowerInput): String
    createUser(userInput: UserInput): User
  }
`;