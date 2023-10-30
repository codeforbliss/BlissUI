import React, { useState } from 'react';
import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBat7FPs0LgbhbTj3jXI3KbZcCPqEg-4Wc",
  authDomain: "bliss-fdfd9.firebaseapp.com",
  projectId: "bliss-fdfd9",
  storageBucket: "bliss-fdfd9.appspot.com",
  messagingSenderId: "248802920866",
  appId: "1:248802920866:web:46a04e349698da8340cafb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
