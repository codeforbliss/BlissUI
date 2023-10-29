import { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import QuoteService from '../services/QuoteService';
import axios from 'axios';

class QuoteContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: [],
    }
  }

    componentDidMount() {
      this.getQuote();
    }

    getQuote() {
      QuoteService.getQuote().then((res) => {
        this.setState({quote: res.data});
        console.log(this.state.quote);
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

  render() {
    return (
    <header>
    <title>Bliss</title>
        <h1>Bliss</h1>
        <div className="Quotes">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.state.quote.a}</Card.Title>
          <Card.Text>
            {this.state.quote.q}
          </Card.Text>
          <Button variant="primary" onClick={() => this.getQuote()}>New Quote</Button>
        </Card.Body>
      </Card>
      </div>
      </header>
    );
  }
}

export default QuoteContainer;