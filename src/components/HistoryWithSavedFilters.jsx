import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProposal } from '../context/ProposalContext';
import { useValueReport } from '../context/ValueReportContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

// Normaliza um registro da tabela `reports` para o formato esperado pelo componente
function reportToDoc(report) {
  const snap = report.snapshot || {};
  return {
    _source: 'supabase',
    _supabaseId: report.id,
    id: report.report_number || report.id,
    type: 'diagnostico',
    clientName: report.client_name || snap.clientName || '',
    projectName: snap.projectName || 'Diagnóstico Financeiro',
    issueDate: report.issue_date
      ? new Date(report.issue_date).toLocaleDateString('pt-BR')
      : snap.issueDate || '',
    totalInvestment: report.total_loss || snap.totalInvestment || 0,
    status: snap.status || 'Pendente',
    deletedAt: report.deleted_at || null,
    // Campos completos do snapshot para o preview
    ...snap,
  };
}

// Normaliza um registro de localStorage para o formato interno
function localToDoc(doc) {
  return { _source: 'local', _supabaseId: null, ...doc };
}

function HistoryWithSavedFilters() {
  const navigate = useNavigate();
  const { updateProposalData } = useProposal();
  const { updateReportData } = useValueReport();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(true);

  // Documentos ativos e lixeira — separados por origem para facilitar operações
  const [dbDocs, setDbDocs] = useState([]);       // reports do Supabase (ativos)
  const [dbTrash, setDbTrash] = useState([]);      // reports do Supabase (deletados)
  const [localDocs, setLocalDocs] = useState([]);  // propostas comerciais (ainda em localStorage)
  const [localTrash, setLocalTrash] = useState([]); // lixeira local (legacy)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [minPriceFilter, setMinPriceFilter] = useState(0);

  // ─── Carregar dados ───────────────────────────────────────────────────────
  useEffect(() => {
    const loadLocal = () => {
      const saved = localStorage.getItem('gama-proposals');
      // Filtra apenas propostas comerciais (type !== 'diagnostico') — os diagnósticos agora vêm do Supabase
      const all = saved ? JSON.parse(saved) : [];
      const onlyProposals = all.filter(d => d.type !== 'diagnostico');
      setLocalDocs(onlyProposals.map(localToDoc));

      const savedTrash = localStorage.getItem('gama-trash');
      setLocalTrash(savedTrash ? JSON.parse(savedTrash).map(localToDoc) : []);
    };

    const loadFromSupabase = async () => {
      if (!currentUser) return;
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (error || !data) return;

      setDbDocs(data.filter(r => !r.deleted_at).map(reportToDoc));
      setDbTrash(data.filter(r => !!r.deleted_at).map(reportToDoc));
    };

    setLoading(true);
    loadLocal();
    loadFromSupabase().finally(() => setLoading(false));
  }, [currentUser]);

  // Persiste lixeira local no localStorage
  useEffect(() => {
    localStorage.setItem('gama-trash', JSON.stringify(localTrash.map(({ _source, _supabaseId, ...rest }) => rest)));
  }, [localTrash]);

  // ─── Listas combinadas para exibição ─────────────────────────────────────
  const proposals = useMemo(() => [...dbDocs, ...localDocs], [dbDocs, localDocs]);
  const trash     = useMemo(() => [...dbTrash, ...localTrash], [dbTrash, localTrash]);

  // ─── Ações ────────────────────────────────────────────────────────────────
  const handleViewDocument = useCallback((doc) => {
    if (doc.type === 'diagnostico') {
      updateReportData(doc);
      navigate('/value-report/preview');
    } else {
      updateProposalData(doc);
      navigate('/proposal/preview');
    }
  }, [updateReportData, updateProposalData, navigate]);

  const handleMoveToTrash = useCallback(async (id, e) => {
    e.stopPropagation();

    const dbDoc = dbDocs.find(d => d.id === id);
    if (dbDoc) {
      // Otimista
      setDbDocs(prev => prev.filter(d => d.id !== id));
      setDbTrash(prev => [{ ...dbDoc, deletedAt: new Date().toISOString() }, ...prev]);
      // Persiste
      const { error } = await supabase
        .from('reports')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', dbDoc._supabaseId);
      if (error) {
        // Rollback
        setDbDocs(prev => [dbDoc, ...prev]);
        setDbTrash(prev => prev.filter(d => d.id !== id));
      }
      return;
    }

    const localDoc = localDocs.find(d => d.id === id);
    if (localDoc) {
      setLocalDocs(prev => prev.filter(d => d.id !== id));
      setLocalTrash(prev => [{ ...localDoc, deletedAt: new Date().toISOString() }, ...prev]);
      // Sincroniza localStorage de propostas
      const stored = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
      localStorage.setItem('gama-proposals', JSON.stringify(stored.filter(d => d.id !== id)));
    }
  }, [dbDocs, localDocs]);

  const handleRestore = useCallback(async (id, e) => {
    e.stopPropagation();

    const dbDoc = dbTrash.find(d => d.id === id);
    if (dbDoc) {
      setDbTrash(prev => prev.filter(d => d.id !== id));
      setDbDocs(prev => [{ ...dbDoc, deletedAt: null }, ...prev]);
      const { error } = await supabase
        .from('reports')
        .update({ deleted_at: null })
        .eq('id', dbDoc._supabaseId);
      if (error) {
        setDbTrash(prev => [dbDoc, ...prev]);
        setDbDocs(prev => prev.filter(d => d.id !== id));
      }
      return;
    }

    const localDoc = localTrash.find(d => d.id === id);
    if (localDoc) {
      setLocalTrash(prev => prev.filter(d => d.id !== id));
      setLocalDocs(prev => [localDoc, ...prev]);
      const stored = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
      localStorage.setItem('gama-proposals', JSON.stringify([localDoc, ...stored]));
    }
  }, [dbTrash, localTrash]);

  const handlePermanentDelete = useCallback(async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Excluir permanentemente? Esta ação não pode ser desfeita.')) return;

    const dbDoc = dbTrash.find(d => d.id === id);
    if (dbDoc) {
      setDbTrash(prev => prev.filter(d => d.id !== id));
      await supabase.from('reports').delete().eq('id', dbDoc._supabaseId);
      return;
    }
    setLocalTrash(prev => prev.filter(d => d.id !== id));
  }, [dbTrash]);

  const handleEmptyTrash = useCallback(async () => {
    if (!window.confirm('Esvaziar lixeira permanentemente?')) return;

    // Deleta todos os DB docs da lixeira
    if (currentUser && dbTrash.length > 0) {
      await supabase
        .from('reports')
        .delete()
        .eq('user_id', currentUser.id)
        .not('deleted_at', 'is', null);
      setDbTrash([]);
    }
    setLocalTrash([]);
  }, [currentUser, dbTrash]);

  // ─── Filtros ──────────────────────────────────────────────────────────────
  const totalTrashValue = useMemo(
    () => trash.reduce((sum, p) => sum + (Number(p.totalInvestment) || 0), 0),
    [trash]
  );

  const filteredDocs = useMemo(() => {
    const list = activeTab === 'active' ? proposals : trash;
    return list.filter(doc => {
      const matchesSearch = searchTerm === '' ||
        doc.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'Todos' || doc.status === selectedStatus;
      const matchesPrice  = (Number(doc.totalInvestment) || 0) >= minPriceFilter;
      return matchesSearch && matchesStatus && matchesPrice;
    });
  }, [proposals, trash, activeTab, searchTerm, selectedStatus, minPriceFilter]);

  const applyPresetFilter = (type) => {
    setMinPriceFilter(type === '10k' ? 10000 : 0);
    setSelectedStatus('Todos');
  };

  // ─── Helpers de UI ────────────────────────────────────────────────────────
  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pendente': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'Assinado': return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'Enviado':  return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      default:         return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex flex-col font-display">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 shadow-[0_0_15px_rgba(196,255,13,0.1)]">
                <span className="material-symbols-outlined text-primary text-2xl">history</span>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight uppercase">Histórico</h1>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gestão de Documentos</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'active' ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Ativos
            </button>
            <button
              onClick={() => setActiveTab('trash')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'trash' ? 'text-red-500 border-red-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Lixeira {trash.length > 0 && <span className="ml-1 opacity-50">({trash.length})</span>}
            </button>
          </div>

          {/* Filtros / Lixeira header */}
          {activeTab === 'active' ? (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1 group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors text-xl">search</span>
                  <input
                    className="w-full bg-white/5 border border-white/10 focus:ring-2 focus:ring-primary focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-slate-600 text-white font-medium"
                    placeholder="Buscar projeto ou cliente..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Link to="/history/filters" className="p-3 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-primary transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">tune</span>
                </Link>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {['Todos', 'Pendente', 'Assinado', 'Enviado'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedStatus(s)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedStatus === s ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-slate-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest mb-1">Impacto de Propostas Perdidas</p>
                <p className="text-xl font-black text-red-500">{formatCurrency(totalTrashValue)}</p>
              </div>
              <button
                onClick={handleEmptyTrash}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-black uppercase rounded-lg border border-red-500/20 transition-all"
              >
                Esvaziar
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-8 mb-24">
        {activeTab === 'active' && (
          <section className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Atalhos</h2>
            <div className="flex gap-3">
              <button
                onClick={() => applyPresetFilter('10k')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all ${minPriceFilter === 10000 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(196,255,13,0.2)]' : 'bg-[#111] border-white/5 text-slate-400'}`}
              >
                <span className="material-symbols-outlined text-lg">payments</span>
                <span className="text-xs font-bold">Acima de R$ 10k</span>
              </button>
              <button
                onClick={() => applyPresetFilter('all')}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-white/5 text-slate-400 rounded-xl"
              >
                <span className="material-symbols-outlined text-lg">refresh</span>
                <span className="text-xs font-bold">Ver Todos</span>
              </button>
            </div>
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            {activeTab === 'active' ? 'Documentos Recentes' : 'Itens Descartados'}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <span className="material-symbols-outlined text-5xl text-slate-700 animate-pulse">history</span>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">carregando histórico...</p>
              </div>
            ) : filteredDocs.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white/5 rounded-2xl border border-dashed border-white/10">
                <span className="material-symbols-outlined text-5xl text-slate-700">
                  {activeTab === 'active' ? 'find_in_page' : 'delete_sweep'}
                </span>
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                  {activeTab === 'active' ? 'Nenhum resultado' : 'Lixeira vazia'}
                </p>
              </div>
            ) : (
              filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => activeTab === 'active' && handleViewDocument(doc)}
                  className={`group relative bg-card-bg border rounded-2xl p-6 shadow-xl transition-all ${activeTab === 'active' ? 'border-white/5 cursor-pointer hover:border-primary/40' : 'border-red-500/10 cursor-default'}`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6 text-left">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest ${doc.type === 'diagnostico' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'}`}>
                          {doc.type === 'diagnostico' ? 'DIAGNÓSTICO' : 'PROPOSTA'}
                        </span>
                        <h3 className={`text-lg font-black uppercase tracking-tight transition-colors ${activeTab === 'active' ? 'text-white group-hover:text-primary' : 'text-slate-500'}`}>
                          {doc.projectName}
                        </h3>
                      </div>
                      <p className="text-sm font-bold text-slate-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">business</span>
                        {doc.clientName}
                      </p>
                      {activeTab === 'trash' && doc.deletedAt && (
                        <p className="text-[9px] font-bold text-red-500/60 uppercase flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">event_busy</span>
                          Deletado em: {new Date(doc.deletedAt).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">
                        {doc.type === 'diagnostico' ? 'Impacto Anual' : 'Investimento'}
                      </p>
                      <p className={`text-xl font-black drop-shadow-[0_0_8px_rgba(196,255,13,0.3)] ${activeTab === 'active' ? 'text-primary' : 'text-slate-600'}`}>
                        {formatCurrency(doc.totalInvestment)}
                      </p>
                      <p className="text-[9px] text-slate-600 uppercase font-bold mt-1 tracking-tighter">{doc.issueDate}</p>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 md:opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                    {activeTab === 'active' ? (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); handleViewDocument(doc); }} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white border border-white/10 shadow-2xl backdrop-blur-md">
                          <span className="material-symbols-outlined text-[20px] block">visibility</span>
                        </button>
                        <button onClick={(e) => handleMoveToTrash(doc.id, e)} className="p-3 bg-white/10 hover:bg-red-500/20 rounded-xl text-white hover:text-red-500 border border-white/10 shadow-2xl backdrop-blur-md">
                          <span className="material-symbols-outlined text-[20px] block">delete</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={(e) => handleRestore(doc.id, e)} className="p-3 bg-emerald-500/20 hover:bg-emerald-500/40 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-2xl backdrop-blur-md">
                          <span className="material-symbols-outlined text-[20px] block">restore_from_trash</span>
                        </button>
                        <button onClick={(e) => handlePermanentDelete(doc.id, e)} className="p-3 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-400 border border-red-500/20 shadow-2xl backdrop-blur-md">
                          <span className="material-symbols-outlined text-[20px] block">delete_forever</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HistoryWithSavedFilters;
