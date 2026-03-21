import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
  itemId: String,
  unitPrice: Number,
  quantity: Number,
});

const offerSchema = new Schema({
  supplierId: String,
  items: [itemSchema],
  shippingPrice: Number,
  totalPrice: Number,
  leadTime: Number,
});

const quoteSchema = new Schema({
  _id: String,
  customerName: String,
  offers: [offerSchema],
});

export const QuotesModel = mongoose.model('Quote', quoteSchema);