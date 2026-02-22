import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdvancedFilters() {
  const [clientFilter, setClientFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [minValueFilter, setMinValueFilter] = useState('');
  const [maxValueFilter, setMaxValueFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState([]); // Array for multi-select status
  const [newFilterName, setNewFilterName] = useState('');
  const [savedFilters, setSavedFilters] = useState(() => {
    const localSavedFilters = localStorage.getItem('gama-saved-filters');
    return localSavedFilters ? JSON.parse(localSavedFilters) : [];
  });

  useEffect(() => {
    localStorage.setItem('gama-saved-filters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  const handleStatusToggle = (status) => {
    setStatusFilter(prevStatus =>
      prevStatus.includes(status)
        ? prevStatus.filter(s => s !== status)
        : [...prevStatus, status]
    );
  };

  const handleSaveFilter = () => {
    if (newFilterName.trim() === '') {
      alert('Por favor, insira um nome para o filtro.');
      return;
    }
    const newFilter = {
      id: Date.now(),
      name: newFilterName,
      criteria: {
        clientFilter,
        projectFilter,
        startDateFilter,
        endDateFilter,
        minValueFilter,
        maxValueFilter,
        statusFilter,
      },
    };
    setSavedFilters(prevFilters => [...prevFilters, newFilter]);
    setNewFilterName(''); // Clear input after saving
    alert('Filtro salvo como favorito!');
  };

  const handleApplyFilters = () => {
    // In a real app, this would pass the filters to the History component
    console.log('Applying Filters:', {
      clientFilter,
      projectFilter,
      startDateFilter,
      endDateFilter,
      minValueFilter,
      maxValueFilter,
      statusFilter,
    });
    alert('Filtros aplicados! (Verifique o console)');
    // Optionally navigate back to history or close modal
  };

  const handleClearFilters = () => {
    setClientFilter('');
    setProjectFilter('');
    setStartDateFilter('');
    setEndDateFilter('');
    setMinValueFilter('');
    setMaxValueFilter('');
    setStatusFilter([]);
    setNewFilterName('');
    alert('Filtros limpos!');
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col font-display">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <span className="material-symbols-outlined text-primary text-xl">tune</span>
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight leading-none">Filtros</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Refinar busca</p>
          </div>
        </div>
        <Link to="/history" className="p-2 rounded-full transition-colors text-slate-500 hover:text-white hover:bg-white/5">
          <span className="material-symbols-outlined block">close</span>
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 max-w-2xl mx-auto w-full pb-40">
        {/* Informações Gerais */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">info</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Dados do Projeto</h3>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400">Cliente</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-700 text-white font-medium"
                placeholder="Ex: Tech Corp Solutions"
                type="text"
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400">Nome do Projeto</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-700 text-white font-medium"
                placeholder="Ex: Portal SaaS"
                type="text"
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Período */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">calendar_month</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Período</h3>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Início</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                type="date"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fim</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm"
                type="date"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Faixa de Valor */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">payments</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Faixa de Valor</h3>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-white/5 shadow-xl grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mínimo (R$)</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm font-semibold"
                placeholder="0,00"
                type="number"
                value={minValueFilter}
                onChange={(e) => setMinValueFilter(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Máximo (R$)</label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white text-sm font-semibold"
                placeholder="0,00"
                type="number"
                value={maxValueFilter}
                onChange={(e) => setMaxValueFilter(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">flag</span>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Status</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {['Pendente', 'Assinado', 'Enviado'].map(statusOption => (
              <button
                key={statusOption}
                onClick={() => handleStatusToggle(statusOption)}
                className={`px-6 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                  statusFilter.includes(statusOption)
                    ? 'border-primary bg-primary text-black shadow-[0_0_15px_rgba(196,255,13,0.3)]'
                    : 'border-white/10 bg-white/5 text-slate-500 hover:border-white/20 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {statusOption === 'Pendente' ? 'schedule' : statusOption === 'Assinado' ? 'verified' : 'send'}
                </span>
                {statusOption}
              </button>
            ))}
          </div>
        </section>

        {/* Salvar Favorito */}
        <section className="pt-8 border-t border-white/5">
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-primary uppercase tracking-widest">Salvar como Favorito</label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-[#0a0a0a] focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-700 text-white font-bold"
                placeholder="Nome do filtro (ex: Alto Valor)"
                type="text"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveFilter}
              className="w-full py-3 bg-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">star</span>
              Fixar nos Atalhos
            </button>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md z-50 flex flex-col md:flex-row gap-4">
        <div className="max-w-2xl mx-auto w-full flex flex-col md:flex-row gap-4">
          <button
            onClick={handleApplyFilters}
            className="flex-1 px-8 py-4 bg-primary text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] neon-glow"
          >
            Aplicar Filtros
          </button>
          <button
            onClick={handleClearFilters}
            className="px-8 py-4 bg-white/5 text-slate-400 font-bold uppercase text-xs tracking-widest rounded-2xl hover:bg-white/10 transition-all border border-white/5"
          >
            Limpar
          </button>
        </div>
      </footer>
    </div>
  );
}

export default AdvancedFilters;