import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há token de recuperação na URL
    const accessToken = searchParams.get('access_token');
    const type = searchParams.get('type');
    
    if (!accessToken || type !== 'recovery') {
      setError('Link de reset inválido ou expirado');
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validações
    if (!newPassword || !confirmPassword) {
      setError('Preencha todos os campos');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Atualizar senha usando o token
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        setError(`Erro ao atualizar senha: ${updateError.message}`);
      } else {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Erro ao processar reset de senha');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gama-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gama-surface border border-gama-border-default rounded-2xl p-8">
          <h1 className="text-3xl font-black text-primary mb-2 text-center">
            RESETAR SENHA
          </h1>
          <p className="text-gama-text-secondary text-center text-sm mb-8">
            Digite sua nova senha
          </p>

          {error && (
            <div className="bg-gama-error/10 border border-gama-error/30 text-gama-error px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-gama-success/10 border border-gama-success/30 text-gama-success px-4 py-3 rounded-lg mb-6 text-sm">
              ✅ Senha atualizada com sucesso! Redirecionando...
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Nova Senha */}
            <div>
              <label className="block text-gama-text-secondary text-sm font-bold mb-2">
                Nova Senha
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full bg-gama-dark border border-gama-border-default rounded-lg px-4 py-3 text-gama-text focus:outline-none focus:border-primary transition-colors"
                disabled={loading || success}
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-gama-text-secondary text-sm font-bold mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita a senha"
                className="w-full bg-gama-dark border border-gama-border-default rounded-lg px-4 py-3 text-gama-text focus:outline-none focus:border-primary transition-colors"
                disabled={loading || success}
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary text-black font-black py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-50 mt-6"
            >
              {loading ? 'ATUALIZANDO...' : 'ATUALIZAR SENHA'}
            </button>
          </form>

          <p className="text-gama-text-secondary text-sm text-center mt-6">
            Lembrou da senha?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary font-bold hover:brightness-110"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
