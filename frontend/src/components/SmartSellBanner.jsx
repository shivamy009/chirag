import React from 'react';
import smart from '../assets/smartsell.png';

export default function SmartSellBanner() {
  return (
    <section className="mt-10">
      <div className="rounded-2xl overflow-hidden">
        <img src={smart} alt="Smart Sell" className="w-full h-auto block" />
      </div>
    </section>
  );
}
