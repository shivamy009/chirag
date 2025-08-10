import React from 'react';
import { Facebook, Instagram, X, Linkedin, Youtube } from 'lucide-react';
import footerLogo from '../assets/chiragfooter.png';

const LinkItem = ({ children, underline = false }) => (
  <a
    href="#"
    className={
      `block text-gray-300 hover:text-white text-sm py-1 ` +
      (underline ? 'underline underline-offset-2 decoration-white/30 hover:decoration-white' : '')
    }
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#222B33] text-white overflow-hidden">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-10 pb-10 pr-0 md:pr-[280px] lg:pr-[320px] xl:pr-[360px]">
        {/* Curved shape with image on the top-right (inside the footer) */}
        <div className="absolute right-0 top-0 w-56 sm:w-72 md:w-[360px] h-[200px] sm:h-[230px] md:h-[260px] overflow-hidden pointer-events-none select-none">
          <div className="absolute right-0 top-0 w-full h-full rounded-bl-[140px] rounded-br-[24px] md:rounded-br-[32px] bg-white" />
          <img src={footerLogo} alt="bid.ai" className="absolute right-5 top-6 w-[70%] h-auto object-contain" />
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Address */}
          <div>
            <div className="font-semibold mb-3">Address:</div>
            <LinkItem underline>Level 1, 12 Sample St, Sydney NSW 2000</LinkItem>

            <div className="font-semibold mt-6 mb-3">Contact:</div>
            <LinkItem underline>+91 123 456 7890</LinkItem>
            <LinkItem underline>contact@bid.ai.in</LinkItem>

            <div className="flex items-center gap-3 mt-4 text-gray-300">
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={18} /></a>
              <a href="#" aria-label="X" className="hover:text-white"><X size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-white"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Product */}
          <div>
            <div className="font-semibold mb-3">Product</div>
            <LinkItem>Features</LinkItem>
            <LinkItem>Pricing</LinkItem>
            <LinkItem>Security</LinkItem>
          </div>

          {/* Company */}
          <div>
            <div className="font-semibold mb-3">Company</div>
            <LinkItem>About</LinkItem>
            <LinkItem>Careers</LinkItem>
          </div>
        </div>

        <hr className="my-6 border-white/20" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-gray-300 text-sm pb-6">
          <div>© 2025 bidai. All rights reserved.</div>
          <div className="flex gap-4">
            <LinkItem underline>Privacy Policy</LinkItem>
            <LinkItem underline>Terms of Service</LinkItem>
            <LinkItem underline>Cookies Settings</LinkItem>
          </div>
        </div>
      </div>
    </footer>
  );
}
