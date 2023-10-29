import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/posts/all')  // Replace with the actual API endpoint
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post) => (
                <div>
                    <Card>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {post.text}
                                </p>
                                <footer className="blockquote-footer">
                                    {post.author}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <br></br>
                </div>
            ))}
        </div>

        

        
    );
}

export default PostList;


