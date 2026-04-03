'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
  title: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create a simple store for auth state
let authState: {
  user: User | null;
  token: string | null;
} = {
  user: null,
  token: null,
};

const listeners: Set<(state: AuthContextType) => void> = new Set();

function notifyListeners(state: AuthContextType) {
  listeners.forEach((listener) => listener(state));
}

export function useAuth(): AuthContextType & {
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
} {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();

        if (data.authenticated && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
          authState.user = data.user;
        } else {
          setUser(null);
          setIsAuthenticated(false);
          authState.user = null;
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setIsAuthenticated(false);
        authState.user = null;
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (newUser: User, token: string) => {
    setUser(newUser);
    setIsAuthenticated(true);
    authState.user = newUser;
    authState.token = token;

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(newUser));
    }

    notifyListeners({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
      login,
      logout,
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }

    setUser(null);
    setIsAuthenticated(false);
    authState.user = null;
    authState.token = null;

    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
    }

    notifyListeners({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login,
      logout,
    });

    router.push('/login');
  }, [router]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
}
