import './App.css';
import QuoteContainer from './components/QuoteContainer';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import AnonymousSignIn from './components/AnonymousLogin';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path= "postlist" element={<PostList />} />
          <Route path= "createPost" element={<CreatePost />} />
          <Route path= "quote" element={<QuoteContainer />} />
          <Route index element={<AnonymousSignIn />} />
          </Route>
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;
