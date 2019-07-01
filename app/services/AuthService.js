/* eslint-disable no-return-await */
import { AsyncStorage } from 'react-native'
import axios from 'axios'
import config from '../config'

function authApiClient(token) {
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

async function setToken(token) {
    await AsyncStorage.setItem('@jwt', token)
}

async function removeToken() {
    await AsyncStorage.removeItem('@jwt')
}

async function login(username, password) {
    let token = await getToken()
    let result = {}

    await authApiClient(`Bearer ${token}`)
        .post('/auth/login', {
            username,
            password,
        })
        .then(async (response) => {
            if (response.status === 200) {
                await setToken(response.data.jwt)
                result.isLoggedIn = true
                result.message = response.data.id
            }
        })
        .catch((error) => {
            if (error.response.status === 401) {
                result.isLoggedIn = false
                result.message = error.response.data.message
            }
        })

    return result
}

async function logout() {
    await removeToken()
}

async function isLoggedIn() {
    let token = await getToken()

    if (token !== null) {
        return await authApiClient(`Bearer ${token}`)
            .get('/users/me')
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                } else {
                    return false
                }
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    }
}

const AuthService = {
    login,
    isLoggedIn,
    logout
}

export default AuthService
