const { gql } = require('apollo-server-express');

export const typeDefs = gql`
  type Flower {
    _id: ID!
    name: String!
    created: String!
    lastWatering: String!
    user: User
    imageName: String
  }
  type FlowerCategory {
    _id: ID!
    name: String
  }
  type Room {
    _id: ID!
    name: String!
  }
  input FlowerInput {
    name: String
    created: String
    lastWatering: String
    user: String
    imageName: String
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
  input FlowerCategoryInput {
    name: String!
  }
  input RoomInput {
    name: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    flowerList: [Flower!]
    flower(_id: ID): Flower!
    userList: [User!]
    files: [File]
    flowerCategoryList: [Flower]
    roomList: [Flower]
  }
  type Mutation {
    createFlower(flowerInput: FlowerInput): Flower
    deleteFlower(idInput: IdInput): String
    updateFlower(idInput: IdInput, flowerInput: FlowerInput): Flower
    createUser(userInput: UserInput): User
    singleImageUpload(image: Upload!, imageName: String): File!
    createFlowerCategory(flowerCategoryInput: FlowerCategoryInput): FlowerCategory
    createRoom(roomInput: RoomInput!): Room
  }
`;