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
      type: String,
      trim: true,
      default: '',
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
    created_at: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
  },
  {
 
    versionKey: false,
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
