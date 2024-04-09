import * as BaseApi from '../api/BaseAPI'

export const addQuestion = async (question) => {
    return (await BaseApi.postItem('question/add', question))
}

export const addQuestionWithParagraph = async (paragraph) => {
    return (await BaseApi.postItem('question/add/paragraph', paragraph))
}

export const getQuestionByPartId = async (idPart) => {
    return (await BaseApi.getItems(`question/${idPart}`))
}


export const getParagraphByPartAndType = async (params) => {
    return await BaseApi.getItems("question/getByPartAndType", params)
}
