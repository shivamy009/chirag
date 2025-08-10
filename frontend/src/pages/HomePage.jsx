import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import CategoryCarousel from '../components/CategoryCarousel';
import ElectronicsBanner from '../components/ElectronicsBanner';
import HomeSections from '../components/HomeSections';
import SellBuySection from '../components/SellBuySection';
import PlanExpireBanner from '../components/PlanExpireBanner';
import SmartSellBanner from '../components/SmartSellBanner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        <HeroBanner />
        <CategoryCarousel />
        <ElectronicsBanner />
        <HomeSections />
        <SellBuySection />
        <PlanExpireBanner />
        <SmartSellBanner />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
