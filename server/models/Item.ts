import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    _id: String,
    name: String,
});

export const ItemModel = mongoose.model('Item', itemSchema);