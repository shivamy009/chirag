import React from 'react';

export default function SkeletonCard({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-2.5 shadow-sm ${className}`}>
      <div className="relative h-36 md:h-40 rounded-lg overflow-hidden bg-gray-200 animate-pulse" />
      <div className="mt-2.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
