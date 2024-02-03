import './App.css';
import QuoteContainer from './components/QuoteContainer';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';
import Login from './components/Login';

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="postlist" element={<PostList />} />
            <Route path="createPost" element={<CreatePost />} />
            <Route path="quote" element={<QuoteContainer />} />
          </Route>
          <Route index element={<Login />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
