import axios from 'axios';

function quoteIdGenerator() {
    return Math.floor(Math.random() * (50) + 1);
}


class QuoteService {
    getQuote() {
        let QUOTE_REPO_URL = 'http://localhost:8080/quote/' + quoteIdGenerator();
        return axios.get(QUOTE_REPO_URL);
    }
}

export default new QuoteService()