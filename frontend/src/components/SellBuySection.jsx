import React from 'react';
import sell1 from '../assets/chiragsell1.png';
import sell2 from '../assets/chiragsell2.png';
import sell3 from '../assets/chiragsell3.png';

const items = [
  { img: sell1, line1: 'More then 13+', line2: 'Categories are in Bid.ai' },
  { img: sell2, line1: 'Sell your unused items', line2: 'in 30 seconds With One click sell' },
  { img: sell3, line1: 'Earn upto ₹100000000', line2: 'in BID.ai credits by referral!' },
];

export default function SellBuySection() {
  return (
    <section className="mt-10">
      <h3 className="heading-32 mb-6">Sell and buy every thing with BID.AI</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
        {items.map((it, i) => (
          <div key={i} className="text-center">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-white shadow ring-1 ring-gray-100 grid place-content-center">
              <img src={it.img} alt={it.line1} className="w-12 h-12 object-contain" />
            </div>
            <div className="mt-3 font-semibold text-gray-900 leading-snug">{it.line1}</div>
            <div className="text-sm text-gray-600 leading-snug">{it.line2}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
