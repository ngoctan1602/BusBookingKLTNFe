
import * as BaseApi from '../api/BaseAPI'
export const getParagraphWitPart = async (idPart) => {
    return await BaseApi.getItems("part/getParaByPartId", idPart)
}

export const getTypeParagraph = async () => {
    return await BaseApi.getItems("type-paragraph/getAll")
}

