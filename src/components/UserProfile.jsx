import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext'; // Importar useAuth
import { EarnPointsModal } from './EarnPointsModal';
import { OnboardingTour } from './OnboardingTour';

function UserProfile() {
  const { redeemCode, addBonusPoints } = usePoints();
  const { addToast } = useToast();
  const { profile, profileLoading, updateUserProfile, currentUser } = useAuth(); // Usar o hook useAuth

  const [promoCode, setPromoCode] = useState('');
  const [showEarnPointsModal, setShowEarnPointsModal] = useState(false);
  
  // Estados locais para os campos editáveis, inicializados com os valores do perfil Supabase
  const [localName, setLocalName] = useState('');
  const [localRole, setLocalRole] = useState('');
  const [localCompany, setLocalCompany] = useState('');
  const [localAccentColor, setLocalAccentColor] = useState('');
  const [localAvatar, setLocalAvatar] = useState(null); // Pode ser uma URL ou base64

  // Atualiza estados locais quando o perfil do Supabase é carregado/atualizado
   
  useEffect(() => {
    if (profile) {
      setLocalName(profile.full_name || '');
      setLocalRole(profile.professional_role || '');
      setLocalCompany(profile.company || '');
      setLocalAccentColor(profile.accent_color || '#C4FF0D');
      setLocalAvatar(profile.avatar_url || null);
    }
  }, [profile]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalAvatar(reader.result); // Armazenar temporariamente como base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Verificar se perfil está completo (nome, avatar, cargo e empresa)
  const isProfileComplete = useMemo(() => {
    return (
      localName &&
      localName.trim() !== '' &&
      localAvatar &&
      localRole &&
      localRole.trim() !== '' &&
      localCompany &&
      localCompany.trim() !== ''
    );
  }, [localName, localAvatar, localRole, localCompany]);

  // Mostrar modal de "Ganhe Pontos" quando perfil completo
  useEffect(() => {
    if (isProfileComplete && !showEarnPointsModal) {
      // Auto-open modal quando perfil é completado pela primeira vez
      const hasSeenModal = localStorage.getItem('gama-earn-points-modal-seen');
      if (!hasSeenModal) {
        setShowEarnPointsModal(true);
        localStorage.setItem('gama-earn-points-modal-seen', 'true');
      }
    }
  }, [isProfileComplete]);

  const stats = useMemo(() => {
    // ... lógica de stats mantida, ainda lendo do localStorage
    try {
      const proposalsRaw = localStorage.getItem('gama-proposals');
      const trashRaw = localStorage.getItem('gama-trash');

      const proposals = proposalsRaw ? JSON.parse(proposalsRaw) : [];
      const trash = trashRaw ? JSON.parse(trashRaw) : [];

      const totalValue = proposals.reduce((sum, p) => sum + (Number(p.totalInvestment) || 0), 0);
      const lostValue = trash.reduce((sum, p) => sum + (Number(p.totalInvestment) || 0), 0);

      return {
        count: proposals.length,
        value: totalValue,
        lost: lostValue,
        trashCount: trash.length
      };
    } catch {
      return { count: 0, value: 0, lost: 0, trashCount: 0 };
    }
  }, []);

  const handleSaveProfile = async () => {
    const updatedFields = {
      full_name: localName,
      accent_color: localAccentColor,
      avatar_url: localAvatar,
      professional_role: localRole, // ✅ Agora salva o cargo!
      company: localCompany, // ✅ Agora salva a empresa!
    };

    try {
      const success = await updateUserProfile(updatedFields);
      if (success) {
        addToast('Perfil salvo com sucesso! Cores sincronizadas em todas as telas.', 'success');
        // AccentColorContext will automatically sync the color across the app
      } else {
        addToast('Erro ao salvar perfil. Tente novamente.', 'error');
      }
    } catch (error) {
      addToast('Erro ao salvar perfil: ' + error.message, 'error');
    }
  };

  if (!currentUser) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-yellow-400 font-black text-center">
      ⚠️ NÃO AUTENTICADO - Por favor faça login primeiro
    </div>;
  }

  if (profileLoading) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-primary font-black animate-pulse">CARREGANDO PERFIL...</div>;
  }

  // Predefined colors for quick selection (can be removed if only color picker is desired)
  const colors = [
    { name: 'Neon Lime', hex: '#C4FF0D' },
    { name: 'Cyber Blue', hex: '#00D1FF' },
    { name: 'Hot Pink', hex: '#FF007A' },
    { name: 'Pure White', hex: '#FFFFFF' }
  ];

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header do Perfil */}
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <label htmlFor="avatar-input" className="cursor-pointer block">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary-color-rgb),0.15)] group-hover:border-primary/50 transition-all overflow-hidden relative">
              {localAvatar ? ( // Usar localAvatar
                <img src={localAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-primary opacity-80 group-hover:scale-110 transition-transform">account_circle</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
              </div>
            </div>
          </label>
          <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">{localName || 'Seu Nome'}</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{localRole || 'Seu Cargo'} • {localCompany || 'Sua Empresa'}</p>
        </div>
      </header>

      {/* Grid de Métricas Inteligentes */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-card-bg p-5 rounded-2xl border border-white/5 shadow-xl space-y-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Documentos Ativos</p>
          <p className="text-2xl font-black text-white">{stats.count}</p>
          <p className="text-[10px] text-primary font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stats.value)}</p>
        </div>
        <div className="bg-card-bg p-5 rounded-2xl border border-white/5 shadow-xl space-y-1">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Oportunidades Perdidas</p>
          <p className="text-2xl font-black text-slate-400">{stats.trashCount}</p>
          <p className="text-[10px] text-red-500 font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(stats.lost)}</p>
        </div>
      </section>

      {/* Formulário de Identidade */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">badge</span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Identidade Profissional</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Seu Nome</label>
            <input 
              type="text"
              value={localName} // Usar estado local
              onChange={(e) => setLocalName(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Seu Cargo</label>
              <input 
                type="text"
                value={localRole} // Usar estado local
                onChange={(e) => setLocalRole(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all text-sm font-bold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Sua Empresa</label>
              <input 
                type="text"
                value={localCompany} // Usar estado local
                onChange={(e) => setLocalCompany(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all text-sm font-bold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customização de Marca */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">palette</span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Branding do Sistema</h3>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase">Cor de Destaque (Neon)</p>
          <div className="flex flex-wrap gap-4 items-center"> {/* Adicionado items-center */}
            {colors.map(color => (
              <button
                key={color.hex}
                onClick={() => setLocalAccentColor(color.hex)} // Atualizar estado local
                className={`w-12 h-12 rounded-2xl transition-all flex items-center justify-center ${localAccentColor === color.hex ? 'ring-4 ring-white/20 scale-110 shadow-lg' : 'opacity-50 hover:opacity-100'}`}
                style={{ backgroundColor: color.hex }}
              >
                {localAccentColor === color.hex && <span className="material-symbols-outlined text-black font-black">check</span>}
              </button>
            ))}
            {/* Seletor de Cores */}
            <input 
                type="color" 
                value={localAccentColor} 
                onChange={(e) => setLocalAccentColor(e.target.value)}
                className="w-12 h-12 rounded-2xl p-0 border-none cursor-pointer overflow-hidden ring-4 ring-white/20 scale-110 shadow-lg"
                title="Escolha uma cor personalizada"
            />
          </div>
        </div>
      </section>

      {/* Resgate de Pontos */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-sm font-bold">confirmation_number</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Resgatar Código</h3>
          </div>
          {/* Verificar se é admin pelo ID */}
          {currentUser?.id === '00662266-db06-41d4-b237-95062bfb6b06' && (
            <Link to="/admin/codes" className="p-1.5 rounded-lg bg-white/5 text-slate-500 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-sm block">settings</span>
            </Link>
          )}
        </div>
        <div className="flex gap-3">
          <input 
            type="text"
            placeholder="Digite o código"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold placeholder:text-slate-700 text-sm"
          />
          <button 
            onClick={() => {
              if(redeemCode(promoCode)) setPromoCode('');
            }}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all"
          >
            Resgatar
          </button>
        </div>
      </section>

      {/* Programa de Convites */}
      <section className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-6 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined font-black">share</span>
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Convide Parceiros</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Ganhe +20 pts por ativação</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden">
          <code className="text-[10px] text-primary font-bold opacity-70 truncate mr-4">gamacalc.com/ref/{(profile?.full_name || currentUser?.email || 'user').toLowerCase().replace(/\s/g, '')}</code>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('https://gamacalc.com.br/invite/' + (profile?.full_name || currentUser?.email || 'user').toLowerCase().replace(/\s/g, ''));
              addBonusPoints(5, 'Engajamento');
              addToast('Link copiado!', 'success');
            }}
            className="p-2 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
        </div>
      </section>

      {/* Ganhe Pontos Extra */}
      {isProfileComplete && (
        <section className="bg-gradient-to-br from-primary/10 to-yellow-500/5 p-6 rounded-2xl border border-primary/30 space-y-4 text-left">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-black">stars</span>
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">Ganhe Pontos Extras</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Complete ações para desbloquear mais energia</p>
            </div>
          </div>
          <button
            onClick={() => setShowEarnPointsModal(true)}
            className="w-full py-3 bg-gradient-to-r from-primary to-yellow-400 text-black font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all transform active:scale-[0.98]"
          >
            Ver Ações Disponíveis
          </button>
        </section>
      )}

      <div className="flex flex-col gap-3">
        <button
          onClick={handleSaveProfile} // Chamar a função de salvar do Supabase
          className="w-full py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] neon-glow"
        >
          Salvar Perfil
        </button>
        <Link to="/" className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
          Voltar para Início
        </Link>
      </div>

      {/* Modal de Ganhar Pontos */}
      <EarnPointsModal
        isOpen={showEarnPointsModal}
        onClose={() => setShowEarnPointsModal(false)}
        profileComplete={isProfileComplete}
      />

      {/* Tour de Onboarding - APENAS após perfil completo */}
      {isProfileComplete && <OnboardingTour />}

    </div>
  );
}

export default UserProfile;
