import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gama-user-settings');
    return saved ? JSON.parse(saved) : {
      autoSave: true,
      notifications: true,
      rounding: 'none', // 'none', 'up', 'standard'
      defaultTax: 15,
      defaultDiscount: 5,
      language: 'pt-BR'
    };
  });

  useEffect(() => {
    localStorage.setItem('gama-user-settings', JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <header className="space-y-2">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">settings</span>
          Configurações
        </h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Preferências do Sistema</p>
      </header>

      {/* Cálculos Padrão */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">calculate</span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Padrões da Calculadora</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Imposto Padrão (%)</label>
            <input 
              type="number"
              value={settings.defaultTax}
              onChange={(e) => setSettings({...settings, defaultTax: Number(e.target.value)})}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">Desconto Padrão (%)</label>
            <input 
              type="number"
              value={settings.defaultDiscount}
              onChange={(e) => setSettings({...settings, defaultDiscount: Number(e.target.value)})}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase">Regra de Arredondamento</label>
          <select 
            value={settings.rounding}
            onChange={(e) => setSettings({...settings, rounding: e.target.value})}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-all font-bold cursor-pointer"
          >
            <option value="none" className="bg-[#111]">Nenhum (Centavos Reais)</option>
            <option value="up" className="bg-[#111]">Sempre para cima (Teto)</option>
            <option value="standard" className="bg-[#111]">Padrão Matemático</option>
          </select>
        </div>
      </section>

      {/* Comportamento */}
      <section className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-primary text-sm">bolt</span>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Sistema</h3>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white">Salvamento Automático</p>
            <p className="text-[10px] text-slate-500 font-medium">Persistir dados enquanto você digita</p>
          </div>
          <button 
            onClick={() => setSettings({...settings, autoSave: !settings.autoSave})}
            className={`w-12 h-6 rounded-full transition-all relative ${settings.autoSave ? 'bg-primary' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoSave ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white">Notificações</p>
            <p className="text-[10px] text-slate-500 font-medium">Alertas de propostas expirando</p>
          </div>
          <button 
            onClick={() => setSettings({...settings, notifications: !settings.notifications})}
            className={`w-12 h-6 rounded-full transition-all relative ${settings.notifications ? 'bg-primary' : 'bg-slate-700'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.notifications ? 'left-7' : 'left-1'}`}></div>
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
          <div className="space-y-0.5">
            <p className="text-sm font-bold text-white">Reiniciar Onboarding</p>
            <p className="text-[10px] text-slate-500 font-medium">Voltar para o fluxo de perfil inicial</p>
          </div>
          <button 
            onClick={() => {
              if (confirm('Deseja reiniciar o onboarding?')) {
                localStorage.removeItem('gama-onboarding-completed');
                window.location.href = '/onboarding';
              }
            }}
            className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-lg border border-primary/20 hover:bg-primary/20 transition-all"
          >
            Reiniciar
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-3 pt-4">
        <button 
          onClick={() => alert('Preferências salvas!')}
          className="w-full py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] neon-glow"
        >
          Aplicar Configurações
        </button>
        <Link to="/" className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
          Voltar para Início
        </Link>
      </div>

    </div>
  );
}

export default UserSettings;
