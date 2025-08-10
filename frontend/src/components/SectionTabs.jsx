import React from 'react';

export default function SectionTabs({ tabs }) {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {tabs.map((t) => (
        <button key={t} className="px-3 py-1.5 rounded-full border text-xs bg-white hover:bg-gray-50">
          {t}
        </button>
      ))}
    </div>
  );
}
