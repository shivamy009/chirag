import React from 'react';
import { Sparkles } from 'lucide-react';
import expImg from '../assets/chiragexp.png';

export default function PlanExpireBanner() {
  return (
    <section className="mt-6">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Text side */}
          <div className="p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-extrabold">Your Plan is About to Expire!</h3>
            <p className="mt-3 text-blue-100 max-w-xl">
              Renew now to keep listing and boosting your products without interruption
            </p>
            <button className="mt-6 inline-flex items-center gap-2 bg-white text-blue-700 rounded-full px-5 py-2 font-semibold hover:bg-blue-100">
              Renew Plan <Sparkles size={16} />
            </button>
          </div>

          {/* Image side */}
          <div className="relative h-56 md:h-auto">
            <img src={expImg} alt="Expire" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
