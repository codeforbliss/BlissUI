import axios from 'axios';


const baseurl = "/api/quotes/"

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

const getQuote = async () => {
    let response = await axios.get(baseurl + 'random');
    console.log(response)
    return response.data
}

export default {getQuote, setToken}