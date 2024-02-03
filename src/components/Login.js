import React, { useState } from 'react';
import firebase from 'firebase/app';
import { createUserWithEmailAndPassword, signInAnonymously, updateProfile, signInWithEmailAndPassword} from 'firebase/auth';
import 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
   await createUserWithEmailAndPassword(auth, email, password)
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user);
    navigate('/quote')
  })
  .catch((error) => {
    console.log(error);
  });
  }

  const handleAnonymousLogin = () => {
      signInAnonymously(auth)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {displayName: 'AnonymousRanter'})
          setUser(user);
          navigate('/quote')
        })
        .catch((error) => {
          console.error(error);
        });
        console.log(auth.currentUser.displayName);
  }

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignUp}>Sign Up</button>
      <div>
        <button onClick={handleAnonymousLogin}>Continue Anonymously</button>
      </div>
    </div>
  );
}

export default Login;