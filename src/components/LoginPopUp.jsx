import { Modal, Button, Form } from 'react-bootstrap';
import "../assets/LoginPopUp.css";
import { useDispatch } from 'react-redux';
import { initializeUser} from '../reducer/userReducer';
import { useState } from 'react';

const LoginPopup = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = async (username, password) => {
        try {
            await dispatch(initializeUser(username, password));
            setShow(false);
        } catch (error) {
            console.error("Login failed", error);
        }
    };
  
    return (
      <>
        <button onClick={handleShow} className="open-button">
          Open Login
        </button>
  
        <Modal show={show} onHide={handleClose} centered>
          <div className="login-popup">
            <button className="close-button" onClick={handleClose}>×</button>
            <div className="header">
              <div className="face">😐</div>
              <h2>Sign In</h2>
            </div>
            <form>
              <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" autoComplete='cc-number' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <a href="#signup" className="signup-link">Sign up</a>
              <Button type="button" className="login-button" onClick={() => handleLogin(username, password)}>LOG IN</Button>
            </form>
          </div>
        </Modal>
    </>
  );
};

export default LoginPopup;