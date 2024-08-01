import '../assets/Quotes.css'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { isValidUser } from '../reducer/userReducer';
import { newQuote } from '../reducer/quoteReducer';
import { useNavigate } from 'react-router-dom';
import LocationRequest from './LocationRequest'; // Make sure to update the path as necessary

const Quotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const quote = useSelector((state) => state.quote);
  const [loading, setLoading] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      await dispatch(isValidUser());
      setLoading(false);
    };

    validateUser();
  }, [dispatch])

  useEffect(() => {
    if (!loading) {
      if (user.token) {
        dispatch(newQuote());
      } else {
        window.alert('Please log in again.');
        navigate('/');
      }
    }
  }, [loading])

  const setNewQuote = () => {
    if(user) {
      dispatch(newQuote())
    }
  }

  return (
    <>
      <Navbar />
      <div className="quotes-container">
        <title>Bliss</title>
        <h1>Bliss</h1>
        <div className="card-container">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{quote.author}</Card.Title>
              <Card.Text>
                {quote.quote}
              </Card.Text>
              <Button variant="primary" onClick={setNewQuote}>New Quote</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      {showLocationModal && <LocationRequest onClose={() => setShowLocationModal(false)} />}
    </>
  );
}

export default Quotes;
