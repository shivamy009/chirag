import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-10 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
              <div className="flex gap-2 mb-6">
                <button
                  className={`flex-1 py-2 rounded-full border ${mode==='login' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  className={`flex-1 py-2 rounded-full border ${mode==='signup' ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-gray-50'}`}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </button>
              </div>

              {mode === 'signup' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Name</label>
                    <input className="w-full border rounded-lg px-3 py-2" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" />
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">Create account</button>
                </div>
              )}

              {mode === 'login' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Password</label>
                    <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="••••••••" />
                  </div>
                  <button className="w-full mt-4 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">Login</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
