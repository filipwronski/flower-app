import Flower from '../flower/flower';
import User from '../user/user';
import fs from 'fs';

const flower = new Flower();
const user = new User();

export const resolvers = {
    Query: {
        flowerList: () => flower.list(),
        flower: (_, _id) => flower.get(_id),
        userList: () => user.list(),
        files: () => {
            // Return the record of files uploaded from your DB or API or filesystem.
        }
    },
    Mutation: {
        createFlower: (_, { flowerInput }) => flower.create(flowerInput),
        deleteFlower: (_, { idInput }) => flower.delete(idInput),
        updateFlower: (_, { idInput, flowerInput }) => flower.update(idInput, flowerInput),
        createUser: (_, userInput) => user.create(userInput),
        async singleUpload(parent, { file }) {
            const { stream, filename, mimetype, encoding } = await file;
            console.log(stream)
            const uploadDir = './uploads';
            const path = `${uploadDir}/${filename}`;
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
                    {filename, mimetype, encoding}
                ))
            );
          }
    },
};