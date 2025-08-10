import React from 'react';
import chirag7 from '../assets/chirag7.png';

export default function ElectronicsBanner() {
  return (
    <section className="mt-8">
      <div className="relative rounded-2xl overflow-hidden bg-blue-600">
        {/* Background image */}
        <img src={chirag7} alt="Electronics" className="w-full h-full md:h-full object-cover" />

        {/* CTA button bottom-left */}
        <div className="absolute bottom-4 left-4">
          <button className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-full px-5 py-2 font-semibold shadow hover:bg-gray-100">
            Start Sell Now →
          </button>
        </div>

        {/* Pagination dots & chevrons like screenshot */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0,1,2,3,4].map((i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i===0 ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button className="w-6 h-6 grid place-content-center rounded-full bg-white/80 text-gray-900">‹</button>
          <button className="w-6 h-6 grid place-content-center rounded-full bg-white/80 text-gray-900">›</button>
        </div>
      </div>
    </section>
  );
}
