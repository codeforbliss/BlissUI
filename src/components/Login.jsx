import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useField } from '../hooks';
import { initializeUser, isValidUser } from '../reducer/userReducer';
import loginService from '../services/login';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../assets/Login.css';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useField("text");
    const password = useField("password");
    const user = useSelector((state) => state.user);

    const handleSignup = async (event, username, password) => {
        event.preventDefault();
        try {
            await loginService.signUp({ username, password });
            handleLogin(event, username, password);
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    const handleLogin = async (event, username, password) => {
        event.preventDefault();
        try {
            await dispatch(initializeUser(username, password));
            navigate('/quotes');
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    useEffect(() => {
      const validateUser = async () => {
        await dispatch(isValidUser());
      };
      validateUser();
    }, [dispatch])

    useEffect(() => {
      console.log(user)
      if (user.token) {
        alert("welcome")
        navigate('/quotes')
      }
    }, [user])

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <Form className="login-form">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control {...username.inputProps} placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...password.inputProps} placeholder="Enter password" />
                </Form.Group>
                <Button className="login-button" variant="primary" type="button" onClick={(e) => handleLogin(e, username.value, password.value)}>
                    Submit
                </Button>
                <Button className="signup-button" variant="secondary" type="button" onClick={(e) => handleSignup(e, username.value, password.value)}>
                    Signup
                </Button>
            </Form>
        </div>
    );
};

export default Login;
