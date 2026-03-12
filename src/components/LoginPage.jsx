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
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-display">
      <div className="w-full max-w-md bg-card-bg border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.2)]">
            <span className="material-symbols-outlined text-3xl text-primary font-black">lock</span>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight italic">Gama <span className="text-primary">Calc</span></h1>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Acesso Restrito Mestre</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">E-mail Corporativo</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-bold placeholder:text-slate-800"
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Senha de Acesso</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-bold placeholder:text-slate-800"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-primary transition-colors"
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
              className="w-4 h-4 rounded bg-[#0a0a0a] border border-white/10 checked:bg-primary checked:border-primary cursor-pointer accent-primary"
            />
            <label htmlFor="remember-email" className="text-[10px] font-medium text-slate-500 uppercase tracking-widest cursor-pointer hover:text-slate-400 transition-colors">
              Lembrar minha conta
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] neon-glow"
          >
            Entrar no Sistema
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-600 font-medium">
          Ainda não tem uma conta? <Link to="/signup" className="text-primary cursor-pointer hover:underline">Cadastre-se</Link>.
        </p>

        <p className="mt-2 text-center text-[10px] text-slate-600 font-medium">
          Esqueceu a senha? Contate o <span className="text-primary cursor-pointer hover:underline">Administrador</span>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
