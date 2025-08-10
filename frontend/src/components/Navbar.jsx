import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin, ChevronDown, Plus, Percent, Bell, Heart, MessageCircle, FileText, BriefcaseBusiness, Package, User
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import chirag6 from '../assets/chirag6.png';
import logo from '../assets/chiraglogo.jpg';

const NavItem = ({ icon: Icon, label }) => (
  <div className="hidden md:flex flex-col items-center gap-1 text-gray-700 hover:text-blue-700">
    <Icon size={18} />
    <span className="text-xs leading-none">{label}</span>
  </div>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-20 flex items-center gap-4">
        {/* Logo with tagline below */}
        <Link to="/" className="flex flex-col items-center justify-center leading-tight">
          <img src={logo} alt="logo" className="w-18 h-8 rounded" />
          <span className="text-[10px] text-gray-500 mt-0.5">Buy. Inspect. Deal</span>
        </Link>

        {/* Location chip */}
        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-700 border rounded-full px-3 py-2">
          <MapPin size={16} className="text-blue-600" />
          <span>Taj Garden Retreat, Bengaluru</span>
          <ChevronDown size={14} className="text-gray-500" />
        </div>

        <div className="flex-1" />

        {/* Sell buttons */}
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700">
            <Plus size={16} /> Sell
          </button>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm hover:bg-gray-50">
            <span className="inline-flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
              <Percent size={14} />
            </span>
            One Click sell
          </button>
        </div>

        {/* Middle icon group with labels */}
        <div className="hidden md:flex items-center gap-6 mx-4">
          <NavItem icon={Package} label="Your Items" />
          <NavItem icon={Heart} label="Favourite" />
          <NavItem icon={MessageCircle} label="Chat" />
          <NavItem icon={FileText} label="Blogs" />
          <NavItem icon={BriefcaseBusiness} label="Career" />
        </div>

        {/* Right side: bell + avatar */}
        <div className="flex items-center gap-4" ref={menuRef}>
          <button title="Notifications" aria-label="notifications" className="text-gray-700 hover:text-blue-700">
            <Bell size={20} />
          </button>

          {/* Avatar with dropdown */}
          <div className="relative">
            <button
              className="w-9 h-9 rounded-full overflow-hidden border"
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <img src={chirag6} alt="profile" className="w-full h-full object-cover" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-md py-1 z-50">
                <button
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={() => { setOpen(false); nav('/auth'); }}
                >
                  Login
                </button>
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" disabled>
                  Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
