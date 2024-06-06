import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import QuoteContainer from './components/QuoteContainer';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import Login from './components/Login';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path= "/postlist" element={<PostList />} />
          <Route path="/quotes" element={<QuoteContainer />} />
          <Route path= "/createPost" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
