import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePoints } from '../context/PointsContext';
import { useAuth } from '../context/AuthContext';

function PromoCodesManager() {
  const { promoCodes, addPromoCode, removePromoCode } = usePoints();
  const { currentUser, loading } = useAuth();
  const [newCode, setNewCode] = useState('');
  const [newValue, setNewValue] = useState('');

  // Email da conta master
  const MASTER_EMAIL = 'prontoatendimentogama@gmail.com';

  // Verificar acesso de mestre (por email - case insensitive)
  const isMaster = currentUser && currentUser.email?.toLowerCase() === MASTER_EMAIL.toLowerCase();

  // Aguardar carregamento
  if (loading) {
    return <div className="p-8 text-center text-slate-400 font-black uppercase tracking-widest">Carregando...</div>;
  }

  if (!currentUser) {
    return <div className="p-8 text-center text-yellow-500 font-black uppercase tracking-widest">⚠️ Faça login para continuar</div>;
  }

  if (!isMaster) {
    console.log('❌ Acesso negado. Email:', currentUser.email, 'Master:', MASTER_EMAIL, 'Match:', currentUser.email?.toLowerCase() === MASTER_EMAIL.toLowerCase());
    return <div className="p-8 text-center text-red-500 font-black uppercase tracking-widest animate-pulse">Acesso Negado: Área Restrita ao Mestre</div>;
  }

  const handleCreate = (e) => {
    e.preventDefault();
    if (newCode && newValue) {
      addPromoCode(newCode, Number(newValue));
      setNewCode('');
      setNewValue('');
    }
  };

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <Link to="/profile" className="p-2 rounded-full text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <span className="material-symbols-outlined block">arrow_back</span>
          </Link>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">confirmation_number</span>
            Gestão de Códigos
          </h2>
        </div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] ml-12">Gerador de Créditos e Recompensas</p>
      </header>

      {/* Novo Código */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm font-bold">add_circle</span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Criar Novo Promo Code</h3>
        </div>
        
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Código (Slug)</label>
            <input 
              type="text"
              placeholder="EX: VERÃO2026"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-black placeholder:text-slate-800"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Valor em Pontos</label>
            <input 
              type="number"
              placeholder="0"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-black placeholder:text-slate-800"
            />
          </div>
          <button 
            type="submit"
            className="md:col-span-2 py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] neon-glow"
          >
            Ativar Código no Sistema
          </button>
        </form>
      </section>

      {/* Lista de Códigos */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Códigos Ativos</h3>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(promoCodes).map(([code, value]) => (
            <div key={code} className="flex items-center justify-between p-4 bg-[#111] border border-white/5 rounded-2xl group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-xl font-black">sell</span>
                </div>
                <div>
                  <p className="text-sm font-black text-white uppercase tracking-tight">{code}</p>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Vale {value} pontos</p>
                </div>
              </div>
              <button 
                onClick={() => { if(confirm(`Remover código ${code}?`)) removePromoCode(code); }}
                className="p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
              >
                <span className="material-symbols-outlined text-lg block">delete</span>
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default PromoCodesManager;
