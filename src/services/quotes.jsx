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
    axios.post("/api/posts/create", {
      rant : "random",
      author : "random"
    })
    console.log(response)
    return response.data
}

const postRant = async (rant, author) => {
  const post = {
    author,
    rant
  };
  const headers = { Authorization : token };

  try {
    axios.post('/api/posts/create', post, { headers });
  } catch (error) {
    console.error('Error posting rant:', error);
    throw error; // Rethrow error to handle it in the component
  }

}

export default {getQuote, setToken, postRant}