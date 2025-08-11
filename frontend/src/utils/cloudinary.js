export async function uploadToCloudinary(file) {
  const directUrl = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const preset = import.meta.env.VITE_UPLOAD_PRESET;
  const url = directUrl || (cloudName ? `https://api.cloudinary.com/v1_1/${cloudName}/image/upload` : '');
  if (!url || !preset) throw new Error('Cloudinary env not configured');

  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', preset);

  const res = await fetch(url, { method: 'POST', body: form });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(text || 'Upload failed');
  }
  const data = await res.json();
  return data.secure_url || data.url;
}
