
import * as BaseApi from '../api/BaseAPI'

export const getYear = async () => {
    return await BaseApi.getItems("year/getAll")
}
export const addYear = async (year) => {
    return (await BaseApi.postItem('year/add', year))
}
export const update = async (year) => {
    return (await BaseApi.putItem('year/update', year))
}

export const addImage = async (image) => {
    return (await BaseApi.createFormData('image/upload', image))
}