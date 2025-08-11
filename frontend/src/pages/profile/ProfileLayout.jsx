import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import { Toaster } from 'react-hot-toast';
import { Menu, X } from 'lucide-react';

const linkBase = 'px-4 py-2 rounded-lg hover:bg-gray-100';
const linkActive = 'bg-blue-600 text-white hover:bg-blue-600';

export default function ProfileLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
          <button aria-label="Open menu" onClick={() => setOpen(true)} className="p-2 rounded hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <div className="font-semibold">Profile</div>
          <div className="w-8" />
        </div>
      </div>

      <main className="flex-1">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden md:block bg-white rounded-xl border p-4 h-fit sticky top-4">
            <nav className="flex md:flex-col gap-2">
              <NavLink end to="/profile" className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Dashboard</NavLink>
              <NavLink to="/profile/add-product" className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Add Product</NavLink>
              <NavLink to="/profile/manage-products" className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Manage Products</NavLink>
            </nav>
          </aside>

          <section className="min-h-[400px] space-y-6">
            <Outlet />
          </section>
        </div>
      </main>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72 max-w-[80%] bg-white shadow-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Menu</div>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <nav className="grid gap-2">
              <NavLink end to="/profile" onClick={() => setOpen(false)} className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Dashboard</NavLink>
              <NavLink to="/profile/add-product" onClick={() => setOpen(false)} className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Add Product</NavLink>
              <NavLink to="/profile/manage-products" onClick={() => setOpen(false)} className={({isActive}) => `${linkBase} ${isActive?linkActive:''}`}>Manage Products</NavLink>
            </nav>
          </div>
        </div>
      )}

      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
