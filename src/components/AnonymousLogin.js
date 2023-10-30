import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

function AnonymousSignIn() {
  const [user, setUser] = useState('');

  const auth = getAuth();

  useEffect(() => {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome!</p>
          <div>User</div>
          <p>{user.uid}</p>
        </div>
      ) : (
        <p>Signing in anonymously...</p>
      )}
    </div>
  );
}

export default AnonymousSignIn;
