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

const post = async (text, author, emotion) => {
    const postDate = new Date();
    const post = {
      author,
      text,
      postDate,
      emotion
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
        return await axios.get(baseUrl + '/all');
    } catch (error) {
        console.error("Error getting posts:", error);
    }
}

const addCommentToPost = async (id, comment) => {
    try {
        axios.post(baseUrl + '/comment/' + id, comment);
    } catch (error) {
        console.log(error);
    }
}

export default {post, getAllPosts, addCommentToPost, setToken}
