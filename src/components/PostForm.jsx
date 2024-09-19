import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isValidUser } from '../reducer/userReducer';
import postService from '../services/postService';
import Layout from '../components/Navbar';
import '../assets/PostForm.css'; // Import the CSS file

const PostForm = () => {
  const [rant, setRant] = useState('');
  const [author, setAuthor] = useState('');
  const [emotion, setEmotion] = useState(''); // Default emotion state
  const dispatch = useDispatch();

  const handleRantChange = (e) => setRant(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleEmotionChange = (e) => setEmotion(e.target.value);

  useEffect(() => {
    dispatch(isValidUser());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.post(rant, author, emotion);
      // Clear form or show success message if needed
      setRant('');
      setAuthor('');
      setEmotion(''); // Reset emotion after submit
    } catch (error) {
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <>
      <Layout />
      <div className="post-form-container">
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label>Type Your Rant Below</label>
            <textarea
              placeholder="Enter Rant"
              rows={7}
              value={rant}
              onChange={handleRantChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <textarea
              placeholder="How would you describe yourself?"
              rows={3}
              value={author}
              onChange={handleAuthorChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Emotion</label>
            <select
              value={emotion}
              onChange={handleEmotionChange}
              className="form-control"
            >
              <option value="">How you feeling?</option>
              <option value="HAPPY">Happy</option>
              <option value="SAD">Sad</option>
              <option value="SCARED">Scared</option>
              <option value="ANGRY">Angry</option>
              <option value="ANXIETY">Anxious</option>
              <option value="NOSTALGIA">Nostaligic</option>
              <option value="EMBARRASED">Embarrased</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
