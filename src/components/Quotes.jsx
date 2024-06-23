import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Navbar from "../components/Navbar";
import { useSelector, useDispatch } from 'react-redux';
import { isValidUser } from '../reducer/userReducer';
import { newQuote } from '../reducer/quoteReducer';


const Quotes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const quote = useSelector((state) => state.quote)
  
  useEffect(() => {
    dispatch(isValidUser())
  }, [dispatch])

  useEffect(() => {
    if(user) {
      dispatch(newQuote())
    }
  }, [user, dispatch])

  const setNewQuote = () => {
    if(user) {
      dispatch(newQuote())
    }
  }

    return (
      <>
        <Navbar/>
        <header>
          <title>Bliss</title>
              <h1>Bliss</h1>
              <div className="Quotes">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{quote.author}</Card.Title>
                <Card.Text>
                  {quote.quote}
                </Card.Text>
                <Button variant="primary" onClick={() => setNewQuote()}>New Quote</Button>
              </Card.Body>
            </Card>
            </div>
        </header>
      </>
    );
}

export default Quotes;