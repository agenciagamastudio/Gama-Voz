import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { useProposal } from '../context/ProposalContext'; // Import useProposal

function PricingCalculator() {
  const navigate = useNavigate();
  const { updateProposalData } = useProposal();

  // Initial form state (default values)
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
    taxesPercentage: 15,
    discountPercentage: 5,
    customHourlyRate: '',
  };

  const [formState, setFormState] = useState(() => {
    // Load from sessionStorage on initial render
    const savedState = sessionStorage.getItem('pricingCalculatorForm');
    return savedState ? JSON.parse(savedState) : initialFormState;
  });

  const [savedCompanies, setSavedCompanies] = useState(() => {
    const saved = localStorage.getItem('gama-saved-companies');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null); // { index, name, rate }
  const [newCompanyData, setNewCompanyData] = useState({ name: '', rate: '' });

  // Save to sessionStorage whenever formState changes
  useEffect(() => {
    sessionStorage.setItem('pricingCalculatorForm', JSON.stringify(formState));
  }, [formState]);

  // Save companies to localStorage
  useEffect(() => {
    localStorage.setItem('gama-saved-companies', JSON.stringify(savedCompanies));
  }, [savedCompanies]);

  const handleSaveNewCompany = () => {
    if (!newCompanyData.name || !newCompanyData.rate) {
      alert('Preencha o nome e a taxa da empresa.');
      return;
    }

    setSavedCompanies(prev => {
      const filtered = prev.filter(c => c.name !== newCompanyData.name);
      return [...filtered, { name: newCompanyData.name, rate: newCompanyData.rate }];
    });
    setNewCompanyData({ name: '', rate: '' });
    // Mantém o modal aberto para continuar gerenciando
  };

  const handleUpdateCompany = () => {
    if (!editingCompany.name || !editingCompany.rate) return;
    
    setSavedCompanies(prev => {
      const updated = [...prev];
      updated[editingCompany.index] = { name: editingCompany.name, rate: editingCompany.rate };
      return updated;
    });
    setEditingCompany(null); // Volta para a lista de gestão no modal
    // Mantém o modal aberto
  };

  const handleDeleteCompany = (index) => {
    if (window.confirm('Excluir esta empresa?')) {
      setSavedCompanies(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSelectCompany = (company) => {
    setFormState(prev => ({
      ...prev,
      customHourlyRate: company.rate
    }));
  };

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
    if (!isNaN(parsedCustomRate) && parsedCustomRate > 0) {
        return parsedCustomRate;
    }
    return hourlyRates[formState.selectedComplexity];
  }, [formState.selectedComplexity, formState.customHourlyRate]);

  const handleFeatureChange = (id, field, value) => {
    setFormState(prevFormState => ({
        ...prevFormState,
        features: prevFormState.features.map(feature =>
            feature.id === id ? { ...feature, [field]: value } : feature
        )
    }));
  };

  const addFeature = () => {
    const newId = formState.features.length ? Math.max(...formState.features.map(f => f.id)) + 1 : 1;
    setFormState(prevFormState => ({
        ...prevFormState,
        features: [...prevFormState.features, { id: newId, title: '', hours: 0 }]
    }));
  };

  const removeFeature = (id) => {
    setFormState(prevFormState => ({
        ...prevFormState,
        features: prevFormState.features.filter(feature => feature.id !== id)
    }));
  };

  const totalHours = useMemo(() => {
    return formState.features.reduce((sum, feature) => sum + Number(feature.hours), 0);
  }, [formState.features]);

  const subtotal = useMemo(() => {
    return formState.features.reduce((sum, feature) => sum + (Number(feature.hours) * currentHourlyRate), 0);
  }, [formState.features, currentHourlyRate]);

  const taxesAmount = useMemo(() => {
    return subtotal * (formState.taxesPercentage / 100);
  }, [subtotal, formState.taxesPercentage]);

  const totalWithTaxes = useMemo(() => {
    return subtotal + taxesAmount;
  }, [subtotal, taxesAmount]);

  const discountAmount = useMemo(() => {
    return totalWithTaxes * (formState.discountPercentage / 100);
  }, [totalWithTaxes, formState.discountPercentage]);

  const totalInvestment = useMemo(() => {
    return totalWithTaxes - discountAmount;
  }, [totalWithTaxes, discountAmount]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleGenerateProposal = () => {
    // Busca o nome da empresa correspondente à taxa horária atual
    const matchedCompany = savedCompanies.find(c => c.rate === formState.customHourlyRate);
    const myCompany = matchedCompany ? matchedCompany.name : "Gama Calc";

    const proposalData = {
      clientName: formState.clientName,
      clientCompany: formState.clientCompany,
      clientContact: formState.clientContact,
      myCompany: myCompany, // Sua empresa (quem está enviando a proposta)
      projectName: formState.projectName,
      proposalId: `PROP-${Math.floor(Math.random() * 10000)}`, // Simple random ID
      issueDate: new Date().toLocaleDateString('pt-BR'),
      validUntilDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'), // 15 days from now
      summary: 'Esta proposta apresenta o detalhamento técnico e comercial para o desenvolvimento do projeto supramencionado. Nossa abordagem foca em escalabilidade, segurança e experiência do usuário (UX), utilizando as tecnologias mais modernas do mercado para garantir um produto final de alta performance e fácil manutenção.', // Static summary for now
      complexity: formState.selectedComplexity,
      hourlyRate: currentHourlyRate,
      features: formState.features.map(f => ({ ...f, cost: f.hours * currentHourlyRate })), // Add calculated cost to features
      subtotal,
      taxesPercentage: formState.taxesPercentage,
      taxesAmount,
      discountPercentage: formState.discountPercentage,
      discountAmount,
      totalInvestment,
    };
    updateProposalData(proposalData);

    // Save proposal to localStorage for history
    const existingProposals = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
    // Add a unique ID if not already present (for dummy data, it's there)
    const proposalToSave = { ...proposalData, id: proposalData.proposalId || `PROP-${Date.now()}` };
    const updatedProposals = [...existingProposals, proposalToSave];
    localStorage.setItem('gama-proposals', JSON.stringify(updatedProposals));

    navigate('/proposal/preview');
  };

  const handleClearForm = () => {
    setFormState(initialFormState);
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
            </div> {/* Closing the bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 div */}
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
                        placeholder="Título da Feature" // Added placeholder for consistency
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
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 custom-shadow z-50">
        <div className="max-w-4xl mx-auto p-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Hours</p>
              <p className="text-base font-bold text-white">{totalHours}h <span className="text-xs text-slate-400 font-normal">estimadas</span></p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</p>
              <p className="text-base font-bold text-white">{formatCurrency(subtotal)}</p>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Taxa de Imposto (%)</label>
              <div className="flex items-center gap-1 border border-white/10 rounded px-2 py-0.5 w-max bg-white/5">
                <input
                  className="w-6 text-xs font-bold border-none p-0 focus:ring-0 bg-transparent text-white"
                  type="number"
                  value={formState.taxesPercentage}
                  onChange={(e) => setFormState(prev => ({ ...prev, taxesPercentage: Number(e.target.value) }))}
                />
                <span className="text-[10px] text-slate-400">%</span>
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
                <span className="text-[10px] text-slate-400">%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Total Investment</p>
              <p className="text-2xl font-black text-primary tracking-tight drop-shadow-[0_0_10px_rgba(196,255,13,0.3)]">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button onClick={handleClearForm} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-white/10 rounded-lg text-slate-400 font-bold hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                Clear
              </button>
              <button
                onClick={handleGenerateProposal}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-primary text-black rounded-lg font-bold hover:bg-primary/90 shadow-lg shadow-primary/40 transition-all transform active:scale-[0.98] neon-glow">
                <span className="material-symbols-outlined text-[20px]">description</span>
                Generate Proposal
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default PricingCalculator;