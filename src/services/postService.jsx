import axios from "axios";

const baseUrl = 'api/posts'

const post = async (text, author, token) => {
    const post = {
      author,
      text
    };

    try {
      axios.post(baseUrl + '/create', post, { headers: { Authorization: token } });
    } catch (error) {
      console.error('Error posting rant:', error);
      throw error; // Rethrow error to handle it in the component
    }
}

const getAllPosts = async (token) => {
    try {
        return await axios.get(baseUrl + '/all', {headers: {Authorization: token}})
    } catch (error) {
        console.error("Error getting posts:", error);
    }
}

export default {post, getAllPosts}
