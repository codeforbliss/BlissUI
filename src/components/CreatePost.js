import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const CreatePost = () => {
  const[rant, setRant] = useState('');

  const handleTextChange = (e) => {
    setRant(e.target.value);
  }

  const postRant = () =>  {
    let post = {
      postDate: new Date(Date.now()).toLocaleString(),
      author: 'test',
      text: rant
    }

    axios.post('http://localhost:8080/posts/', post)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="rantForm">
        <Form.Label>Type Your Rant Below</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Rant" rows={7} onChange={handleTextChange} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={postRant}>
        Submit
      </Button>
    </Form>
  )
} 

export default CreatePost;