import './loadEnvironment';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { QuotesModel } from '../models/Quote';
import { ItemModel } from '../models/Item';
import { SupplierModel } from '../models/Supplier';
import { RatingModel } from '../models/Rating';

interface SupplierInfo {
    supplierName: string;
    supplierCountry: string;
    supplierRating: string;
}

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
  try {
    const quote = await QuotesModel.findById(quoteId);
    
    if (!quote) {
      res.status(404).json({ message: 'Quote not found.'});
      return;
    }
    
    const supplierIds: string[] = [];
    const itemIds: string[] = []; 
    quote.offers.forEach(offer => {
        supplierIds.push(offer.supplierId);
        offer.items.forEach(item => {
            itemIds.push(item.itemId);
        })
    });

    const dbRatings = await RatingModel.find({});
    const supplierMap = new Map();
    for (const id of supplierIds) {
      const dbSupplier = await SupplierModel.findById(id);
      const supplierRating = dbRatings.find(rating => rating.supplierId === id).rating;
        const supplierInfo: SupplierInfo = {
            supplierName: dbSupplier.name,
            supplierCountry: dbSupplier.country,
            supplierRating: supplierRating,
        };
        supplierMap.set(id, supplierInfo); 
    }

    const itemMap = new Map();
    for (const id of itemIds) {
        const dbItem = await ItemModel.findById(id);
        itemMap.set(id, dbItem.name);
    }

    const responseQuote = {
      quoteId: quote._id,
      customerName: quote.customerName,
      offers: quote.offers.map((offer) => ({
        supplierId: offer.supplierId,
        supplierName: supplierMap.get(offer.supplierId)?.supplierName ?? offer.supplierId,
        supplierCountry: supplierMap.get(offer.supplierId)?.supplierCountry ?? '',
        supplierRating: supplierMap.get(offer.supplierId)?.supplierRating ?? '',
        items: offer.items.map((item) => ({
          itemId: item.itemId,
          itemName: itemMap.get(item.itemId) ?? item.itemId,
          unitPrice: item.unitPrice,
          quantity: item.quantity,
        })),
        shippingPrice: offer.shippingPrice,
        totalPrice: offer.totalPrice,
        leadTime: offer.leadTime,
      })),
    };

    res.json(responseQuote);
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