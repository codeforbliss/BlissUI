import {useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import quoteService from '../services/quotes';
import Navbar from "../components/Navbar";


const Quotes = () => {

  const[quote, setQuote] = useState('');
  const[newQuote, setNewQuote] = useState(true);
  
  useEffect(() => {
    if(newQuote) {
      const fetchQuote = async () => {
        const data = await quoteService.getQuote()
        setQuote(data)
      }

      fetchQuote()
      setNewQuote(false)
    }

  }, [quote, newQuote])
 
    return (
      <>
        <Navbar/>
        <header>
          <title>Bliss</title>
              <h1>Bliss</h1>
              <div className="Quotes">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{quote.a}</Card.Title>
                <Card.Text>
                  {quote.q}
                </Card.Text>
                <Button variant="primary" onClick={() => setNewQuote(true)}>New Quote</Button>
              </Card.Body>
            </Card>
            </div>
        </header>
      </>
    );
}

export default Quotes;