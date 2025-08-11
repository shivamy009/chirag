import React, { useEffect, useState } from 'react';
import { listProducts, deleteProduct, updateProduct } from '../../api/products';
import { Loader2, Trash2, Pencil } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { uploadToCloudinary } from '../../utils/cloudinary';

export default function ManageProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '', images: '', keyFeatures: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const load = async () => {
    setLoading(true);
    try {
      const data = await listProducts();
      setItems(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Keep page in range when items change (e.g., after delete)
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    if (page > totalPages) setPage(totalPages);
  }, [items]);

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || '',
      price: p.price ?? '',
      description: p.description || '',
      category: p.category || '',
  images: p.images || '',
  keyFeatures: Array.isArray(p.keyFeatures) ? p.keyFeatures.join('\n') : (p.keyFeatures || ''),
    });
  };

  const closeEdit = () => {
    if (saving || uploading) return;
    setEditing(null);
  };

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

  const onSave = async (e) => {
    e?.preventDefault?.();
    if (!editing) return;
    setSaving(true);
    try {
  const payload = { ...form, price: Number(form.price) };
      const updated = await updateProduct(editing._id, payload);
      setItems((arr) => arr.map((x) => (x._id === editing._id ? updated : x)));
      toast.success('Product updated');
      setEditing(null);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Update failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    setBusyId(id);
    try {
      await deleteProduct(id);
      setItems((arr) => arr.filter((x) => x._id !== id));
      toast.success('Deleted');
    } catch (err) {
      toast.error('Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const pageItems = items.slice(startIdx, endIdx);

  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="heading-32 mb-4">Manage Products</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-600"><Loader2 className="animate-spin" /> Loading...</div>
      ) : (
        <div className="grid gap-3">
          {items.length === 0 && <div className="text-sm text-gray-500">No products yet.</div>}
          {pageItems.map((p) => (
            <div key={p._id} className="flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4 border rounded-lg p-3">
              <img src={p.images || 'https://via.placeholder.com/64'} alt={p.name} className="w-16 h-16 object-cover rounded self-start sm:self-auto" />
              <div className="flex-1 w-full">
                <div className="font-medium break-words">{p.name}</div>
                <div className="text-sm text-gray-600">${p.price} • {p.category || 'general'}</div>
                {Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0 && (
                  <ul className="list-disc pl-5 text-xs text-gray-600 mt-1 space-y-0.5">
                    {p.keyFeatures.slice(0,4).map((f, i) => (<li key={i}>{f}</li>))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto sm:justify-end">
                <button
                  onClick={() => openEdit(p)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 w-full sm:w-auto justify-center"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => onDelete(p._id)}
                  disabled={busyId === p._id}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
                >
                  {busyId === p._id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                  Delete
                </button>
              </div>
            </div>
          ))}
          {/* Pagination controls */}
          {items.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-sm text-gray-600">
                Showing {total === 0 ? 0 : startIdx + 1}–{endIdx} of {total}
              </div>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={closeEdit}>
          <div className="bg-white rounded-xl w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={closeEdit} disabled={saving||uploading}>✕</button>
            </div>

            <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input name="name" value={form.name} onChange={onChange} className="w-full border rounded-lg px-3 py-2" required disabled={saving} />
              </div>
              <div>
                <label className="block text-sm mb-1">Price</label>
                <input name="price" type="number" min="0" value={form.price} onChange={onChange} className="w-full border rounded-lg px-3 py-2" required disabled={saving} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={onChange} className="w-full border rounded-lg px-3 py-2" rows={3} disabled={saving} />
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <input name="category" value={form.category} onChange={onChange} className="w-full border rounded-lg px-3 py-2" disabled={saving} />
              </div>
              <div>
                <label className="block text-sm mb-1">Image</label>
                <div className="flex items-center gap-2">
                  <input type="file" accept="image/*" onChange={onSelectFile} disabled={saving || uploading} />
                  {uploading && <Loader2 size={16} className="animate-spin" />}
                </div>
                {form.images && (
                  <img src={form.images} alt="preview" className="mt-2 w-32 h-32 object-cover rounded" />
                )}
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm mb-1">Key Features</label>
                  <span className="text-xs text-gray-500">One per line</span>
                </div>
                <textarea
                  name="keyFeatures"
                  value={form.keyFeatures}
                  onChange={onChange}
                  className="w-full border rounded-lg px-3 py-2 font-mono text-xs"
                  rows={6}
                  disabled={saving}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button type="button" onClick={closeEdit} className="px-4 py-2 rounded-lg border hover:bg-gray-50" disabled={saving||uploading}>Cancel</button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (<><Loader2 size={16} className="animate-spin" /> Saving...</>) : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
