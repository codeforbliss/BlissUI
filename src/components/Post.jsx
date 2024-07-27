import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidUser } from '../reducer/userReducer';
import postService from '../services/postService';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Layout from './Navbar';
import '../assets/Post.css'; // Import the custom CSS file

const Post = () => {
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = "Bearer " + useSelector((state) => state.user.token);

    useEffect(() => {
        dispatch(isValidUser());
    }, [dispatch]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (user.token) {
                try {
                    const postsData = await postService.getAllPosts(token);
                    setPosts(postsData.data);
                } catch (error) {
                    console.error("Failed to fetch posts", error);
                }
            }
        };
        fetchPosts();
    }, [user.token]);

    return (
        <>
            <Layout></Layout>
            <div className="post-container">
                <h1 className="post-header">Posts</h1>
                {Array.isArray(posts) && posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <Card>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p>{post.text}</p>
                                    <footer className="blockquote-footer">
                                        {post.author}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Post;
