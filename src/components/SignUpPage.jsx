import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  // Validar força da senha em tempo real
  const validatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordStrength(validatePasswordStrength(pwd));
    setError('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (password.length < 8) {
      setError('❌ Senha deve ter no mínimo 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('❌ As senhas não conferem');
      return;
    }

    if (passwordStrength < 2) {
      setError('❌ Senha muito fraca. Use maiúsculas, números ou símbolos');
      return;
    }

    // Fazer signup
    const success = await signup(email, password);
    if (success) {
      // Redirecionar após sucesso (Supabase pede confirmação de email)
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gama-dark flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-md bg-gama-surface border border-gama-border-default rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-color-rgb),0.2)]">
            <span className="material-symbols-outlined text-3xl text-primary font-black">person_add</span>
          </div>
          <h1 className="text-2xl font-black text-gama-text uppercase tracking-tight italic">Criar <span className="text-primary">Conta</span></h1>
          <p className="text-[10px] text-gama-text-tertiary font-black uppercase tracking-[0.2em]">Cadastre-se para Acessar</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5 relative z-10">
          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-black text-gama-text-secondary uppercase tracking-widest ml-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gama-darker border border-gama-border-hover rounded-xl px-4 py-3 text-gama-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all font-bold placeholder:text-gama-text-tertiary hover:border-gama-border-hover"
              placeholder="seu@email.com"
            />
            <p className="text-[9px] text-gama-text-secondary font-medium ml-1">Você receberá um email de confirmação</p>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-black text-gama-text-secondary uppercase tracking-widest ml-1">Criar Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength="8"
                value={password}
                onChange={handlePasswordChange}
                className="w-full bg-gama-darker border border-gama-border-hover rounded-xl px-4 py-3 text-gama-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all font-bold placeholder:text-gama-text-tertiary hover:border-gama-border-hover pr-12"
                placeholder="Min. 8 caracteres"
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

            {/* Força da Senha */}
            {password && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-2 bg-gama-surface rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength === 0 ? 'w-1/4 bg-red-500' :
                      passwordStrength === 1 ? 'w-2/4 bg-orange-500' :
                      passwordStrength === 2 ? 'w-3/4 bg-yellow-500' :
                      'w-full bg-primary'
                    }`}
                  ></div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  {passwordStrength === 0 ? '❌ Fraca' :
                   passwordStrength === 1 ? '⚠️ Média' :
                   passwordStrength === 2 ? '✓ Boa' :
                   '✅ Forte'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[11px] font-black text-gama-text-secondary uppercase tracking-widest ml-1">Confirmar Senha</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gama-darker border border-gama-border-hover rounded-xl px-4 py-3 text-gama-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all font-bold placeholder:text-gama-text-tertiary hover:border-gama-border-hover pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gama-text-tertiary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            {password && confirmPassword && (
              <p className={`text-[9px] font-bold ml-1 ${password === confirmPassword ? 'text-primary' : 'text-red-400'}`}>
                {password === confirmPassword ? '✅ Senhas conferem' : '❌ Senhas não conferem'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !password || !email || password !== confirmPassword}
            className="w-full py-4 bg-primary text-gama-darker font-black uppercase text-xs tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-primary/25 transition-all transform active:scale-95 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gama-text-tertiary font-medium">
          Já tem uma conta? <Link to="/login" className="text-primary cursor-pointer hover:underline">Faça login</Link>.
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
