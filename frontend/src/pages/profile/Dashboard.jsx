import React from 'react';
import { useAuthStore } from '../../store/authStore';

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  return (
    <div className="bg-white rounded-xl border p-6">
      <h2 className="heading-32 mb-4">Dashboard</h2>
      <div className="space-y-2 text-sm">
        <div><span className="font-medium">Name:</span> {user?.name}</div>
        <div><span className="font-medium">Email:</span> {user?.email}</div>
      </div>
    </div>
  );
}
