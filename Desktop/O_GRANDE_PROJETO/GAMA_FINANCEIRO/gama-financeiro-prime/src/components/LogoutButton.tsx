'use client';

import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export function LogoutButton() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="p-2 hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[var(--text-secondary)] hover:text-[var(--foreground)]"
      title="Fazer logout"
    >
      <LogOut className="w-5 h-5" />
    </button>
  );
}
