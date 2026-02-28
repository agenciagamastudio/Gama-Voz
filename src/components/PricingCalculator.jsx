import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProposal } from '../context/ProposalContext';
import { useToast } from '../context/ToastContext';
import { usePoints } from '../context/PointsContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../utils/supabase';

function PricingCalculator() {
  const navigate = useNavigate();
  const { updateProposalData } = useProposal();
  const { addToast } = useToast();
  const { spendPoints } = usePoints();
  const { currentUser } = useAuth();

  const userSettings = JSON.parse(localStorage.getItem('gama-user-settings') || '{}');

  const initialFormState = {
    clientName: '',
    projectName: '',
    clientCompany: '',
    clientContact: '',
    selectedComplexity: 'Baixa',
    features: [
      { id: 1, title: 'Autenticação OAuth2', hours: 16 },
      { id: 2, title: 'Dashboard Administrativo', hours: 40 },
    ],
    taxesPercentage: userSettings.defaultTax || 15,
    discountPercentage: userSettings.defaultDiscount || 5,
    customHourlyRate: '',
  };

  const [formState, setFormState] = useState(() => {
    const savedState = localStorage.getItem('pricingCalculatorForm');
    return savedState ? JSON.parse(savedState) : initialFormState;
  });

  const [savedCompanies, setSavedCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [newCompanyData, setNewCompanyData] = useState({ name: '', rate: '' });

  // ─── Carregar empresas salvas ─────────────────────────────────────────────
  useEffect(() => {
    if (!currentUser) {
      const saved = localStorage.getItem('gama-saved-companies');
      setSavedCompanies(saved ? JSON.parse(saved) : []);
      return;
    }

    const load = async () => {
      const { data, error } = await supabase
        .from('saved_companies')
        .select('id, name, hourly_rate')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setSavedCompanies(data.map(c => ({ id: c.id, name: c.name, rate: String(c.hourly_rate) })));
      }
    };

    load();
  }, [currentUser]);

  // ─── Persiste form no localStorage (cache de sessão) ──────────────────────
  useEffect(() => {
    localStorage.setItem('pricingCalculatorForm', JSON.stringify(formState));
  }, [formState]);

  // ─── Sync localStorage para usuários não logados ──────────────────────────
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('gama-saved-companies', JSON.stringify(savedCompanies));
    }
  }, [savedCompanies, currentUser]);

  // ─── CRUD Empresas ────────────────────────────────────────────────────────
  const handleSaveNewCompany = useCallback(async () => {
    if (!newCompanyData.name || !newCompanyData.rate) {
      addToast('Preencha o nome e a taxa da empresa.', 'error');
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimistic = { id: tempId, name: newCompanyData.name, rate: newCompanyData.rate };
    setSavedCompanies(prev => [...prev.filter(c => c.name !== optimistic.name), optimistic]);
    setNewCompanyData({ name: '', rate: '' });

    if (!currentUser) return; // localStorage sync via efeito

    const { data, error } = await supabase
      .from('saved_companies')
      .insert({ user_id: currentUser.id, name: optimistic.name, hourly_rate: parseFloat(optimistic.rate) })
      .select('id')
      .single();

    if (error) {
      setSavedCompanies(prev => prev.filter(c => c.id !== tempId));
      setNewCompanyData({ name: optimistic.name, rate: optimistic.rate });
      addToast('Erro ao salvar empresa.', 'error');
    } else {
      setSavedCompanies(prev => prev.map(c => c.id === tempId ? { ...c, id: data.id } : c));
    }
  }, [newCompanyData, currentUser, addToast]);

  const handleUpdateCompany = useCallback(async () => {
    if (!editingCompany.name || !editingCompany.rate) return;

    const prevCompany = savedCompanies[editingCompany.index];
    const updated = { id: prevCompany.id, name: editingCompany.name, rate: editingCompany.rate };

    setSavedCompanies(prev => {
      const next = [...prev];
      next[editingCompany.index] = updated;
      return next;
    });
    setEditingCompany(null);
    addToast('Empresa atualizada!', 'success');

    if (!currentUser || !prevCompany.id || String(prevCompany.id).startsWith('temp-')) return;

    const { error } = await supabase
      .from('saved_companies')
      .update({ name: updated.name, hourly_rate: parseFloat(updated.rate) })
      .eq('id', prevCompany.id);

    if (error) {
      setSavedCompanies(prev => {
        const next = [...prev];
        next[editingCompany.index] = prevCompany;
        return next;
      });
      addToast('Erro ao atualizar empresa.', 'error');
    }
  }, [editingCompany, savedCompanies, currentUser, addToast]);

  const handleDeleteCompany = useCallback(async (index) => {
    if (!window.confirm('Excluir esta empresa?')) return;

    const company = savedCompanies[index];
    setSavedCompanies(prev => prev.filter((_, i) => i !== index));

    if (!currentUser || !company.id || String(company.id).startsWith('temp-')) {
      addToast('Empresa removida.', 'success');
      return;
    }

    const { error } = await supabase
      .from('saved_companies')
      .delete()
      .eq('id', company.id);

    if (error) {
      setSavedCompanies(prev => {
        const restored = [...prev];
        restored.splice(index, 0, company);
        return restored;
      });
      addToast('Erro ao remover empresa.', 'error');
    } else {
      addToast('Empresa removida.', 'success');
    }
  }, [savedCompanies, currentUser, addToast]);

  const handleSelectCompany = useCallback((company) => {
    setFormState(prev => ({ ...prev, clientCompany: company.name, customHourlyRate: company.rate }));
    addToast(`Taxa de ${company.name} aplicada!`, 'success');
  }, [addToast]);

  // ─── Cálculos ─────────────────────────────────────────────────────────────
  const hourlyRates = {
    'Baixa': 120,
    'Média': 180,
    'Alta': 250,
  };

  const complexityDescriptions = {
    'Baixa': 'Ideal para landing pages ou CRUDs simples. Taxa horária base: R$ 120,00/h.',
    'Média': 'Para aplicações com lógica de negócio moderada e integrações. Taxa horária base: R$ 180,00/h.',
    'Alta': 'Projetos complexos com IA, blockchain ou alta performance. Taxa horária base: R$ 250,00/h.',
  };

  const currentHourlyRate = useMemo(() => {
    const parsedCustomRate = parseFloat(formState.customHourlyRate);
    if (!isNaN(parsedCustomRate) && parsedCustomRate > 0) return parsedCustomRate;
    return hourlyRates[formState.selectedComplexity];
  }, [formState.selectedComplexity, formState.customHourlyRate]);

  const handleFeatureChange = (id, field, value) => {
    setFormState(prev => ({
      ...prev,
      features: prev.features.map(f => f.id === id ? { ...f, [field]: value } : f),
    }));
  };

  const addFeature = () => {
    const newId = formState.features.length ? Math.max(...formState.features.map(f => f.id)) + 1 : 1;
    setFormState(prev => ({ ...prev, features: [...prev.features, { id: newId, title: '', hours: 0 }] }));
  };

  const removeFeature = (id) => {
    setFormState(prev => ({ ...prev, features: prev.features.filter(f => f.id !== id) }));
  };

  const totalHours     = useMemo(() => formState.features.reduce((sum, f) => sum + Number(f.hours), 0), [formState.features]);
  const subtotal       = useMemo(() => formState.features.reduce((sum, f) => sum + (Number(f.hours) * currentHourlyRate), 0), [formState.features, currentHourlyRate]);
  const taxesAmount    = useMemo(() => subtotal * (formState.taxesPercentage / 100), [subtotal, formState.taxesPercentage]);
  const totalWithTaxes = useMemo(() => subtotal + taxesAmount, [subtotal, taxesAmount]);
  const discountAmount = useMemo(() => totalWithTaxes * (formState.discountPercentage / 100), [totalWithTaxes, formState.discountPercentage]);
  const totalInvestment = useMemo(() => totalWithTaxes - discountAmount, [totalWithTaxes, discountAmount]);

  const formatCurrency = (value) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  // ─── Gerar Proposta ───────────────────────────────────────────────────────
  const handleGenerateProposal = async () => {
    if (!formState.clientName || !formState.clientCompany || !formState.projectName) {
      addToast('Por favor, preencha as informações do projeto (Cliente, Empresa e Nome do Projeto).', 'error');
      return;
    }

    if (formState.features.length === 0 || formState.features.some(f => !f.title || f.hours <= 0)) {
      addToast('Adicione pelo menos uma funcionalidade válida com título e horas maiores que zero.', 'error');
      return;
    }

    if (!window.confirm('Tem certeza que deseja gerar esta proposta? Isso consumirá 10 pontos.')) return;

    if (!spendPoints(10, 'Geração de Proposta')) return;

    const matchedCompany = savedCompanies.find(c => c.rate === formState.customHourlyRate);
    const myCompany = matchedCompany ? matchedCompany.name : 'Gama Calc';
    const proposalNumber = `PROP-${Math.floor(Math.random() * 10000)}`;

    const proposalData = {
      clientName: formState.clientName,
      clientCompany: formState.clientCompany,
      clientContact: formState.clientContact,
      myCompany,
      projectName: formState.projectName,
      proposalId: proposalNumber,
      issueDate: new Date().toLocaleDateString('pt-BR'),
      validUntilDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      summary: 'Esta proposta apresenta o detalhamento técnico e comercial para o desenvolvimento do projeto supramencionado. Nossa abordagem foca em escalabilidade, segurança e experiência do usuário (UX), utilizando as tecnologias mais modernas do mercado para garantir um produto final de alta performance e fácil manutenção.',
      complexity: formState.selectedComplexity,
      hourlyRate: currentHourlyRate,
      features: formState.features.map(f => ({ ...f, cost: f.hours * currentHourlyRate })),
      subtotal,
      taxesPercentage: formState.taxesPercentage,
      taxesAmount,
      discountPercentage: formState.discountPercentage,
      discountAmount,
      totalInvestment,
    };

    if (currentUser) {
      const complexityMap = { 'Baixa': 'baixa', 'Média': 'media', 'Alta': 'alta' };
      const todayISO      = new Date().toISOString().split('T')[0];
      const validUntilISO = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const { data: proposalRow, error: proposalError } = await supabase
        .from('proposals')
        .insert({
          user_id:             currentUser.id,
          proposal_number:     proposalNumber,
          my_company:          myCompany,
          client_name:         formState.clientName,
          client_company:      formState.clientCompany,
          client_contact:      formState.clientContact,
          project_name:        formState.projectName,
          summary:             proposalData.summary,
          issue_date:          todayISO,
          valid_until_date:    validUntilISO,
          complexity:          complexityMap[formState.selectedComplexity] || 'baixa',
          hourly_rate:         currentHourlyRate,
          subtotal,
          taxes_percentage:    formState.taxesPercentage,
          taxes_amount:        taxesAmount,
          discount_percentage: formState.discountPercentage,
          discount_amount:     discountAmount,
          total_investment:    totalInvestment,
          status:              'draft',
        })
        .select('id')
        .single();

      if (!proposalError && proposalRow) {
        const featureRows = formState.features.map((f, i) => ({
          proposal_id: proposalRow.id,
          title:       f.title,
          hours:       Number(f.hours),
          cost:        Number(f.hours) * currentHourlyRate,
          position:    i,
        }));
        await supabase.from('proposal_features').insert(featureRows);
      }
      // Se falhar no Supabase, a proposta ainda vai pro preview — sem perda de dado para o usuário
    } else {
      // Fallback para usuários não logados
      const existing = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
      localStorage.setItem('gama-proposals', JSON.stringify([
        { ...proposalData, id: proposalNumber, type: 'proposta' },
        ...existing,
      ]));
    }

    updateProposalData(proposalData);
    addToast('Proposta gerada com sucesso!', 'success');
    navigate('/proposal/preview');
  };

  const handleClearForm = () => {
    if (window.confirm('Limpar todos os dados da calculadora?')) {
      localStorage.removeItem('pricingCalculatorForm');
      setFormState(initialFormState);
    }
  };

  return (
    <>
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-40">
        <div className="max-w-2xl mx-auto p-4 space-y-8">
          {/* Project Info Section */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">folder_open</span>
              <h2 className="text-lg font-bold text-white">Project Information</h2>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="clientName" className="text-sm font-semibold text-slate-400">Nome do Cliente</label>
                <input
                  id="clientName"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
                  placeholder="Digite o nome do contato"
                  type="text"
                  value={formState.clientName}
                  onChange={(e) => setFormState(prev => ({ ...prev, clientName: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="clientCompany" className="text-sm font-semibold text-slate-400">Empresa do Cliente</label>
                <input
                  id="clientCompany"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
                  placeholder="Digite o nome da empresa do cliente"
                  type="text"
                  value={formState.clientCompany}
                  onChange={(e) => setFormState(prev => ({ ...prev, clientCompany: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="clientContact" className="text-sm font-semibold text-slate-400">Contato (Cargo/Nome)</label>
                <input
                  id="clientContact"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
                  placeholder="Ex: Ricardo Almeida - CTO"
                  type="text"
                  value={formState.clientContact}
                  onChange={(e) => setFormState(prev => ({ ...prev, clientContact: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="projectName" className="text-sm font-semibold text-slate-400">Nome do Projeto</label>
                <input
                  id="projectName"
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary outline-none text-white placeholder:text-slate-600"
                  placeholder="Digite o nome do projeto"
                  type="text"
                  value={formState.projectName}
                  onChange={(e) => setFormState(prev => ({ ...prev, projectName: e.target.value }))}
                />
              </div>
            </div>
          </section>

          {/* Complexity Selection */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              <h2 className="text-lg font-bold text-white">Complexity &amp; Seniority</h2>
            </div>
            <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex p-1 bg-white/5 rounded-lg">
                {['Baixa', 'Média', 'Alta'].map((complexityOption) => (
                  <button
                    key={complexityOption}
                    onClick={() => setFormState(prev => ({ ...prev, selectedComplexity: complexityOption }))}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                      formState.selectedComplexity === complexityOption
                        ? 'flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 neon-glow-hover'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {complexityOption}
                  </button>
                ))}
              </div>
              <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <span className="material-symbols-outlined text-primary mt-1">info</span>
                <div>
                  <p className="text-sm font-medium text-slate-300">{complexityDescriptions[formState.selectedComplexity]}</p>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Taxa Horária Padrão:</span>
                    <span className="text-lg font-bold text-primary">{formatCurrency(hourlyRates[formState.selectedComplexity])}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Custom Hourly Rate Selection & Management */}
            <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-1.5 w-full">
                        <label htmlFor="customHourlyRate" className="text-sm font-semibold text-slate-400">Taxa Horária Personalizada (R$):</label>
                        <input
                            id="customHourlyRate"
                            type="number"
                            value={formState.customHourlyRate}
                            onChange={(e) => setFormState(prev => ({ ...prev, customHourlyRate: e.target.value }))}
                            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0a0a0a] focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600"
                            placeholder={formatCurrency(hourlyRates[formState.selectedComplexity])}
                            min="0"
                        />
                    </div>
                    <button
                        onClick={() => { setEditingCompany(null); setIsModalOpen(true); }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-lg hover:bg-primary/20 transition-all border border-primary/20 h-[46px]"
                    >
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        Gerenciar Empresas
                    </button>
                </div>

                {savedCompanies.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Atalhos de Taxas</label>
                        <div className="flex flex-wrap gap-2">
                            {savedCompanies.map((company, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSelectCompany(company)}
                                    className="px-3 py-1.5 text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 rounded-full hover:border-primary/50 hover:text-primary transition-all"
                                >
                                    {company.name} ({formatCurrency(company.rate)}/h)
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Flutuante para Gestão de Empresas */}
            {isModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="bg-[#111] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">business</span>
                      {editingCompany ? 'Editar Empresa' : 'Gerenciar Empresas'}
                    </h3>
                    <button onClick={() => { setIsModalOpen(false); setEditingCompany(null); }} className="text-slate-500 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Form para Adicionar/Editar */}
                    <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">Nome da Empresa</label>
                        <input
                          type="text"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary"
                          value={editingCompany ? editingCompany.name : newCompanyData.name}
                          onChange={(e) => editingCompany
                            ? setEditingCompany({...editingCompany, name: e.target.value})
                            : setNewCompanyData({...newCompanyData, name: e.target.value})
                          }
                          placeholder="Ex: Minha Agência"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase">Taxa Horária (R$)</label>
                        <input
                          type="number"
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-primary"
                          value={editingCompany ? editingCompany.rate : newCompanyData.rate}
                          onChange={(e) => editingCompany
                            ? setEditingCompany({...editingCompany, rate: e.target.value})
                            : setNewCompanyData({...newCompanyData, rate: e.target.value})
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <button
                        onClick={editingCompany ? handleUpdateCompany : handleSaveNewCompany}
                        className="w-full py-2 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all"
                      >
                        {editingCompany ? 'Salvar Alterações' : 'Adicionar Empresa'}
                      </button>
                    </div>

                    {/* Lista de Empresas Salvas */}
                    {!editingCompany && savedCompanies.length > 0 && (
                      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Empresas Cadastradas</label>
                        {savedCompanies.map((company, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 group">
                            <div>
                              <p className="text-sm font-bold text-white">{company.name}</p>
                              <p className="text-xs text-primary">{formatCurrency(company.rate)}/h</p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => setEditingCompany({ ...company, index })}
                                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteCompany(index)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-md transition-all"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Main Calculation Area */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">list_alt</span>
                <h2 className="text-lg font-bold text-white">Funcionalidades</h2>
              </div>
              <button
                onClick={addFeature}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 neon-glow-hover">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Adicionar Funcionalidade
              </button>
            </div>
            <div className="space-y-3">
              {formState.features.map((feature) => (
                <div key={feature.id} className="group relative bg-card-bg border border-white/5 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-all">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                      <input
                        id={`feature-title-${feature.id}`}
                        className="w-full text-sm font-semibold text-white border-none focus:ring-0 p-0 placeholder:text-slate-600 bg-transparent"
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                        placeholder="Título da Feature"
                      />
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="text-xs font-bold text-slate-500 uppercase">Horas</span>
                        <input
                          id={`feature-hours-${feature.id}`}
                          className="w-full text-sm font-semibold text-white border-none focus:ring-0 p-0 placeholder:text-slate-600 bg-transparent"
                          type="number"
                          value={feature.hours}
                          onChange={(e) => handleFeatureChange(feature.id, 'hours', e.target.value)}
                        />
                      </div>
                      <div className="text-right min-w-[100px]">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">Custo</span>
                        <span className="text-sm font-bold text-white tracking-tight">{formatCurrency(feature.hours * currentHourlyRate)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 text-red-600 p-1 rounded-full border border-red-200 shadow-sm flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Financial Summary (Sticky Footer) */}
      <footer className="fixed bottom-[64px] md:bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 z-[110] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto p-4 md:px-8">
          <div className="hidden md:grid grid-cols-4 gap-4 mb-4">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Hours</p>
              <p className="text-base font-bold text-white">{totalHours}h <span className="text-[10px] text-slate-500 font-normal">est.</span></p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Subtotal</p>
              <p className="text-base font-bold text-white">{formatCurrency(subtotal)}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Imposto (%)</label>
              <div className="flex items-center gap-1 border border-white/10 rounded px-2 py-0.5 w-max bg-white/5">
                <input
                  className="w-6 text-xs font-bold border-none p-0 focus:ring-0 bg-transparent text-white"
                  type="number"
                  value={formState.taxesPercentage}
                  onChange={(e) => setFormState(prev => ({ ...prev, taxesPercentage: Number(e.target.value) }))}
                />
                <span className="text-[10px] text-slate-500">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Desconto (%)</label>
              <div className="flex items-center gap-1 border border-white/10 rounded px-2 py-0.5 w-max bg-white/5">
                <input
                  className="w-6 text-xs font-bold border-none p-0 focus:ring-0 bg-transparent text-white"
                  type="number"
                  value={formState.discountPercentage}
                  onChange={(e) => setFormState(prev => ({ ...prev, discountPercentage: Number(e.target.value) }))}
                />
                <span className="text-[10px] text-slate-500">%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 md:pt-4 md:border-t md:border-white/5">
            <div className="flex flex-col">
              <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Total</p>
              <p className="text-xl md:text-2xl font-black text-primary tracking-tight drop-shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.3)]">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClearForm}
                className="p-2.5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/5 transition-all"
                title="Limpar"
              >
                <span className="material-symbols-outlined text-[20px] block">restart_alt</span>
              </button>
              <button
                onClick={handleGenerateProposal}
                className="px-6 py-3 bg-primary text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/40 transition-all active:scale-[0.95] neon-glow">
                Gerar Proposta
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PricingCalculator;
