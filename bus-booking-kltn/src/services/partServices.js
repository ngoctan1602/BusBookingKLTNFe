
import * as BaseApi from '../api/BaseAPI'
export const getPart = async () => {
    return await BaseApi.getItems("part/getAll")
}
