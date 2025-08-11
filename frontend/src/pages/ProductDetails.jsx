import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, listProducts } from '../api/products';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Heart, Share2, Star, BadgeCheck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkeletonCard from '../components/SkeletonCard';

export default function ProductDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState([]);
  const [active, setActive] = useState(0);
  const images = (data?.images ? [data.images] : []).slice(0, 5);

  useEffect(() => {
    (async () => {
      try {
        const d = await getProductById(id);
        setData(d);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const items = await listProducts();
        setMore(items.filter((x) => x._id !== id).slice(0, 4));
      } catch {}
    })();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
          {/* Left skeleton: big image area and thumbnails */}
          <div>
            <div className="rounded-2xl overflow-hidden border bg-gray-200 animate-pulse aspect-[4/3]" />
            <div className="mt-3 grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden border bg-gray-200 animate-pulse aspect-video" />
              ))}
            </div>
          </div>

          {/* Right skeleton: text blocks */}
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />
              <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-3 w-3/4 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="p-3 border rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newly listed cars skeleton grid */}
        <div className="mt-8">
          <div className="h-8 w-60 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  if (!data) return (<div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-10">Not found</div>);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 flex-1 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
        {/* Left: big image + thumbnails */}
        <div>
          <div className="relative rounded-2xl overflow-hidden border bg-gray-100 aspect-[4/3]">
            {images[active] && <img src={images[active]} alt={data.name} className="w-full h-full object-cover" />}
            {/* Nav chevrons */}
            <button aria-label="Prev" className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 grid place-content-center bg-white/95 rounded-full border shadow">
              <ChevronLeft size={16} />
            </button>
            <button aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 grid place-content-center bg-white/95 rounded-full border shadow">
              <ChevronRight size={16} />
            </button>

            {/* Right stacked actions */}
            <div className="absolute right-3 top-3 flex flex-col gap-2">
              <button className="w-9 h-9 grid place-content-center bg-white/95 rounded-lg border shadow" title="Wishlist">
                <Heart size={16} />
              </button>
              <button className="w-9 h-9 grid place-content-center bg-white/95 rounded-lg border shadow" title="Share">
                <Share2 size={16} />
              </button>
            </div>
          </div>
          {images.length > 0 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.map((img, i) => (
                <button key={i} onClick={() => setActive(i)} className={`rounded-lg overflow-hidden border ${i===active?'ring-2 ring-blue-600':''} aspect-video`}>
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: details */}
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold truncate">{data.name}</h1>
              <div className="text-sm text-gray-600">By Mahesh babu</div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
                <span className="font-bold text-2xl">₹ {Number(data.price || 0).toLocaleString('en-IN')}</span>
                <span className="line-through text-gray-400">₹ {Number((data.price || 0) * 1.1).toLocaleString('en-IN')}</span>
                <span className="inline-flex items-center gap-1 text-gray-500"><Calendar size={14} /> {new Date(data.created_at).toLocaleDateString()}</span>
                <span className="inline-flex items-center gap-1 text-gray-500"><MapPin size={14} /> Bengaluru & Nearby Cities</span>
              </div>
            </div>
            <div className="text-sm text-gray-600 whitespace-nowrap">Eco: <span className="font-semibold">82/100</span></div>
          </div>

          {data.description && (
            <div>
              <div className="font-semibold mb-1">Product Description</div>
              <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
            </div>
          )}

          {Array.isArray(data.keyFeatures) && data.keyFeatures.length > 0 && (
            <div>
              <div className="font-semibold mb-1">Key Features :</div>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {data.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          {/* Seller block */}
          <div>
            <div className="font-semibold mb-2">Product Seller</div>
            <div className="flex items-center justify-between gap-4 p-3 border rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <img src="https://i.pravatar.cc/64?img=13" alt="seller" className="w-10 h-10 rounded-full object-cover" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    Geolife Agritech India <BadgeCheck size={16} className="text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-600 inline-flex items-center gap-1"><Star size={14} className="text-yellow-500" /> 4.8</div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm hover:bg-gray-50">View Seller</button>
            </div>
          </div>
        </div>
      </div>

      {/* Newly listed cars */}
      {more.length > 0 && (
        <div className="mt-8">
          <h3 className="heading-32 mb-2">Newly listed cars</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {more.map((p) => {
              const priceNumber = typeof p.price === 'number' ? p.price : Number(String(p.price).replace(/[^0-9.]/g, ''));
              const priceText = isNaN(priceNumber) ? (p.price ?? '') : priceNumber.toLocaleString('en-IN');
              return (
                <ProductCard
                  key={p._id}
                  image={p.images}
                  price={`$ ${priceText}`}
                  subtitle={p.description?.slice(0, 32) || '—'}
                  meta={p.ecoScore ? `Eco: ${p.ecoScore}/100` : 'Eco: 82/100'}
                  footer={`Bengaluru · Today`}
                  to={`/products/${p._id}`}
                />
              );
            })}
          </div>
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
}
