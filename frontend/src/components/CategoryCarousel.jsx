import React, { useRef } from 'react';
import chirag2 from '../assets/chirag2.png';
import chirag3 from '../assets/chirag3.png';
import chirag4 from '../assets/chirag4.png';
import chirag5 from '../assets/chirag5.png';
import chirag6 from '../assets/chirag6.png';

const categories = [
  { name: 'Cars', img: chirag2 },
  { name: 'Real Estate', img: chirag3 },
  { name: 'Mobiles', img: chirag4 },
  { name: 'Jobs', img: chirag5 },
  { name: 'Bikes', img: chirag6 },
  { name: 'Electronics', img: chirag2 },
  { name: 'Furniture', img: chirag3 },
  { name: 'Fashion', img: chirag4 },
];

export default function CategoryCarousel() {
  const trackRef = useRef(null);
  const scrollBy = (delta) => trackRef.current?.scrollBy({ left: delta, behavior: 'smooth' });

  return (
    <section className="mt-6">
      <h2 className="heading-32 mb-4">Explore Categories</h2>
      <div className="relative">
        <button
          onClick={() => scrollBy(-320)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 text-xl"
          aria-label="scroll left"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(320)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-10 h-10 text-xl"
          aria-label="scroll right"
        >
          →
        </button>

        <div ref={trackRef} className="overflow-x-auto no-scrollbar">
          <div className="flex gap-8 min-w-max px-12">
            {categories.map(({ name, img }) => (
              <div key={name} className="w-32 flex-shrink-0 text-center">
                <div className="mx-auto w-28 h-28 rounded-full bg-gray-100 grid place-content-center shadow-inner overflow-hidden ring-1 ring-gray-200">
                  <img
                    src={img}
                    alt={name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="mt-3 text-sm text-gray-700 font-medium">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
