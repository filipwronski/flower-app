import mongoose from 'mongoose';

export const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://mongodb:27017/flower-app', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (error) {
        console.log(error)
    }
}