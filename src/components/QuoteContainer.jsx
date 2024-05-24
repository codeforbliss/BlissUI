import {useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import QuoteService from '../services/QuoteService';


const QuoteContainer = () => {

  const[quote, setQuote] = useState('');
  const[newQuote, setNewQuote] = useState(true);
  
    useEffect(() => {
      if(newQuote) {
        QuoteService.getQuote().then((res) => {
          setQuote(res.data);
        })
        .catch((error)=> {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      }
      setNewQuote(false);
    }, [quote, newQuote])
 
    return (
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
    );
}

export default QuoteContainer;