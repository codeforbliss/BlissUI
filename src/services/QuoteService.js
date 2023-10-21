import axios from 'axios';

function quoteIdGenerator() {
    return Math.floor(Math.random() * (50) + 1);
}

const QUOTE_REPO_URL = 'http://localhost:8080/quote/' + quoteIdGenerator();

class QuoteService {

    getQuote() {
        return axios.get(QUOTE_REPO_URL);
    }
}

export default new QuoteService()