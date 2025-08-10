import React from 'react';
import { Heart, MapPin } from 'lucide-react';

export default function ProductCard({ image, price, subtitle, meta, footer }) {
  const [leftFooter, rightFooter] = (footer || '').split('·').map(s => s?.trim());

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm hover:shadow-md transition">
      <div className="relative h-36 md:h-40 rounded-lg overflow-hidden bg-gray-100">
        <img src={image} alt="item" className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 w-8 h-8 grid place-content-center rounded-full bg-white/95 border shadow">
          <Heart size={16} className="text-gray-700" />
        </button>
      </div>

      <div className="mt-2.5 space-y-1">
        {/* Price + Eco */}
        <div className="flex items-center justify-between">
          <div className="font-extrabold text-[15px]">{price}</div>
          <div className="text-[11px] text-gray-600">{meta}</div>
        </div>

        {/* Subtitle */}
        <div className="text-[11px] text-gray-600 leading-snug">{subtitle}</div>

        {/* Footer row: location left, date right */}
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <div className="inline-flex items-center gap-1.5">
            <MapPin size={12} className="text-gray-400" />
            <span>{leftFooter}</span>
          </div>
          <span>{rightFooter}</span>
        </div>
      </div>
    </div>
  );
}
