'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate inputs
      if (!email.trim() || !password.trim()) {
        setError('Email e senha são obrigatórios');
        setIsLoading(false);
        return;
      }

      if (!email.includes('@')) {
        setError('Formato de email inválido');
        setIsLoading(false);
        return;
      }

      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Email ou senha incorretos');
        setIsLoading(false);
        return;
      }

      // Store user data and redirect
      await login(data.user, data.token);
      router.push('/');
    } catch (err) {
      setError('Erro ao conectar ao servidor');
      setIsLoading(false);
      console.error('Login error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={isLoading}
          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-3 px-4 text-sm text-[var(--foreground)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--primary)] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest mb-2">
          Senha
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={isLoading}
          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-3 px-4 text-sm text-[var(--foreground)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--primary)] focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-start gap-3 p-3 bg-[#E11D48]/10 border border-[#E11D48]/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-[#E11D48] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#E11D48] font-medium">{error}</p>
        </div>
      )}

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[var(--primary)] hover:bg-[#7abd0f] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-3 rounded-lg transition-all shadow-lg hover:shadow-[0_0_20px_rgba(136,206,17,0.4)] uppercase text-sm tracking-wider flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Conectando...</span>
          </>
        ) : (
          'Acessar Centro de Comando'
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 py-2">
        <div className="flex-1 h-px bg-[var(--border)]" />
        <span className="text-xs text-[var(--text-secondary)]/50 font-medium uppercase">Ou</span>
        <div className="flex-1 h-px bg-[var(--border)]" />
      </div>

      {/* Demo Credentials */}
      <button
        type="button"
        onClick={() => {
          setEmail('matheus@gama.com');
          setPassword('GamaFinanceiro2024');
        }}
        disabled={isLoading}
        className="w-full border border-[var(--primary)]/30 hover:border-[var(--primary)] text-[var(--primary)] font-bold py-2 px-4 rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Usar Demo CEO
      </button>

      <button
        type="button"
        onClick={() => {
          setEmail('user@gama.com');
          setPassword('GamaUser2024');
        }}
        disabled={isLoading}
        className="w-full border border-[var(--primary)]/30 hover:border-[var(--primary)] text-[var(--primary)] font-bold py-2 px-4 rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Usar Demo User
      </button>
    </form>
  );
}
