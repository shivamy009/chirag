import React, { useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';
import { createProduct } from '../../api/products';
import { Loader2, UploadCloud } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AddProduct() {
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', images: '', keyFeatures: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, images: url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
  const payload = { ...form, price: Number(form.price) };
      await createProduct(payload);
      toast.success('Product created');
  setForm({ name: '', price: '', description: '', category: '', images: '', keyFeatures: '' });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to add product';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="heading-32 mb-4">Add Product</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input name="name" value={form.name} onChange={onChange} className="w-full border rounded-lg px-3 py-2" required disabled={loading} />
        </div>
        <div>
          <label className="block text-sm mb-1">Price</label>
          <input name="price" type="number" min="0" value={form.price} onChange={onChange} className="w-full border rounded-lg px-3 py-2" required disabled={loading} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={onChange} className="w-full border rounded-lg px-3 py-2" rows={3} disabled={loading} />
        </div>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm mb-1">Key Features</label>
            <span className="text-xs text-gray-500">One per line (e.g., “Model: …”) as shown</span>
          </div>
          <textarea
            name="keyFeatures"
            value={form.keyFeatures}
            onChange={onChange}
            placeholder={"Model: Tata SUV 2024 Edition\nEngine: 1.5L Turbocharged Petrol/Diesel Options\nMileage: Approx. 18–22 km/l (Varies by variant)\nSafety: Dual Airbags, ABS with EBD, Hill Assist\nTech: Touchscreen infotainment, Android Auto, Apple CarPlay\nComfort: 5-Seater with Premium Upholstery"}
            className="w-full border rounded-lg px-3 py-2 font-mono text-xs"
            rows={6}
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Category</label>
          <input name="category" value={form.category} onChange={onChange} className="w-full border rounded-lg px-3 py-2" disabled={loading} />
        </div>

        <div>
          <label className="block text-sm mb-1">Image</label>
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={onSelectFile} disabled={loading || uploading} />
            {uploading && <Loader2 size={16} className="animate-spin" />}
          </div>
          {form.images && (
            <img src={form.images} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : (<><UploadCloud size={16} /> Save Product</>)}
          </button>
        </div>
      </form>
    </div>
  );
}
