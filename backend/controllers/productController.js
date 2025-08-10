import Product from '../models/Product.js';

// Create a product
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, images } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const product = await Product.create({ name, price, description, category, images });
    return res.status(201).json(product);
  } catch (err) {
    console.error('Create product error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ created_at: -1 });
    return res.status(200).json(products);
  } catch (err) {
    console.error('Get products error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (err) {
    console.error('Get product error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update product by id
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, category, images } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, images },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(updated);
  } catch (err) {
    console.error('Update product error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete product by id
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
