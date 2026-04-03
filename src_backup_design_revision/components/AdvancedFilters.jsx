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
    <div className="relative w-full max-w-md bg-white dark:bg-[#111722] min-h-screen sm:min-h-[85vh] sm:rounded-xl shadow-2xl flex flex-col overflow-hidden border border-transparent dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#111722] z-10">
        <h2 className="text-lg font-bold leading-tight tracking-tight">Filtros Avançados</h2>
        <Link to="/history" className="p-2 rounded-full transition-colors text-slate-400 hover:text-white hover:bg-white/5">
          <span className="material-symbols-outlined block text-slate-500 dark:text-slate-400">close</span>
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
        {/* Informações Gerais */}
        <section className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label htmlFor="clientName" className="text-sm font-medium">Cliente</label>
              <div className="relative">
                <input
                  id="clientName"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="Ex: Inova Solutions"
                  type="text"
                  value={clientFilter}
                  onChange={(e) => setClientFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="projectName" className="text-sm font-medium">Nome do Projeto</label>
              <div className="relative">
                <input
                  id="projectName"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="Ex: App E-commerce"
                  type="text"
                  value={projectFilter}
                  onChange={(e) => setProjectFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Período (Date Range) */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Período</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="text-sm font-medium">Data Início</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
                <input
                  id="startDate"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="DD/MM/AAAA"
                  type="text"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="text-sm font-medium">Data Fim</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">calendar_today</span>
                <input
                  id="endDate"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="DD/MM/AAAA"
                  type="text"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Faixa de Valor (Value Range) */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Faixa de Valor</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="minValue" className="text-sm font-medium">Valor Mínimo</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#92a4c9] text-sm font-medium">R$</span>
                <input
                  id="minValue"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="0,00"
                  type="text"
                  value={minValueFilter}
                  onChange={(e) => setMinValueFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="maxValue" className="text-sm font-medium">Valor Máximo</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#92a4c9] text-sm font-medium">R$</span>
                <input
                  id="maxValue"
                  className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 pl-9 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                  placeholder="0,00"
                  type="text"
                  value={maxValueFilter}
                  onChange={(e) => setMaxValueFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Status da Proposta (Multi-select Chips) */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Status da Proposta</h3>
          <div className="flex flex-wrap gap-2">
            {['Pendente', 'Assinado', 'Enviado'].map(statusOption => (
              <button
                key={statusOption}
                onClick={() => handleStatusToggle(statusOption)}
                className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition-all ${
                  statusFilter.includes(statusOption)
                    ? 'border-primary bg-primary text-black' // Solid for selected
                    : 'border-slate-200 dark:border-[#324467] bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300' // Existing style, which is fine
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

        <section className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Salvar Filtro</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="filterName" className="text-sm font-medium">Nome do Filtro Favorito</label>
              <input
                id="filterName"
                className="w-full bg-slate-50 dark:bg-[#192233] border border-slate-200 dark:border-[#324467] rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-[#92a4c9]"
                placeholder="Ex: Propostas de Alto Valor"
                type="text"
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveFilter}
              className="w-full py-2.5 px-6 border-2 border-primary/40 text-primary font-bold rounded-lg hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">star</span>
              Salvar como Favorito
            </button>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111722] flex flex-col gap-3">
        <button
          onClick={handleApplyFilters}
          className="w-full px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(136,206,17,0.4)] transition-all"
        >
          Aplicar Filtros
        </button>
        <button
          onClick={handleClearFilters}
          className="w-full px-6 py-2.5 text-slate-400 font-bold rounded-lg hover:text-white hover:bg-white/5 transition-all"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}

export default AdvancedFilters;