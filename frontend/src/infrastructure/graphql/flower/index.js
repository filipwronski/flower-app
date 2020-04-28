import { GET_FLOWER_LIST } from './schema'

export const updateFlower = {
    update(cache, { data }) {
        if(cache.data.data.GET_FLOWER_LIST) {
        const cacheData = cache.readQuery({ query: GET_FLOWER_LIST });
        cache.writeQuery({
            query: GET_FLOWER_LIST,
            data: {
            flowerList: cacheData.flowerList.map((flower) => {
                if(flower._id === data.updateFlower._id) {
                return data.updateFlower
                }
                return flower
            })
            },
        });
        }
    }
}