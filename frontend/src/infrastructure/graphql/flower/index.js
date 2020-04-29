import { GET_FLOWER_LIST } from './schema'

export const createFlower = {
    update(cache, { data }) {
        console.log(cache.data.data, cache.data.data.GET_FLOWER_LIST)
        if(typeof cache !== 'undefined') {
            const cacheData = cache.readQuery({ query: GET_FLOWER_LIST });
            console.log(data.createFlower)
            cache.writeQuery({
                query: GET_FLOWER_LIST,
                data: {
                    flowerList: [data.createFlower, ...cacheData.flowerList]
                },
            });
        }
    }
}

export const updateFlower = {
    update(cache, { data }) {
        if(typeof cache !== 'undefined') {
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

export const deleteFlower = {
    update(cache, { data }) {
        const { flowerList } = cache.readQuery({ query: GET_FLOWER_LIST });
        cache.writeQuery({
            query: GET_FLOWER_LIST,
            data: {
                flowerList: flowerList.filter((flower) => {
                    return flower._id !== data.deleteFlower
                })
            },
        });
    }
}