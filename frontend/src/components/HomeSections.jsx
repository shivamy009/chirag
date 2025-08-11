import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import SectionTabs from './SectionTabs';
import { listProducts } from '../api/products';
import SkeletonCard from './SkeletonCard';

// images
import car1 from '../assets/chiragcar1.png';
import car2 from '../assets/chiragcar2.png';
import car3 from '../assets/chiragcar3.jpg';
import car4 from '../assets/chirag2.png'; // fallback if 4 not provided

import bike1 from '../assets/chiragbike1.png';
import bike2 from '../assets/chiragbike2.png';
import bike3 from '../assets/chiragbike3.png';
import bike4 from '../assets/chiragbike4.png';

import rec1 from '../assets/chiragrec1.jpg';
import rec2 from '../assets/chiragrec2.jpg';
import rec3 from '../assets/chiragrec3.jpg';
import rec4 from '../assets/chiragrec4.jpg';
import rec5 from '../assets/chiragrec5.jpg';
import rec6 from '../assets/chiragrec6.jpg';
import rec7 from '../assets/chiragrec7.jpg';
import rec8 from '../assets/chiragrec8.jpg';

const carsFallback = [car1, car2, car3, car4];
const bikes = [bike1, bike2, bike3, bike4];
const recs = [rec1, rec2, rec3, rec4, rec5, rec6, rec7, rec8];

export default function HomeSections() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError(false);
        const data = await listProducts();
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : (Array.isArray(data?.products) ? data.products : []);
        setCars(arr || []);
      } catch (e) {
        setError(true);
        setCars([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="space-y-8 mt-6">
      {/* Newly listed cars */}
  <section className="relative">
        <h3 className="heading-32 mb-2">Newly listed cars</h3>
        <SectionTabs tabs={[
          'Mahindra & Mahindra', 'Tata Motors', 'Maruti Suzuki', 'Hyundai', 'Honda', 'Toyota'
        ]} />

        {/* Scroll buttons */}
    <div className="hidden md:block">
          <button
            aria-label="Scroll left"
            onClick={() => scrollRef.current?.scrollBy({ left: -(scrollRef.current?.clientWidth || 300) * 0.9, behavior: 'smooth' })}
      className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 grid place-content-center rounded-full border bg-white text-gray-700 shadow hover:bg-blue-600 hover:text-white cursor-pointer"
          >
      <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollRef.current?.scrollBy({ left: (scrollRef.current?.clientWidth || 300) * 0.9, behavior: 'smooth' })}
      className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 grid place-content-center rounded-full border bg-white text-gray-700 shadow hover:bg-blue-600 hover:text-white cursor-pointer"
          >
      <ChevronRight size={16} />
          </button>
        </div>

        {/* Horizontal list */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory no-scrollbar pb-2 pr-2">
          {loading && Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="snap-start shrink-0 w-64 sm:w-72">
              <SkeletonCard />
            </div>
          ))}

          {/* Real data */}
          {!loading && cars.length > 0 && cars.map((p) => {
            const priceNumber = typeof p.price === 'number' ? p.price : Number(String(p.price).replace(/[^0-9.]/g, ''));
            const priceText = isNaN(priceNumber) ? (p.price ?? '') : priceNumber.toLocaleString('en-IN');
            return (
              <div key={p._id} className="snap-start shrink-0 w-64 sm:w-72">
                <ProductCard
                  image={p.images || carsFallback[0]}
                  price={`$ ${priceText}`}
                  subtitle={p.description?.slice(0, 32) || '—'}
                  meta={p.ecoScore ? `Eco: ${p.ecoScore}/100` : 'Eco: 82/100'}
                  footer={`Bengaluru · Today`}
                  to={`/products/${p._id}`}
                />
              </div>
            );
          })}

          {/* Fallback demo cards if API returns empty or fails */}
          {!loading && cars.length === 0 && (
            carsFallback.concat(carsFallback).slice(0, 8).map((img, i) => (
              <div key={`fb-${i}`} className="snap-start shrink-0 w-64 sm:w-72">
                <ProductCard
                  image={img}
                  price={i % 2 ? '$ 3,50,000' : '$ 5,80,000'}
                  subtitle={i % 2 ? '2017 • 28,000km' : '2019 • 18,500km'}
                  meta={'Eco: 82/100'}
                  footer="Demo · Today"
                />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Newly listed budget Bikes */}
      <section>
        <h3 className="heading-32 mb-2">Newly listed budget Bikes</h3>
        <SectionTabs tabs={[
          'TVS Motor', 'Bajaj Auto', 'Royal Enfield', 'Yamaha Motor Company', 'KTM', 'Royal Enfield'
        ]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bikes.map((img, i) => (
            <ProductCard
              key={i}
              image={img}
              price={i % 2 ? '$ 35,000' : '$ 86,000'}
              subtitle={i % 2 ? '2016 • 20,000km' : '2016 • 20,000km'}
              meta={"Eco: 82/100"}
              footer="Bengaluru · Today"
            />
          ))}
        </div>
      </section>

      {/* Recommended for you */}
      <section>
        <h3 className="heading-32 mb-2">Recommended For you</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recs.map((img, i) => (
            <ProductCard
              key={i}
              image={img}
              price={['$ 35,000','$ 18,000','$ 5,000','$ 1,500','$ 1,000','$ 1,000','$ 55,000','$ 500'][i]}
              subtitle={[
                'Best quality','Data refrigerator','New unused','100% Cotton','Best quality','Best quality','MacBook Air','A wooden chair for work'
              ][i]}
              meta={"Eco: 82/100"}
              footer="Bengaluru · Today"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
