const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const flowerSchema = new Schema({
    name: String,
    created: String,
    lastWatering: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imageName: String,
})

export default mongoose.model('Flower', flowerSchema);