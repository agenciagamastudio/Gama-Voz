import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

function HistoryWithSavedFilters() {
  const [proposals, setProposals] = useState(() => {
    const savedProposals = localStorage.getItem('gama-proposals');
    return savedProposals ? JSON.parse(savedProposals) : [
      {
        id: 'PROP-2023-0842',
        clientName: 'Tech Corp Solutions',
        projectName: 'Portal de Gestão SaaS',
        issueDate: '12 Out 2023',
        totalInvestment: 15000,
        status: 'Pendente',
        summary: 'Portal de gestão completo para otimização de processos internos.'
      },
      {
        id: 'PROP-2023-0841',
        clientName: 'Loja XP Varejo',
        projectName: 'App E-commerce',
        issueDate: '05 Out 2023',
        totalInvestment: 28500,
        status: 'Assinado',
        summary: 'Desenvolvimento de aplicativo móvel para e-commerce com funcionalidades avançadas.'
      },
      {
        id: 'PROP-2023-0840',
        clientName: 'Banco Futuro S.A.',
        projectName: 'Dashboard Financeiro',
        issueDate: '28 Set 2023',
        totalInvestment: 42100,
        status: 'Enviado',
        summary: 'Dashboard interativo para acompanhamento financeiro em tempo real.'
      },
      {
        id: 'PROP-2023-0839',
        clientName: 'Startup Innova',
        projectName: 'Landing Page UI/UX',
        issueDate: '21 Set 2023',
        totalInvestment: 4800,
        status: 'Pendente',
        summary: 'Criação de landing page focada em experiência do usuário e conversão.'
      },
    ];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos'); // 'Todos', 'Assinado', 'Pendente', 'Enviado'

  useEffect(() => {
    localStorage.setItem('gama-proposals', JSON.stringify(proposals));
  }, [proposals]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pendente':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50';
      case 'Assinado':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50';
      case 'Enviado':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
    }
  };

  const filteredProposals = useMemo(() => {
    return proposals.filter(proposal => {
      const matchesSearch = searchTerm === '' ||
        proposal.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'Todos' || proposal.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, selectedStatus]);


  // Dummy saved filters for now
  const savedFilters = [
    { id: 1, name: 'Propostas TI', icon: 'developer_board', color: 'text-primary' },
    { id: 2, name: 'Acima de R$ 10k', icon: 'payments', color: 'text-amber-500' },
    { id: 3, name: 'Último Mês', icon: 'calendar_month', color: 'text-emerald-500' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/20">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Gama Calculadora</h1>
          </div>
          <button className="size-10 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-4 pb-4 flex gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
            <input
              className="w-full bg-white dark:bg-primary/10 border-slate-200 dark:border-primary/20 focus:ring-primary focus:border-primary rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-500"
              placeholder="Buscar por projeto ou cliente..."
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link to="/history/filters" className="p-2.5 rounded-lg border-2 border-primary/40 text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">tune</span>
          </Link>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
          {['Todos', 'Pendente', 'Assinado', 'Enviado'].map(statusOption => (
            <button
              key={statusOption}
              onClick={() => setSelectedStatus(statusOption)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold ${
                selectedStatus === statusOption
                  ? 'bg-primary text-black' // Solid for selected
                  : 'border border-slate-200 dark:border-white/10 text-slate-400 hover:bg-white/5' // Ghost/outline for unselected
              }`}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 mb-20">
        {/* Saved Filters Section */}
        <div className="space-y-3 pb-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">Filtros Salvos</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
            {savedFilters.map(filter => (
              <button key={filter.id} className="flex items-center gap-2 px-3 py-2 border-2 border-primary/40 text-primary font-bold rounded-lg shrink-0 hover:border-primary hover:bg-primary/5 transition-all">
                <span className={`material-symbols-outlined text-sm ${filter.color}`}>{filter.icon}</span>
                <span className="text-xs font-medium">{filter.name}</span>
              </button>
            ))}
            <button className="flex items-center gap-2 px-3 py-2 border-2 border-primary/40 text-primary font-bold rounded-lg shrink-0 hover:border-primary hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-sm text-primary">add_circle</span>
              <span className="text-xs font-medium text-slate-500">Novo</span>
            </button>
          </div>
        </div>

        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 mt-2">Propostas Recentes</h2>

        {filteredProposals.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-400">Nenhuma proposta encontrada.</p>
        ) : (
          filteredProposals.map(proposal => (
            <div key={proposal.id} className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-primary/10 rounded-xl p-4 shadow-sm hover:border-primary/40 transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{proposal.projectName}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{proposal.clientName}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusClasses(proposal.status)}`}>
                  {proposal.status}
                </span>
              </div>
              <div className="flex justify-between items-end border-t border-slate-100 dark:border-primary/10 pt-3">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Data</span>
                  <span className="text-sm font-medium">{proposal.issueDate}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-medium block">Valor Total</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(proposal.totalInvestment)}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Footer Padding */}
        <div className="h-8"></div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-slate-200 dark:border-primary/20 flex justify-around items-center px-4 py-3">
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">calculate</span>
          <span className="text-[10px] font-medium">Calculadora</span>
        </Link>
        <Link to="/history" className="flex flex-col items-center gap-1 text-primary">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <span className="text-[10px] font-bold">Histórico</span>
        </Link>
        <a className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined text-2xl">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </a>
      </nav>
    </div>
  );
}

export default HistoryWithSavedFilters;