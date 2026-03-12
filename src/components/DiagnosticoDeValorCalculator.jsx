// src/components/DiagnosticoDeValorCalculator.jsx
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CargoSalarioManager from './CargoSalarioManager';
import { useValueReport } from '../context/ValueReportContext';
import { usePoints } from '../context/PointsContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../utils/supabase';
import { suggestMonthlyRevenue } from '../utils/marketData';
import {
    calculateCompanyHourlyValue,
    calculateScenarioLoss,
    calculateTotalAnnualLoss,
    calculateSolutionROI,
    formatCurrency,
    convertToHours,
    isPositiveNumber
} from '../logic/calculosDeValor';

function DiagnosticoDeValorCalculator() {
    const navigate = useNavigate();
    const { updateReportData } = useValueReport();
    const { spendPoints } = usePoints();
    const { currentUser } = useAuth();
    const { addToast } = useToast();

    // Supabase: ID do draft atual e estado de salvamento
    const [diagnosticId, setDiagnosticId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimerRef = useRef(null);
    const draftLoadedRef = useRef(false);

    // ─── Estados de Formulário (localStorage como cache de sessão rápido) ─────
    const [nomeCliente, setNomeCliente] = useState(() => localStorage.getItem('diag-nome') || '');
    const [descricaoNegocio, setDescricaoNegocio] = useState(() => localStorage.getItem('diag-desc') || '');
    const [nichoMercado, setNichoMercado] = useState(() => localStorage.getItem('diag-nicho') || '');
    const [faturamentoMensal, setFaturamentoMensal] = useState(() => localStorage.getItem('diag-faturamento') || '');
    const [isSearchingRevenue, setIsSearchingRevenue] = useState(false);
    const [diasTrabalhadosMes, setDiasTrabalhadosMes] = useState(() => localStorage.getItem('diag-dias') || '22');
    const [horasTrabalhadasDia, setHorasTrabalhadasDia] = useState(() => localStorage.getItem('diag-horas') || '8');
    const [valorHoraEmpresa, setValorHoraEmpresa] = useState(0);

    const [scenarios, setScenarios] = useState(() => {
        const saved = localStorage.getItem('diag-scenarios');
        return saved ? JSON.parse(saved) : [];
    });
    const [nextScenarioId, setNextScenarioId] = useState(() => {
        const saved = localStorage.getItem('diag-next-id');
        return saved ? parseInt(saved) : 1;
    });
    const [customRoles, setCustomRoles] = useState([]);

    const [custoTotalAnualPerdas, setCustoTotalAnualPerdas] = useState(0);
    const [descricaoSolucao, setDescricaoSolucao] = useState(() => localStorage.getItem('diag-sol-desc') || '');
    const [custoSolucao, setCustoSolucao] = useState(() => localStorage.getItem('diag-sol-custo') || '');
    const [economiaMensalFinanceira, setEconomiaMensalFinanceira] = useState(0);
    const [roiMeses, setRoiMeses] = useState(0);

    // Ref sempre atualizada com os dados mais recentes (evita stale closure no auto-save)
    const latestDataRef = useRef({});
    latestDataRef.current = {
        nomeCliente, descricaoNegocio, nichoMercado, faturamentoMensal,
        diasTrabalhadosMes, horasTrabalhadasDia, descricaoSolucao, custoSolucao,
        custoTotalAnualPerdas, economiaMensalFinanceira, roiMeses, scenarios
    };

    // ─── Carregar draft do Supabase na montagem ────────────────────────────────
    useEffect(() => {
        if (!currentUser || draftLoadedRef.current) return;
        draftLoadedRef.current = true;

        const loadDraft = async () => {
            const { data } = await supabase
                .from('diagnostics')
                .select('*, diagnostic_scenarios(*)')
                .eq('user_id', currentUser.id)
                .eq('status', 'draft')
                .order('updated_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (!data) return;

            setDiagnosticId(data.id);

            // Só sobrescreve estado local se o draft do banco tiver dados diferentes
            if (data.client_name) setNomeCliente(data.client_name);
            if (data.business_description) setDescricaoNegocio(data.business_description);
            if (data.market_niche) setNichoMercado(data.market_niche);
            if (data.monthly_revenue) setFaturamentoMensal(data.monthly_revenue.toString());
            if (data.working_days_per_month) setDiasTrabalhadosMes(data.working_days_per_month.toString());
            if (data.working_hours_per_day) setHorasTrabalhadasDia(data.working_hours_per_day.toString());
            if (data.solution_description) setDescricaoSolucao(data.solution_description);
            if (data.solution_cost) setCustoSolucao(data.solution_cost.toString());

            if (data.diagnostic_scenarios?.length > 0) {
                const loaded = data.diagnostic_scenarios.map((s, idx) => ({
                    id: idx + 1,
                    descricao: s.description,
                    papelCargo: s.role_name,
                    custoHoraEnvolvido: parseFloat(s.hourly_rate) || 0,
                    unidadeTempo: s.time_unit,
                    tempoPerdidoOcorrencia: s.time_lost_per_occurrence?.toString() || '',
                    frequencia: s.frequency,
                    numeroPessoasOcorrencias: s.number_of_people?.toString() || '1',
                    isCovered: s.is_covered,
                    perdaCalculada: {
                        semanal: parseFloat(s.weekly_loss) || 0,
                        mensal: parseFloat(s.monthly_loss) || 0,
                        anual: parseFloat(s.annual_loss) || 0,
                    }
                }));
                setScenarios(loaded);
                setNextScenarioId(loaded.length + 1);
            }
        };

        loadDraft();
    }, [currentUser]);

    // ─── Auto-save draft para Supabase (debounced 1.5s) ──────────────────────
    const saveDraftToSupabase = useCallback(async () => {
        if (!currentUser) return;
        const d = latestDataRef.current;
        if (!d.nomeCliente.trim()) return; // precisa de nome mínimo para salvar

        setIsSaving(true);
        try {
            const payload = {
                user_id: currentUser.id,
                status: 'draft',
                client_name: d.nomeCliente,
                business_description: d.business_description || d.descricaoNegocio,
                market_niche: d.nichoMercado,
                monthly_revenue: parseFloat(d.faturamentoMensal) || null,
                working_days_per_month: parseInt(d.diasTrabalhadosMes) || 22,
                working_hours_per_day: parseInt(d.horasTrabalhadasDia) || 8,
                solution_description: d.descricaoSolucao,
                solution_cost: parseFloat(d.custoSolucao) || null,
                total_annual_loss: d.custoTotalAnualPerdas || 0,
                monthly_savings: d.economiaMensalFinanceira || 0,
                roi_months: d.roiMeses || null,
            };

            let currentId = diagnosticId;
            if (currentId) {
                await supabase.from('diagnostics').update(payload).eq('id', currentId);
            } else {
                const { data } = await supabase
                    .from('diagnostics')
                    .insert(payload)
                    .select('id')
                    .single();
                if (data?.id) {
                    currentId = data.id;
                    setDiagnosticId(data.id);
                }
            }
        } catch (err) {
            console.error('Erro ao salvar rascunho:', err);
        } finally {
            setIsSaving(false);
        }
    }, [currentUser, diagnosticId]);

    // ─── Persistência local (cache de sessão) + agendamento de auto-save ──────
    useEffect(() => {
        localStorage.setItem('diag-nome', nomeCliente);
        localStorage.setItem('diag-desc', descricaoNegocio);
        localStorage.setItem('diag-nicho', nichoMercado);
        localStorage.setItem('diag-faturamento', faturamentoMensal);
        localStorage.setItem('diag-dias', diasTrabalhadosMes);
        localStorage.setItem('diag-horas', horasTrabalhadasDia);
        localStorage.setItem('diag-scenarios', JSON.stringify(scenarios));
        localStorage.setItem('diag-next-id', nextScenarioId.toString());
        localStorage.setItem('diag-sol-desc', descricaoSolucao);
        localStorage.setItem('diag-sol-custo', custoSolucao);

        // Debounce: agenda auto-save no Supabase 1.5s após última mudança
        if (currentUser && nomeCliente.trim()) {
            clearTimeout(saveTimerRef.current);
            saveTimerRef.current = setTimeout(saveDraftToSupabase, 1500);
        }

        return () => clearTimeout(saveTimerRef.current);
    }, [
        nomeCliente, descricaoNegocio, nichoMercado, faturamentoMensal,
        diasTrabalhadosMes, horasTrabalhadasDia, scenarios, nextScenarioId,
        descricaoSolucao, custoSolucao, currentUser, saveDraftToSupabase
    ]);

    // ─── Cálculos derivados ────────────────────────────────────────────────────
    useEffect(() => {
        const fmNum = parseFloat(faturamentoMensal);
        const dtmNum = parseFloat(diasTrabalhadosMes);
        const htdNum = parseFloat(horasTrabalhadasDia);
        if (isPositiveNumber(fmNum) && isPositiveNumber(dtmNum) && isPositiveNumber(htdNum)) {
            setValorHoraEmpresa(calculateCompanyHourlyValue(fmNum, dtmNum, htdNum));
        } else {
            setValorHoraEmpresa(0);
        }
    }, [faturamentoMensal, diasTrabalhadosMes, horasTrabalhadasDia]);

    useEffect(() => {
        setCustoTotalAnualPerdas(calculateTotalAnnualLoss(scenarios));
    }, [scenarios]);

    useEffect(() => {
        const totalMensalEconomizado = scenarios
            .filter(s => s.isCovered)
            .reduce((sum, s) => sum + s.perdaCalculada.mensal, 0);

        setEconomiaMensalFinanceira(totalMensalEconomizado);

        const csNum = parseFloat(custoSolucao);
        if (isPositiveNumber(csNum) && totalMensalEconomizado > 0) {
            setRoiMeses(calculateSolutionROI(csNum, totalMensalEconomizado));
        } else {
            setRoiMeses(0);
        }
    }, [scenarios, custoSolucao]);

    const percentageRecovered = useMemo(() => {
        const totalMensal = scenarios.reduce((sum, s) => sum + s.perdaCalculada.mensal, 0);
        if (totalMensal === 0) return 0;
        return (economiaMensalFinanceira / totalMensal) * 100;
    }, [scenarios, economiaMensalFinanceira]);

    // ─── Handler de Sugestão de Faturamento ───────────────────────────────────
    const handleSuggestRevenue = async () => {
        if (!nichoMercado) return;
        setIsSearchingRevenue(true);
        try {
            const suggested = await suggestMonthlyRevenue(nichoMercado, nomeCliente);
            setFaturamentoMensal(suggested.toString());
        } catch (error) {
            console.error('Erro ao sugerir faturamento:', error);
        } finally {
            setIsSearchingRevenue(false);
        }
    };

    // ─── Handlers de Cenários ─────────────────────────────────────────────────
    const handleAddScenario = () => {
        setScenarios(prev => [
            ...prev,
            {
                id: nextScenarioId,
                descricao: '',
                papelCargo: '',
                custoHoraEnvolvido: 0,
                unidadeTempo: 'horas',
                tempoPerdidoOcorrencia: '',
                frequencia: 'semana',
                numeroPessoasOcorrencias: '1',
                isCovered: false,
                perdaCalculada: { semanal: 0, mensal: 0, anual: 0 }
            }
        ]);
        setNextScenarioId(prev => prev + 1);
    };

    const handleRemoveScenario = (id) => {
        setScenarios(prev => prev.filter(s => s.id !== id));
    };

    const handleScenarioChange = (id, field, value) => {
        setScenarios(prev => prev.map(s => {
            if (s.id !== id) return s;

            const updated = { ...s, [field]: value };

            if (field === 'selectedCustomRole') {
                const role = customRoles.find(r => r.name === value);
                updated.papelCargo = value;
                updated.custoHoraEnvolvido = role ? role.hourlyCost : 0;
            }

            const custoH = parseFloat(updated.custoHoraEnvolvido) || 0;
            const tempoP = parseFloat(updated.tempoPerdidoOcorrencia) || 0;
            const numP = parseFloat(updated.numeroPessoasOcorrencias) || 0;
            const tempoEmHoras = convertToHours(tempoP, updated.unidadeTempo);

            updated.perdaCalculada = calculateScenarioLoss(custoH, tempoEmHoras, updated.frequencia, numP);
            return updated;
        }));
    };

    // ─── Limpar diagnóstico ────────────────────────────────────────────────────
    const handleClear = async () => {
        if (!window.confirm('Limpar todos os dados do diagnóstico?')) return;

        // Remove draft do Supabase se existir
        if (diagnosticId && currentUser) {
            await supabase.from('diagnostics').delete().eq('id', diagnosticId);
        }

        // Limpa localStorage
        ['diag-nome','diag-desc','diag-nicho','diag-faturamento','diag-dias',
         'diag-horas','diag-scenarios','diag-next-id','diag-sol-desc','diag-sol-custo']
            .forEach(k => localStorage.removeItem(k));

        window.location.reload();
    };

    // ─── Gerar Relatório ──────────────────────────────────────────────────────
    const handleGerarRelatorio = async () => {
        // Validação
        if (!nomeCliente || !nichoMercado || !faturamentoMensal || !diasTrabalhadosMes || !horasTrabalhadasDia) {
            addToast('Por favor, preencha todos os campos do "Perfil da Operação".', 'error');
            return;
        }
        if (parseFloat(faturamentoMensal) <= 0) {
            addToast('O Faturamento Mensal deve ser um valor positivo.', 'error');
            return;
        }
        if (scenarios.length === 0 || scenarios.some(s =>
            !s.descricao || !s.papelCargo ||
            parseFloat(s.tempoPerdidoOcorrencia) <= 0 ||
            parseFloat(s.numeroPessoasOcorrencias) <= 0
        )) {
            addToast('Adicione pelo menos um "GAP" válido com descrição, cargo, tempo de perda e número de pessoas.', 'error');
            return;
        }
        if (!descricaoSolucao || !custoSolucao || parseFloat(custoSolucao) <= 0) {
            addToast('Por favor, preencha a "Solução Proposta" e o "Investimento" com valores válidos.', 'error');
            return;
        }

        if (!window.confirm('Tem certeza que deseja gerar este relatório de diagnóstico? Isso consumirá 15 pontos.')) return;

        if (!spendPoints(15, 'Geração de Relatório')) return;

        // Monta objeto do relatório (igual ao formato original para compatibilidade)
        const diagnosticReport = {
            id: `DIAG-${Date.now()}`,
            type: 'diagnostico',
            clientName: nomeCliente,
            projectName: 'Diagnóstico Financeiro',
            issueDate: new Date().toLocaleDateString('pt-BR'),
            totalInvestment: custoTotalAnualPerdas,
            empresa: {
                nomeCliente, descricaoNegocio, nichoMercado,
                faturamentoMensal: parseFloat(faturamentoMensal),
                diasTrabalhadosMes: parseFloat(diasTrabalhadosMes),
                horasTrabalhadasDia: parseFloat(horasTrabalhadasDia),
                valorHoraEmpresa,
            },
            cargosSalarios: customRoles,
            cenariosPerda: scenarios.map(s => ({ ...s, errors: undefined })),
            resumoPerdas: { custoTotalAnualPerdas },
            solucaoProposta: {
                descricaoSolucao,
                custoSolucao: parseFloat(custoSolucao),
                economiaMensalFinanceira,
                roiMeses,
                percentageRecovered,
            }
        };

        // Persiste no Supabase
        if (currentUser) {
            try {
                // Atualiza (ou cria) o registro como 'completed'
                const diagPayload = {
                    user_id: currentUser.id,
                    status: 'completed',
                    client_name: nomeCliente,
                    business_description: descricaoNegocio,
                    market_niche: nichoMercado,
                    monthly_revenue: parseFloat(faturamentoMensal),
                    working_days_per_month: parseInt(diasTrabalhadosMes),
                    working_hours_per_day: parseInt(horasTrabalhadasDia),
                    solution_description: descricaoSolucao,
                    solution_cost: parseFloat(custoSolucao),
                    total_annual_loss: custoTotalAnualPerdas,
                    monthly_savings: economiaMensalFinanceira,
                    roi_months: roiMeses,
                    recovery_percentage: percentageRecovered,
                    points_cost: 15,
                    points_deducted: true,
                };

                let savedDiagId = diagnosticId;
                if (savedDiagId) {
                    await supabase.from('diagnostics').update(diagPayload).eq('id', savedDiagId);
                } else {
                    const { data } = await supabase
                        .from('diagnostics')
                        .insert(diagPayload)
                        .select('id')
                        .single();
                    savedDiagId = data?.id;
                }

                // Salva cenários (recria todos)
                if (savedDiagId) {
                    await supabase.from('diagnostic_scenarios').delete().eq('diagnostic_id', savedDiagId);
                    await supabase.from('diagnostic_scenarios').insert(
                        scenarios.map(s => ({
                            diagnostic_id: savedDiagId,
                            description: s.descricao,
                            role_name: s.papelCargo,
                            hourly_rate: parseFloat(s.custoHoraEnvolvido) || 0,
                            time_lost_per_occurrence: parseFloat(s.tempoPerdidoOcorrencia) || 0,
                            time_unit: s.unidadeTempo,
                            frequency: s.frequencia,
                            number_of_people: parseFloat(s.numeroPessoasOcorrencias) || 1,
                            is_covered: s.isCovered,
                            weekly_loss: s.perdaCalculada.semanal,
                            monthly_loss: s.perdaCalculada.mensal,
                            annual_loss: s.perdaCalculada.anual,
                        }))
                    );

                    // Salva na tabela de reports
                    await supabase.from('reports').insert({
                        user_id: currentUser.id,
                        diagnostic_id: savedDiagId,
                        report_number: diagnosticReport.id,
                        client_name: nomeCliente,
                        total_loss: custoTotalAnualPerdas,
                        points_cost: 15,
                        snapshot: diagnosticReport,
                    });
                }
            } catch (err) {
                console.error('Erro ao salvar diagnóstico no banco:', err);
                // Não bloqueia o usuário — relatório ainda é gerado localmente
            }
        }

        // Compatibilidade com HistoryWithSavedFilters (localStorage ainda em uso lá)
        const existingDocs = JSON.parse(localStorage.getItem('gama-proposals') || '[]');
        localStorage.setItem('gama-proposals', JSON.stringify([diagnosticReport, ...existingDocs]));

        updateReportData(diagnosticReport);
        navigate('/value-report/preview');
    };

    // ─── JSX ──────────────────────────────────────────────────────────────────
    return (
        <>
            <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-8 pb-40">
                <div className="max-w-2xl mx-auto p-4 space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-2 mb-4">
                        <h1 className="text-2xl font-black text-white tracking-tight uppercase">
                            Diagnóstico de <span className="text-primary drop-shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.3)]">Valor</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">Mapeamento de Impacto e ROI Estratégico</p>
                        {isSaving && (
                            <p className="text-[9px] text-primary/40 uppercase tracking-widest animate-pulse">salvando rascunho...</p>
                        )}
                    </div>

                    {/* 1. Perfil da Operação */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            <h2 className="text-lg font-bold text-white">Perfil da Operação</h2>
                        </div>
                        <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5 md:col-span-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nome do Cliente</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium"
                                    type="text"
                                    value={nomeCliente}
                                    onChange={(e) => setNomeCliente(e.target.value)}
                                    placeholder="Nome da empresa ou contato principal"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nicho de Mercado</label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium"
                                    type="text"
                                    value={nichoMercado}
                                    onChange={(e) => setNichoMercado(e.target.value)}
                                    placeholder="Ex: Consultoria, Tecnologia"
                                />
                            </div>
                            <div className="space-y-1.5 relative group">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Faturamento Mensal (R$)</label>
                                <div className="relative">
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium pr-10"
                                        type="number"
                                        value={faturamentoMensal}
                                        onChange={(e) => setFaturamentoMensal(e.target.value)}
                                        placeholder="0.00"
                                    />
                                    <button
                                        onClick={handleSuggestRevenue}
                                        disabled={isSearchingRevenue || !nichoMercado}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all ${isSearchingRevenue ? 'animate-spin text-primary' : 'text-slate-500 hover:text-primary hover:bg-white/5'} ${!nichoMercado && 'opacity-20 cursor-not-allowed'}`}
                                        title={nichoMercado ? 'Sugerir com base no nicho' : 'Preencha o nicho para sugerir'}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {isSearchingRevenue ? 'sync' : 'auto_fix'}
                                        </span>
                                    </button>
                                </div>
                                {!faturamentoMensal && nichoMercado && !isSearchingRevenue && (
                                    <p className="absolute -bottom-5 left-0 text-[9px] font-bold text-primary/60 uppercase tracking-tight animate-pulse">
                                        Clique na varinha para sugerir por nicho
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:col-span-2">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dias Trabalhados/Mês</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-medium"
                                        type="number"
                                        value={diasTrabalhadosMes}
                                        onChange={(e) => setDiasTrabalhadosMes(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Horas Úteis/Dia</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-medium"
                                        type="number"
                                        value={horasTrabalhadasDia}
                                        onChange={(e) => setHorasTrabalhadasDia(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">payments</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Valor Hora Operacional:</span>
                            </div>
                            <span className="text-xl font-black text-primary drop-shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.3)]">
                                {formatCurrency(valorHoraEmpresa)}
                            </span>
                        </div>
                    </section>

                    {/* Cargos e Remunerações */}
                    <section>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">groups</span>
                            <h2 className="text-lg font-bold text-white">Cargos e Remunerações</h2>
                        </div>
                        <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm">
                            <CargoSalarioManager onRolesChange={setCustomRoles} />
                        </div>
                    </section>

                    {/* 2. Cenários de Perda */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">list_alt</span>
                                <h2 className="text-lg font-bold text-white">Ineficiências (GAPs)</h2>
                            </div>
                            <button
                                onClick={handleAddScenario}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black text-xs font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 neon-glow-hover"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Adicionar GAP
                            </button>
                        </div>

                        <div className="space-y-3">
                            {scenarios.map(scenario => (
                                <div key={scenario.id} className={`group relative bg-card-bg border rounded-xl p-5 shadow-sm transition-all ${scenario.isCovered ? 'border-primary/50 ring-1 ring-primary/20' : 'border-white/5 hover:border-primary/30'}`}>
                                    <div className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`covered-${scenario.id}`}
                                                        checked={scenario.isCovered}
                                                        onChange={(e) => handleScenarioChange(scenario.id, 'isCovered', e.target.checked)}
                                                        className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary cursor-pointer"
                                                    />
                                                    <label htmlFor={`covered-${scenario.id}`} className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors">
                                                        Resolvido pela solução?
                                                    </label>
                                                </div>
                                                <input
                                                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#0a0a0a] text-white outline-none focus:border-primary transition-all text-sm font-semibold"
                                                    type="text"
                                                    value={scenario.descricao}
                                                    onChange={(e) => handleScenarioChange(scenario.id, 'descricao', e.target.value)}
                                                    placeholder="Ex: Retrabalho em Planilhas"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cargo Responsável</label>
                                                <select
                                                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#0a0a0a] text-white outline-none focus:border-primary transition-all text-sm font-semibold cursor-pointer"
                                                    value={scenario.papelCargo}
                                                    onChange={(e) => handleScenarioChange(scenario.id, 'selectedCustomRole', e.target.value)}
                                                >
                                                    <option value="" className="bg-[#111]">-- Selecionar Cargo --</option>
                                                    {customRoles.map(role => (
                                                        <option key={role.id} value={role.name} className="bg-[#111]">{role.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-end gap-4 justify-between pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center block">Perda por Evento</label>
                                                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                        <input
                                                            className="w-10 text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent"
                                                            type="number"
                                                            value={scenario.tempoPerdidoOcorrencia}
                                                            onChange={(e) => handleScenarioChange(scenario.id, 'tempoPerdidoOcorrencia', e.target.value)}
                                                        />
                                                        <select
                                                            className="text-[10px] font-bold text-primary bg-transparent border-none focus:ring-0 p-0 cursor-pointer outline-none uppercase"
                                                            value={scenario.unidadeTempo}
                                                            onChange={(e) => handleScenarioChange(scenario.id, 'unidadeTempo', e.target.value)}
                                                        >
                                                            <option value="horas" className="bg-[#111]">hrs</option>
                                                            <option value="minutos" className="bg-[#111]">min</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Freq.</label>
                                                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                        <select
                                                            className="text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent outline-none cursor-pointer"
                                                            value={scenario.frequencia}
                                                            onChange={(e) => handleScenarioChange(scenario.id, 'frequencia', e.target.value)}
                                                        >
                                                            <option value="dia" className="bg-[#111]">Dia</option>
                                                            <option value="semana" className="bg-[#111]">Sem.</option>
                                                            <option value="mes" className="bg-[#111]">Mês</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Escala (Pessoas)</label>
                                                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                        <span className="text-[10px] font-bold text-slate-600">x</span>
                                                        <input
                                                            className="w-8 text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent"
                                                            type="number"
                                                            value={scenario.numeroPessoasOcorrencias}
                                                            onChange={(e) => handleScenarioChange(scenario.id, 'numeroPessoasOcorrencias', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest">Perda Anual</span>
                                                <span className={`text-xl font-black tracking-tight ${scenario.isCovered ? 'text-primary' : 'text-red-500'}`}>
                                                    {formatCurrency(scenario.perdaCalculada.anual)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveScenario(scenario.id)}
                                        className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Solução & Retorno (ROI) */}
                    <section className="pb-20">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">rocket_launch</span>
                            <h2 className="text-lg font-bold text-white">Solução & Retorno (ROI)</h2>
                        </div>
                        <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-400">Solução Proposta</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-semibold placeholder:text-slate-600"
                                        type="text"
                                        value={descricaoSolucao}
                                        onChange={(e) => setDescricaoSolucao(e.target.value)}
                                        placeholder="Ex: Automatização de Processos"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-slate-400">Investimento (R$)</label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-semibold"
                                        type="number"
                                        value={custoSolucao}
                                        onChange={(e) => setCustoSolucao(e.target.value)}
                                        placeholder="0.00"
                                    />
                                </div>

                                <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Capacidade de Entrega:</span>
                                        <span className="text-sm font-black text-primary">{percentageRecovered.toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.5)] transition-all duration-500"
                                            style={{ width: `${Math.min(percentageRecovered, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-500 leading-tight">
                                        Esta solução recupera o equivalente a <strong>{formatCurrency(economiaMensalFinanceira)}/mês</strong> em tempo produtivo.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-center space-y-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Payback (Retorno)</p>
                                        <p className="text-2xl font-black text-primary drop-shadow-[0_0_8px_rgba(var(--primary-color-rgb),0.3)]">
                                            {roiMeses > 0 ? roiMeses.toFixed(1) : 0} <span className="text-xs font-medium opacity-60">meses</span>
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined text-primary text-3xl opacity-20">schedule</span>
                                </div>
                                <div className="h-px bg-primary/10 w-full" />
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Economia Mensal Financeira</p>
                                        <p className="text-2xl font-bold text-emerald-400">
                                            {formatCurrency(economiaMensalFinanceira)}
                                        </p>
                                    </div>
                                    <span className="material-symbols-outlined text-emerald-400 text-3xl opacity-20">trending_up</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Sticky Footer */}
            <footer className="fixed bottom-[64px] md:bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 z-[110] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <div className="max-w-4xl mx-auto p-4 md:px-8 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Perda Anual</p>
                            <p className="text-lg md:text-2xl font-black text-red-500 tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                                {formatCurrency(custoTotalAnualPerdas)}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleClear}
                                className="p-2.5 border border-white/10 rounded-xl text-slate-400 hover:bg-white/5 transition-all"
                                title="Limpar"
                            >
                                <span className="material-symbols-outlined text-[20px] block">restart_alt</span>
                            </button>
                            <button
                                onClick={handleGerarRelatorio}
                                className="px-6 py-3 bg-primary text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/40 transition-all active:scale-[0.95] neon-glow"
                            >
                                Relatório
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default DiagnosticoDeValorCalculator;
