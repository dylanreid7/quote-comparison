import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getQuoteById = (quoteId: string) => {
    return axios.get(`${API_URL}/quote-comparison?quoteId=${quoteId}`);
}