import mongoose, { Schema } from 'mongoose';

const ratingSchema = new Schema({
    _id: String,
    supplierId: String,
    rating: String,
});

export const RatingModel = mongoose.model('Rating', ratingSchema);