import './App.css';
import Quotes from './components/Quotes';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import PostForm from './components/PostForm';
import Login from './components/Login';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path= "/post" element={<Post />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path= "/postform" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
