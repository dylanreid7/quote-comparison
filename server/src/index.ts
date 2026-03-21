import express from 'express';
import { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/quote-comparison', (req: Request, res: Response) => {
  const { quoteId } = req.query;
  console.log('Hitting server.  Quote ID: ', quoteId);

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});