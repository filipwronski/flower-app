const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: String,
})

export default mongoose.model('RoomSchema', roomSchema);