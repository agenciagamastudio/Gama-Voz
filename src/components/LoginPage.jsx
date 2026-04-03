import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Carregar email salvo ao montar componente
  useEffect(() => {
    const savedEmail = localStorage.getItem('gama-remember-email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Salvar ou remover email conforme checkbox
    if (rememberEmail) {
      localStorage.setItem('gama-remember-email', email);
    } else {
      localStorage.removeItem('gama-remember-email');
    }

    // Fazer login
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gama-dark flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md bg-gama-surface border border-gama-border-default rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.2)]">
            <span className="material-symbols-outlined text-3xl text-primary font-black">lock</span>
          </div>
          <h1 className="text-2xl font-black text-gama-text uppercase tracking-tight italic">Gama <span className="text-primary">Calc</span></h1>
          <p className="text-[10px] text-gama-text-tertiary font-black uppercase tracking-[0.2em]">Acesso Restrito Mestre</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-black text-gama-text-secondary uppercase tracking-widest ml-1">E-mail Corporativo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gama-darker border border-gama-border-hover rounded-xl px-4 py-3 text-gama-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all font-bold placeholder:text-gama-text-tertiary hover:border-gama-border-hover"
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-black text-gama-text-secondary uppercase tracking-widest ml-1">Senha de Acesso</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gama-darker border border-gama-border-hover rounded-xl px-4 py-3 text-gama-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all font-bold placeholder:text-gama-text-tertiary hover:border-gama-border-hover pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gama-text-tertiary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Email Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-email"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
              className="w-4 h-4 rounded bg-gama-darker border border-gama-border-hover checked:bg-primary checked:border-primary cursor-pointer accent-primary"
            />
            <label htmlFor="remember-email" className="text-[10px] font-medium text-gama-text-secondary uppercase tracking-widest cursor-pointer hover:text-gama-text transition-colors">
              Lembrar minha conta
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-gama-darker font-black uppercase text-xs tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-primary/25 transition-all transform active:scale-95 neon-glow"
          >
            Entrar no Sistema
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gama-text-tertiary font-medium">
          Ainda não tem uma conta? <Link to="/signup" className="text-primary cursor-pointer hover:underline">Cadastre-se</Link>.
        </p>

        <p className="mt-2 text-center text-[10px] text-slate-600 font-medium">
          Esqueceu a senha? Contate o <a
            href="https://wa.me/5575981472503?text=Olá! Sou usuario da GAMA Calculadora e gostei muito. Recomendo!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary cursor-pointer hover:underline"
          >
            Administrador via WhatsApp
          </a>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
