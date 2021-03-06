import Flower from '../flower/flower';
import User from '../user/user';
import FlowerCategory from '../flower-category/flower-category';
import Room from '../room/room';
import fs from 'fs';

const flower = new Flower();
const user = new User();
const flowerCategory = new FlowerCategory()
const room = new Room()


export const resolvers = {
    Query: {
        flowerList: () => flower.list(),
        flower: (_, _id) => flower.get(_id),
        userList: () => user.list(),
        flowerCategoryList: () => flowerCategory.list(),
        roomList: () => room.list(),
    },
    Mutation: {
        createFlower: (_, { flowerInput }) => flower.create(flowerInput),
        deleteFlower: (_, { idInput }) => flower.delete(idInput),
        updateFlower: (_, { idInput, flowerInput }) => flower.update(idInput, flowerInput),
        createUser: (_, userInput) => user.create(userInput),
        createFlowerCategory: (_, { flowerCategoryInput }) => flowerCategory.create(flowerCategoryInput),
        createRoom: (_, { roomInput }) => room.create(roomInput),
        async singleImageUpload(parent, { image, imageName }) {
            const { stream, mimetype, encoding } = await image;
            const uploadDir = './public/flower/images';
            const path = `${uploadDir}/${imageName}`;
            return new Promise((resolve, reject) =>
                stream
                .on('error', error => {
                    if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(path);
                    reject(error);
                })
                .pipe(fs.createWriteStream(path))
                .on('error', error => reject(error))
                .on('finish', () => resolve(
                    {
                        filename: imageName,
                        mimetype,
                        encoding
                    }
                ))
            );
          }
    },
};