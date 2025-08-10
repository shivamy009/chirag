import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 2000,
    },
    category: {
      type: String,
      trim: true,
      default: 'general',
      maxlength: 100,
    },
    images: {
      // As requested: a single string. Could be a URL or comma-separated list.
      type: String,
      trim: true,
      default: '',
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
    // We keep custom created_at per requirement; don't enable automatic timestamps
    // timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
