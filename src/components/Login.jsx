import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { initializeUser } from '../reducer/userReducer';
import loginService from '../services/login';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useField("text");
    const password = useField("password");
    

    const handleSignup = async (event, username, password) => {
      event.preventDefault()

      await loginService.signUp({
          username, password
      })

      handleLogin(event, username, password)
    }

    const handleLogin = async (event, username, password) => {
        event.preventDefault()
        dispatch(initializeUser(username, password))
        navigate('/quotes')
    }

    return (
        <Form>
        <Form.Group className="username" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control {...username.inputProps} />
        </Form.Group>
        <Form.Group className="password" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control {...password.inputProps} />
        </Form.Group>
        <Button variant="primary" type="button" onClick={(e) => handleLogin(e, username.value, password.value)}>
          Submit
        </Button>
        <Button variant="primary" type="button" onClick={(e) => handleSignup(e, username.value, password.value)}>
          Signup
        </Button>
      </Form>
    )
}

export default Login