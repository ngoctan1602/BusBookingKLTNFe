import * as BaseApi from '../api/BaseAPI'

export const createNewTest = async (test) => {
    return await BaseApi.postItem("test/create", test)
}