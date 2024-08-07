import axios from "axios";

const baseUrl = 'api/posts';
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
}

axios.interceptors.request.use(
    (config) => {
    config.headers.authorization = token;
    return config;
    },
    (error) => {
    return Promise.reject(error);
    },
    );

const post = async (text, author) => {
    const postDate = new Date();
    const post = {
      author,
      text,
      postDate
    };

    try {
      axios.post(baseUrl + '/create', post);
    } catch (error) {
      console.error('Error posting rant:', error);
      throw error; // Rethrow error to handle it in the component
    }
}

const getAllPosts = async () => {
    try {
        return await axios.get(baseUrl + '/all', {headers: {Authorization: token}})
    } catch (error) {
        console.error("Error getting posts:", error);
    }
}

export default {post, getAllPosts, setToken}
