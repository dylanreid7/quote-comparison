import './loadEnvironment';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { QuotesModel } from '../models/Quote';

const app = express();
const PORT = process.env.PORT || '3000';
const MONGO_URI = process.env.MONGO_URI || '';

app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/quote-comparison', async (req, res) => {
  const { quoteId } = req.query;
  console.log('Hitting server.  Quote ID: ', quoteId);
  try {
    const quote = await QuotesModel.findById(quoteId);
    
    if (!quote) {
      res.status(404).json({ message: 'Quote not found.'});
      return;
    }

    res.json(quote);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err: Error) => console.error('MongoDB connection error:', err));