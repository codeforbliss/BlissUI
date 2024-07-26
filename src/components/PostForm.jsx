import { useState } from 'react';
import quoteService from '../services/quotes'; // Adjust the path as needed

const PostForm = () => {
  const [rant, setRant] = useState('');
  const [author, setAuthor] = useState('');

  const handleRantChange = (e) => setRant(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await quoteService.getQuote();
      await quoteService.postRant(rant, author);
      // Clear form or show success message if needed
      setRant('');
      setAuthor('');
    } catch (error) {
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Type Your Rant Below</label>
        <textarea
          placeholder="Enter Rant"
          rows={7}
          value={rant}
          onChange={handleRantChange}
        />
      </div>
      <div>
        <label>Author</label>
        <textarea
          placeholder="How would you describe yourself?"
          rows={3}
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
