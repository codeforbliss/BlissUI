import '../assets/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HomePage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate(path);
    }, 500); // Adjust this duration to match your CSS animation duration
  };

  return (
    <>
      <div className={`homepage ${isAnimating ? 'slide-out-top' : ''}`}>
        <div className="left-section">
          <h1 className="title">Today I Want To...</h1>
          <div className="options">
            <button
              className="option-button"
              onClick={() => handleNavigation('/post')}
            >
              <div className="icon">📖</div>
              <span>Read a Story</span>
            </button>
            <button
              className="option-button"
              onClick={() => handleNavigation('/postStory')}
            >
              <div className="icon">✏️</div>
              <span>Write a Story</span>
            </button>
            <button className="option-button">
              <div className="icon">📍</div>
              <span>See Those Around Me</span>
            </button>
          </div>
        </div>
        <div className="right-section">
          <div className="character"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
