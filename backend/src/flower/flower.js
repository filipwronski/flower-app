import FlowerModel from '../models/flower'
export default class Flower {
    async list() {
        try {
            const flowerList = await FlowerModel
                .find()
                .populate('user');
            return flowerList;
        } catch (err) {
            throw err;
        }
    }

    async create ({ name, created, lastWatering, user }) {
        const flower = new FlowerModel({
            name,
            created,
            lastWatering,
            user,
        })
        await flower.save();

        return flower
    }

    async delete({_id}) {
        console.log(_id)
        try {    
            await FlowerModel.deleteOne({_id });
        } catch (error) {
            throw error;
        }
        return _id; 
    }

    async update({_id}, args) {
        try {    
            await FlowerModel.findOneAndUpdate({_id}, args);
        } catch (error) {
            throw error;
        }
        return `Flower with id: ${_id} updated.`; 
    }
}