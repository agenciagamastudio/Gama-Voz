import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

// ✅ SIMPLIFICAÇÃO: Remover localStorage, eventos customizados, CSS dinâmico

function UserProfile() {
  const { redeemCode, addBonusPoints } = usePoints();
  const { addToast } = useToast();
  const { profile, profileLoading, updateUserProfile, currentUser } = useAuth();

  // Estados locais
  const [localName, setLocalName] = useState('');
  const [localAccentColor, setLocalAccentColor] = useState('#C4FF0D');
  const [localAvatar, setLocalAvatar] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  // ✅ Inicializar apenas uma vez quando profile carrega
  useEffect(() => {
    if (profile) {
      setLocalName(profile.full_name || '');
      setLocalAccentColor(profile.accent_color || '#C4FF0D');
      setLocalAvatar(profile.avatar_url || null);
    }
  }, [profile?.id]); // Usar profile.id como chave (muda apenas se usuário diferente)

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = useMemo(() => {
    try {
      const proposals = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
      const trash = JSON.parse(localStorage.getItem('gama-trash') || '[]');

      return {
        count: proposals.length,
        value: proposals.reduce((sum, p) => sum + (Number(p.totalInvestment) || 0), 0),
        trashCount: trash.length,
        lost: trash.reduce((sum, p) => sum + (Number(p.totalInvestment) || 0), 0)
      };
    } catch {
      return { count: 0, value: 0, trashCount: 0, lost: 0 };
    }
  }, []);

  // ✅ SIMPLIFICAÇÃO: Salvar apenas no Supabase
  // Remover: localStorage.setItem, window.dispatchEvent, CSS dinâmico, setTimeout
  const handleSaveProfile = async () => {
    const success = await updateUserProfile({
      full_name: localName,
      accent_color: localAccentColor
    });

    if (success) {
      // ✅ PRONTO! A cor sincroniza automaticamente porque:
      // 1. AuthContext refetches o profile
      // 2. AccentColorContext monitora profile?.accent_color
      // 3. CSS aplica via Tailwind var(--primary-color)
      addToast('Perfil salvo com sucesso!', 'success');
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-yellow-400 font-black text-center">
      ⚠️ NÃO AUTENTICADO - Por favor faça login primeiro
    </div>;
  }

  if (profileLoading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primary font-black animate-pulse">
      CARREGANDO PERFIL...
    </div>;
  }

  const colors = [
    { name: 'Neon Lime', hex: '#C4FF0D' },
    { name: 'Cyber Blue', hex: '#00D1FF' },
    { name: 'Hot Pink', hex: '#FF007A' },
    { name: 'Pure White', hex: '#FFFFFF' }
  ];

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-32 space-y-8">

      {/* Header */}
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <label htmlFor="avatar-input" className="cursor-pointer block">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-color-rgb),0.15)] overflow-hidden">
              {localAvatar ? (
                <img src={localAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-primary opacity-80">account_circle</span>
              )}
            </div>
          </label>
          <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </div>
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">
          {localName || 'Seu Nome'}
        </h2>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-card-bg p-5 rounded-2xl border border-white/5 space-y-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase">Documentos Ativos</p>
          <p className="text-2xl font-black text-white">{stats.count}</p>
          <p className="text-[10px] text-primary font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stats.value)}
          </p>
        </div>
        <div className="bg-card-bg p-5 rounded-2xl border border-white/5 space-y-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase">Oportunidades Perdidas</p>
          <p className="text-2xl font-black text-slate-400">{stats.trashCount}</p>
          <p className="text-[10px] text-red-500 font-bold">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stats.lost)}
          </p>
        </div>
      </section>

      {/* Profile Form */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6">
        <h3 className="text-xs font-black uppercase text-slate-400">Identidade Profissional</h3>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder="Seu Nome"
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary"
        />
      </section>

      {/* Color Selector */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6">
        <h3 className="text-xs font-black uppercase text-slate-400">Cor de Destaque (Neon)</h3>
        <div className="flex flex-wrap gap-4 items-center">
          {colors.map(color => (
            <button
              key={color.hex}
              onClick={() => setLocalAccentColor(color.hex)}
              className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center ${
                localAccentColor === color.hex ? 'ring-4 ring-white/20 scale-110' : 'opacity-50'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {localAccentColor === color.hex && <span className="material-symbols-outlined">check</span>}
            </button>
          ))}
          <input
            type="color"
            value={localAccentColor}
            onChange={(e) => setLocalAccentColor(e.target.value)}
            className="w-12 h-12 rounded-2xl ring-4 ring-white/20 cursor-pointer"
          />
        </div>
      </section>

      {/* Promo Code */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 space-y-6">
        <h3 className="text-xs font-black uppercase text-slate-400">Resgatar Código</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Digite o código"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white"
          />
          <button
            onClick={() => {
              if (redeemCode(promoCode)) setPromoCode('');
            }}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-black uppercase rounded-xl hover:bg-white/10"
          >
            Resgatar
          </button>
        </div>
      </section>

      {/* Save Button */}
      <button
        onClick={handleSaveProfile}
        className="w-full py-4 bg-primary text-black font-black rounded-xl hover:bg-primary/90 transition-all"
      >
        Salvar Perfil
      </button>
    </div>
  );
}

export default UserProfile;
