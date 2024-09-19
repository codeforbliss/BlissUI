import '../assets/PostPage.css';
import { useState } from 'react';
import PostPopup from './PostPopup';
import LoginPopup from './LoginPopUp';

const PostPage = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const moods = [
      { name: 'HAPPY', color: '#FFD700' },
      { name: 'SAD', color: '#87CEFA' },
      { name: 'SCARED', color: '#8A2BE2' },
      { name: 'ANGRY', color: '#FF6347' },
      { name: 'ANXIETY', color: '#FFA07A' },
      { name: 'NOSTALGIA', color: '#DDA0DD' },
      { name: 'EMBARRASSED', color: '#FFC0CB' },
    ];

    const handleSelectMood = (mood) => {
        setSelectedMood(mood);
        setShowModal(true);
      };

    const handleCloseModal = () => {
        setShowModal(false);
    }
  
    return (
      <div className={"container slide-out-top"}>
        <h2 className="title">Currently I'm feeling...</h2>
        <div className="semi-circle">
          {moods.map((mood) => (
            <div
              key={mood.name}
              className={`circle ${selectedMood === mood.name ? 'selected' : ''}`}
              style={{ backgroundColor: mood.color }}
              onClick={() => handleSelectMood(mood.name)}
            >
              <span className="mood-name">{mood.name}</span>
            </div>
          ))}
        </div>
        <p className="selected-mood">
          {selectedMood
            ? `You're feeling ${selectedMood}!`
            : 'Click on a mood to select it!'}
        </p>
        {showModal && <PostPopup mood={selectedMood} onClose={handleCloseModal}/>}
        <LoginPopup></LoginPopup>
      </div>
    );
  };

export default PostPage;
