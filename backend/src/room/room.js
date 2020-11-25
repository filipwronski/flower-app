import RoomModel from '../models/room';

export default class Room {
    async create ({name}) {
        const room = new RoomModel({
            name
        });

        await room.save();

        return room;
    }

    async list() {
        try {
            return await RoomModel.find();
        } catch (err) {
            throw err;
        }
    }
}
