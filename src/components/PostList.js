import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './posts.css';


function PostList() {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState([]);
    const [postComments, setPostComments] = useState([]);

    
      const handleTextChange = (e) => {
        setComment(e.target.value);
      }

      const commentOnPost = (postId) =>  {
        let commentText = {
            author: "random",
            text : comment , 
            postId : postId,
            time : new Date(Date.now()).toLocaleString()
        }
        axios.post('http://localhost:8080/comments/', commentText)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }


    useEffect(() => {
        axios.get('http://localhost:8080/posts/all')  // Replace with the actual API endpoint
            .then((response) => {
                setPosts(response.data);
                response.data.forEach(post => {
                    axios.get('http://localhost:8080/comments/by-postId/' + post.id)
                    .then((commentsResponse) => 
                            setPostComments(prevComments => ({
                                ...prevComments,
                                [post.id]: commentsResponse.data
                            })));
                })
                .catch((error) => {
                    console.error(error);
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <Card>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>{post.text}</p>
                                <footer className="blockquote-footer">{post.author}</footer>
                            </blockquote>
                            <div className="comment-section">
                                <Form className="comment-form">
                                    <Form.Group className="mb-3">
                                        <Form.Control className="comment-input" as="textarea" placeholder= "What are your thoughts?" rows={3} onChange={handleTextChange} />
                                    </Form.Group>
                                    <Button className="comment-button" variant="primary" type="submit" onClick={() => commentOnPost(post.id)}>
                                        Comment
                                    </Button>
                                </Form>
                            </div>
                            <div className="comments-div">
                                <ul className="comments">
                                    {postComments[post.id] && postComments[post.id].map((comment) => (
                                        <div className="comment" key={comment.id}>
                                            <div className = "comment-author">
                                                <img src = "https://www.commerce.gov/sites/default/files/2023-06/anonymous_person.png" alt="not found" className = "pfp"></img>
                                                <h6 className="comment-author">{comment.author}</h6>
                                             </div>
                                            <li>{comment.text}</li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            ))}
        </div>
    );
}

export default PostList;


