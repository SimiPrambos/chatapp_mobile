/* eslint-disable no-return-await */
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import config from '../config'

function chatApiClient(token) {
    return axios.create({
        baseURL: `${config.API_URL}`,
        headers: {
            authorization: token,
        },
        timeout: 3000,
    })
}

async function getToken() {
    let token = await AsyncStorage.getItem('@jwt')
    return token
}

async function sendMessage(text) {
    let token = await getToken()
    let result = {}

    await chatApiClient(`Bearer ${token}`)
        .post('/chats', {
            text,
        })
        .then(async (response) => {
            if (response.status === 200) {
                result.created = true
                result.message = response.data
            }
        })
        .catch((error) => {
            result.created = false
            result.message = error.response.data.message
        })

    return result
}

async function deleteMessage(id) {
    let token = await getToken()
    return await chatApiClient(`Bearer ${token}`)
        .delete(`/chats/${id}`)
        .then(async (response) => {
            if (response.status === 204) {
                return true
            } else {
                return false
            }
        }).catch(() => {
            return false
        })
}

async function fetchChats() {
    let savedToken = await getToken()
    if (savedToken !== null) {
        return await chatApiClient(`Bearer ${savedToken}`)
            .get('/chats')
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    return []
                }
            })
            .catch((error) => {
                console.log(error)
                return []
            })
    }
}

const ChatService = {
    fetchChats,
    sendMessage,
    deleteMessage
}

export default ChatService
