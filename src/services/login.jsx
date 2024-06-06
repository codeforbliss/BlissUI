import axios from 'axios'

const baseUrl = "api/v1/auth/"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// Axios request interceptor to add token to all requests
axios.interceptors.request.use(config => {
  config.headers.authorization = token
  return config
}, error => {
  return Promise.reject(error)
})

const login = async (credential) => {
    const response = await axios.post(baseUrl + "authenticate", credential)
    return response.data
}

export default {login, setToken}