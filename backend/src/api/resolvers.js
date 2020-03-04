import Flower from '../flower/flower';
import User from '../user/user';

const flower = new Flower();
const user = new User();

export const resolvers = {
    Query: {
        flowerList: () => flower.list(),
        flower: (_, _id) => flower.get(_id),
        userList: () => user.list(),
    },
    Mutation: {
        createFlower: (_, { flowerInput }) => flower.create(flowerInput),
        deleteFlower: (_, { idInput }) => flower.delete(idInput),
        updateFlower: (_, { idInput, flowerInput }) => flower.update(idInput, flowerInput),
        createUser: (_, userInput) => user.create(userInput),
    }
};