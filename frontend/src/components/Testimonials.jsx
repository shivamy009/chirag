import React from 'react';

const items = [
  {
    title: 'Smooth and secure transaction',
    body:
      'Bought a cooler via Bid.ai during the summer sale. The listing was genuine, and the seller was super responsive. Quick, easy, and trustworthy experience!',
    handle: '@kiranonline',
  },
  {
    title: 'Best place to sell locally!',
    body:
      'Listed my old fridge for free on Bid.ai and got inquiries the same day. No hidden charges, and the app is very user-friendly.',
    handle: '@sellwithme',
  },
  {
    title: 'Highly recommended marketplace',
    body:
      "I've used Bid.ai both to sell my old fan and buy a new AC. It's super simple to list items and even better to browse. I love the BID-CREDITS system!",
    handle: '@rahul_trades',
  },
  {
    title: 'Very convenient and reliable',
    body:
      "This platform makes it so easy to find what you need. I bought a second-hand ceiling fan at a great deal. Plus, I could verify the seller's profile!",
    handle: '@anjushops',
  },
];

export default function Testimonials() {
  return (
    <section className="mt-10">
      <h3 className="heading-32 mb-4">
        Transact with a trusted local community
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="">
            <div className="text-blue-600">{'★★★★★'}</div>
            <div className="mt-1 font-semibold">{it.title}</div>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{it.body}</p>
            <div className="mt-2 text-xs text-gray-500">{it.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
