import axios from 'axios'

const baseUrl = "api/v1/auth/"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async (credential) => {
    const response = await axios.post(baseUrl + "authenticate", credential)
    return response.data
}

export default {login, setToken}