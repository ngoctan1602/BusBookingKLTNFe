
import * as BaseApi from '../api/BaseAPI'

export const getTopic = async () => {
    return await BaseApi.getItems("topic/getAll")
}
export const addTopic = async (topic) => {
    return (await BaseApi.postItem('topic/add', topic))
}
export const updateTopic = async (year) => {
    return (await BaseApi.putItem('topic/update', topic))
}