import './App.css';
import QuoteContainer from './components/QuoteContainer';
import {BrowserRouter as Router, Route, Link, Switch, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import Layout from './components/Layout';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route path= "postlist" element={<PostList />} />
          <Route index element={<QuoteContainer />} />
          <Route path= "createPost" element={<CreatePost />} />
          </Route>
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;
