import { Modal, ModalBody } from 'react-bootstrap';
import '../assets/PostPopup.css';
import { useState } from 'react';
import postService from '../services/postService';

const PostPopup = ({ mood, onClose }) => {
    const [story, setStory] = useState('');

    const handleTextChange = (e) => setStory(e.target.value);

    const handlePost = async (e) => {
        e.preventDefault();
        try {
          await postService.post(story, 'Anonymous Person', mood);
          // Clear form or show success message if needed
          setStory('');
        } catch (error) {
          // Handle error, e.g., show error message to user
        }

        onClose;
      };

    return (
        <Modal size='lg' show={true} contentClassName="popup-overlay" onHide={onClose} onEscapeKeyDown={onClose}>
            <ModalBody>
                <div className="popup">
                    <div className='left-side'>
                        <div className="feeling-degrees">
                            <div className="degree-circle"></div>
                            <div className="degree-circle"></div>
                            <div className="degree-circle"></div>
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className="story-input">
                            <h3>{mood ? `${mood} Story` : 'Title'}</h3>
                            <textarea placeholder="Write your story..." 
                                onChange={handleTextChange}></textarea>
                        </div>
                        <div className="post-button-container">
                            <button className="post-button" onClick={handlePost}>POST</button>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default PostPopup;
