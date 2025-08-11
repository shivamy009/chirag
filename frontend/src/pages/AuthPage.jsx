import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signup as apiSignup, login as apiLogin } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    // Basic client-side validations
    if (!form.email || !form.password || (mode === 'signup' && !form.name)) {
      toast.error('Please fill all required fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const action = mode === 'signup' ? apiSignup : apiLogin;
      const payload = mode === 'signup' ? form : { email: form.email, password: form.password };
      const { user, token } = await action(payload);
      setAuth({ user, token });
      toast.success(mode === 'signup' ? 'Account created' : 'Logged in');
      nav('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-10 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow p-6">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-full border ${mode==='login' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                  onClick={() => setMode('login')}
                  disabled={loading}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-full border ${mode==='signup' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                  onClick={() => setMode('signup')}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>

              {mode === 'signup' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1" htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} onChange={onChange} className="w-full border rounded-lg px-3 py-2" placeholder="Your name" disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={onChange} className="w-full border rounded-lg px-3 py-2" placeholder="you@example.com" disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={form.password} onChange={onChange} className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" disabled={loading} />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (<><Loader2 size={16} className="animate-spin" /> Processing...</>) : 'Create account'}
                  </button>
                </div>
              )}

              {mode === 'login' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1" htmlFor="email2">Email</label>
                    <input id="email2" name="email" type="email" value={form.email} onChange={onChange} className="w-full border rounded-lg px-3 py-2" placeholder="you@example.com" disabled={loading} />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" htmlFor="password2">Password</label>
                    <input id="password2" name="password" type="password" value={form.password} onChange={onChange} className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" disabled={loading} />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (<><Loader2 size={16} className="animate-spin" /> Processing...</>) : 'Login'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
