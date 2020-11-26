import FlowerCategoryModel from '../models/flower-category';

export default class FlowerCategory {
    async create ({name}) {
        const flowerCategory = new FlowerCategoryModel({
            name
        });

        await flowerCategory.save();

        return flowerCategory;
    }

    async list() {
        try {
            return await FlowerCategoryModel.find();
        } catch (err) {
            throw err;
        }
    }
}
