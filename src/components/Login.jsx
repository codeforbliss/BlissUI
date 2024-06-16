import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import loginService from '../services/login';
import quotesService from '../services/quotes';

const Login = () => {
    const navigate = useNavigate();
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

        const user = await loginService.login({
            username, password
        })

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(user)
        )
        quotesService.setToken(user.token)
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