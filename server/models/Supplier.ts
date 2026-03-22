import mongoose, { Schema } from 'mongoose';

const supplierSchema = new Schema({
    _id: String,
    name: String,
    country: String,
});

export const SupplierModel = mongoose.model('Supplier', supplierSchema);