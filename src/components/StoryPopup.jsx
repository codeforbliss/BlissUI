import { useEffect, useState } from 'react';
import postService from '../services/postService';
import Layout from './Navbar';
import '../assets/StoryPopup.css';

const examplePosts = [
    {
      id: 1,
      text: "Today was a wonderful day! The sun was shining, birds were singing, and I had a great time at the park with my friends.",
      comments: [
        { 
          id: 1, 
          text: "That sounds amazing! I'm so happy for you!",
          author: "Jane Doe",
          comments: [
            { 
              id: 3, 
              text: "I agree! Sounds like a perfect day.",
              author: "John Smith",
              comments: []
            }
          ]
        },
        { 
          id: 2, 
          text: "Nothing beats a day at the park with good company.",
          author: "Alice Johnson",
          comments: []
        }
      ]
    },
    // ... other posts
  ];
  
  const Comment = ({ comment, depth = 0 }) => {
    const [replyText, setReplyText] = useState('');
  
    const handleReply = () => {
      setReplyText('');
    };
  
    return (
      <li className={`comment depth-${depth}`}>
        <p>{comment.text}</p>
        <p className="comment-author">{comment.author}</p>
        {comment.comments && comment.comments.length > 0 && (
          <ul className="nested-comments">
            {comment.comments.map(nestedComment => (
              <Comment key={nestedComment.id} comment={nestedComment} depth={depth + 1} />
            ))}
          </ul>
        )}
        <div className="add-reply">
          <input
            type="text"
            placeholder="Reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>Reply</button>
        </div>
      </li>
    );
  };
  
  const PostCard = () => {
    const [posts, setPosts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
                try {
                    const postsData = await postService.getAllPosts();
                    const postsWithComments = postsData.data;
                    setPosts(postsWithComments);
                } catch (error) {
                    console.error("Failed to fetch posts or comments", error);
                }
        };
        fetchPosts();
    }, []);   
  
    const goToPrevious = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : posts.length - 1));
    };
  
    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < posts.length - 1 ? prevIndex + 1 : 0));
    };
  
    if (!posts || posts.length === 0) {
      return <div>No posts available.</div>;
    }
  
    const currentPost = posts[currentIndex];
  
    return (
        <>
        <Layout></Layout>
      <div className="post-container">
        <h1 className="post-header">I want to read a happy story.</h1>
        <div className="post-card">
          <div className="post-content">
            <div className="post-text">
              <h2 className="post-title">Title</h2>
              <p>{currentPost.text}</p>
            </div>
            <div className="comments-section">
              <h2 className="comments-title">Comments</h2>
              <ul className="comments-list">
                {currentPost.comments.map(comment => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="navigation">
          <button onClick={goToPrevious} className="nav-button">
            <span className="icon icon-left"></span> Previous
          </button>
          <button onClick={goToNext} className="nav-button">
            Next <span className="icon icon-right"></span>
          </button>
        </div>
      </div>
      </>
    );
  };
  
  export default PostCard;