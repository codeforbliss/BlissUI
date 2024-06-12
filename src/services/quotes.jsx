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


const quoteIdGenerator = () => {
    return Math.floor(Math.random() * (50) + 1);
}

const getQuote = async () => {
    let response = await axios.get(baseurl + quoteIdGenerator());
    return response.data
}

export default {getQuote, setToken}