import {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { postRant } from '../common/BackendApi';


const CreatePost = () => {
  const[rant, setRant] = useState('');
  const[author, setAuthor] = useState('');

  const handleRantChange = (e) => {
    setRant(e.target.value);
  }

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  }

  return (
    <Form>
      <Form.Group className="rantForm" controlId="rantForm">
        <Form.Label>Type Your Rant Below</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Rant" rows={7} onChange={handleRantChange} />
      </Form.Group>
      <Form.Group className="authorForm" controlId="authorForm">
        <Form.Label>Author</Form.Label>
        <Form.Control as="textarea" placeholder="How would you describe yourself? Anything you would like to share about your identity or emotion. eg: Stressed Teenager, Lawyer for 5 years, anonymous" rows={3} onChange={handleAuthorChange} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={() => postRant(rant, author)}>
        Submit
      </Button>
    </Form>
  )
} 



export default CreatePost;