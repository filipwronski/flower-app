const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const flowerCategorySchema = new Schema({
    name: String,
})

export default mongoose.model('FlowerCategory', flowerCategorySchema);