'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from './ProtectedRoute';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();

  // Public routes that don't need protection
  const publicRoutes = ['/login'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
}
