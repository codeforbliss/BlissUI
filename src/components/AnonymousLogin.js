import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { signInAnonymously, updateProfile } from 'firebase/auth';
import 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

function AnonymousSignIn() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    await signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {displayName: 'AnonymousRanter' + auth.currentUser.uid})
        console.log(auth.currentUser.uid);
        setUser(user);  
        navigate('/quote');
      })
      .catch((error) => {
        console.error(error);
      });
  } 

  return (
    <div>
        <button onClick={handleAnonymousLogin}>Continue Anonymously</button>
    </div>
  );
}

export default AnonymousSignIn;
