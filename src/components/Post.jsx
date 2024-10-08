import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isValidUser } from '../reducer/userReducer';
import postService from '../services/postService';
import commentService from '../services/commentService'; // Service to fetch comments and replies
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Layout from './Navbar';
import '../assets/Post.css'; // Import the custom CSS file

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState({}); // Store new comments
    const [newReply, setNewReply] = useState({}); // Store new replies
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(isValidUser());
    }, [dispatch]);

    useEffect(() => {
        const fetchPosts = async () => {
            if (user.token) {
                try {
                    const postsData = await postService.getAllPosts();
                    const postsWithComments = postsData.data;
                    setPosts(postsWithComments);
                } catch (error) {
                    console.error("Failed to fetch posts or comments", error);
                }
            }
        };
        fetchPosts();
    }, [user.token]);   

    const handleCommentChange = (postId, value) => {
        setNewComment({
            ...newComment,
            [postId]: value
        });
    };

    const handleAddComment = async (postId) => {
        const commentText = newComment[postId];
        if (!commentText) return;

        try {
            const commentData = {
                text: commentText,
                author: "anonymous person",
                date: new Date(),
                postId
            };
            const newComment = await postService.addCommentToPost(postId, commentData);
            setNewComment({
                ...newComment,
                [postId]: ''
            });
        } catch (error) {
            console.error("Failed to add comment", error);
        }
    };

    const handleReplyChange = (commentId, value) => {
        setNewReply({
            ...newReply,
            [commentId]: value
        });
    };

    const handleAddReply = async (commentId) => {
        const replyText = newReply[commentId];
        if (!replyText) return;

        try {
            const replyData = {
                text: replyText,
                author: "anonymous person",
                date: new Date(),
                commentId
            };
            const newReply = await commentService.addReplyToComment(commentId, replyData);
            setNewReply({
                ...newReply,
                [commentId]: ''
            });
        } catch (error) {
            console.error("Failed to add reply", error);
        }
    };

    const renderComments = (comments) => {
        return (
            <ul>
                {comments.map((comment) => {
                    if (!comment) return null; // Skip if comment not found
    
                    return (
                        <li key={comment.id}>
                            <p>{comment.text}</p>
                            <p className="blockquote-footer">
                                {comment.author}
                            </p>
                            {/* Replies */}
                            <div className="replies-section">
                                {comment.comments.length > 0 ? (
                                    renderComments(comment.comments)
                                ) : (
                                    <p>No replies yet</p>
                                )}
                                {/* Add Reply */}
                                <div className="add-reply">
                                    <input
                                        type="text"
                                        placeholder="Reply..."
                                        value={newReply[comment.id] || ''}
                                        onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                                    />
                                    <button onClick={() => handleAddReply(comment.id)}>Reply</button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    };
    

    return (
        <>
            <Layout />
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
                                <div className="comments-section">
                                    <h6>Comments:</h6>
                                    {post.comments && post.comments.length > 0 ? (
                                        renderComments(post.comments)
                                    ) : (
                                        <p>No comments yet</p>
                                    )}
                                    {/* Add Comment */}
                                    <div className="add-comment">
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            value={newComment[post.id] || ''}
                                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                        />
                                        <button onClick={() => handleAddComment(post.id)}>Post</button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Post;
