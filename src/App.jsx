import './assets/App.css';
import Quotes from './components/Quotes';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Post from './components/Post';
import PostForm from './components/PostForm';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';
import PostCard from './components/StoryPopup';

function App() {
  return (
    <Router>

    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/postStory' element={<PostPage />} />
          <Route path= "/post" element={<PostCard />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path= "/postform" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
