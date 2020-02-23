import UserModel from '../models/user';

export default class User {
    async create ({name}) {
        const user = new UserModel({
            name
        });

        await user.save();

        return user;
    }

    async list() {
        try {
            return await UserModel.find();
        } catch (err) {
            throw err;
        }
    }
}
