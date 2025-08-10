import React, { useState } from 'react';
import { Search, Mic, Camera, Bell, SlidersHorizontal } from 'lucide-react';

const recentChips = ['I phone', 'Fz v3 bikes', 'Tata cars', 'Books', 'Networking Jobs'];
import chirag1 from '../assets/chirag1.png';

export default function HeroBanner() {
  const [query, setQuery] = useState('');

  return (
    <section className="bg-blue-600 text-white rounded-2xl p-6 md:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug">
            The Smartest Way to Sell Anything,
            <br className="hidden sm:block" /> Instantly.
          </h1>

          {/* Search bar */}
          <div className="mt-6 bg-white rounded-full shadow flex items-center overflow-hidden">
            <div className="px-4 text-gray-500 hidden sm:flex items-center"><Search size={18} /></div>
            <input
              className="flex-1 px-4 py-3 outline-none text-gray-800"
              placeholder="Search for Products and Categories"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-2 pr-3 text-gray-600">
              <Mic size={18} />
              <Camera size={18} />
              <Bell size={18} />
              <div className="w-8 h-8 grid place-content-center rounded-full bg-gray-100 border">
                <SlidersHorizontal size={16} />
              </div>
            </div>
          </div>

          {/* Recent searches */}
          <div className="mt-5">
            <p className="text-sm text-blue-100 mb-2 font-semibold">Recent Searches</p>
            <div className="flex flex-wrap gap-2">
              {recentChips.map((c) => (
                <span key={c} className="px-3 py-1 bg-white text-gray-800 rounded-lg text-xs border">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side illustration */}
        <div className="relative h-56 md:h-64 lg:h-72">
          <img
            src={chirag1}
            alt="Hero illustration"
            className="absolute right-0 bottom-0 w-auto h-full object-contain"
          />
          {/* decorative bushes could be added as svgs later */}
        </div>
      </div>
    </section>
  );
}
