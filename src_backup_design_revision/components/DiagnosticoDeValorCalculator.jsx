// src/components/DiagnosticoDeValorCalculator.jsx
import React, { useState, useEffect } from 'react';
import Input from './ds/Input';
import Button from './ds/Button';
import CargoSalarioManager from './CargoSalarioManager'; // Import the new component
import {
    calculateCompanyHourlyValue,
    calculateScenarioLoss,
    calculateTotalAnnualLoss,
    calculateSolutionMonthlySavings,
    calculateSolutionROI,
    formatCurrency,
    convertToHours,
    isPositiveNumber
} from '../logic/calculosDeValor';
import './DiagnosticoDeValorCalculator.css'; // Styling for this component

function DiagnosticoDeValorCalculator() {
    // 1. Diagnóstico da Empresa
    const [nomeCliente, setNomeCliente] = useState('');
    const [descricaoNegocio, setDescricaoNegocio] = useState('');
    const [nichoMercado, setNichoMercado] = useState('');
    const [faturamentoMensal, setFaturamentoMensal] = useState('');
    const [diasTrabalhadosMes, setDiasTrabalhadosMes] = useState('');
    const [horasTrabalhadasDia, setHorasTrabalhadasDia] = useState('');
    const [valorHoraEmpresa, setValorHoraEmpresa] = useState(0);

    // Errors for Diagnóstico da Empresa
    const [faturamentoMensalError, setFaturamentoMensalError] = useState('');
    const [diasTrabalhadosMesError, setDiasTrabalhadosMesError] = useState('');
    const [horasTrabalhadasDiaError, setHorasTrabalhadasDiaError] = useState('');

    // 2. Cenários de Perda/Ineficiência
    const [scenarios, setScenarios] = useState([]);
    const [nextScenarioId, setNextScenarioId] = useState(1);
    const [customRoles, setCustomRoles] = useState([]); // State to hold custom roles

    // 3. Resumo das Perdas e Oportunidades
    const [custoTotalAnualPerdas, setCustoTotalAnualPerdas] = useState(0);

    // Proposta de Solução
    const [descricaoSolucao, setDescricaoSolucao] = useState('');
    const [custoSolucao, setCustoSolucao] = useState('');
    const [economiaTempoMensalEstimada, setEconomiaTempoMensalEstimada] = useState('');
    const [economiaMensalFinanceira, setEconomiaMensalFinanceira] = useState(0);
    const [roiMeses, setRoiMeses] = useState(0);

    // Errors for Proposta de Solução
    const [custoSolucaoError, setCustoSolucaoError] = useState('');
    const [economiaTempoMensalEstimadaError, setEconomiaTempoMensalEstimadaError] = useState('');

    // --- Efeitos e Cálculos ---

    // Efeito para calcular o Valor por Hora da Empresa
    useEffect(() => {
        const fmNum = parseFloat(faturamentoMensal);
        const dtmNum = parseFloat(diasTrabalhadosMes);
        const htdNum = parseFloat(horasTrabalhadasDia);

        let currentHasError = false;

        // Validate Faturamento Mensal
        if (!isPositiveNumber(fmNum) || fmNum === 0) { // Should be strictly positive
            setFaturamentoMensalError('Deve ser um número positivo.');
            currentHasError = true;
        } else {
            setFaturamentoMensalError('');
        }

        // Validate Dias Trabalhados no Mês
        if (!isPositiveNumber(dtmNum) || dtmNum < 1 || dtmNum > 31) {
            setDiasTrabalhadosMesError('Entre 1 e 31.');
            currentHasError = true;
        } else {
            setDiasTrabalhadosMesError('');
        }

        // Validate Horas Trabalhadas por Dia
        if (!isPositiveNumber(htdNum) || htdNum < 1 || htdNum > 24) {
            setHorasTrabalhadasDiaError('Entre 1 e 24.');
            currentHasError = true;
        } else {
            setHorasTrabalhadasDiaError('');
        }

        if (!currentHasError) {
            setValorHoraEmpresa(calculateCompanyHourlyValue(fmNum, dtmNum, htdNum));
        } else {
            setValorHoraEmpresa(0);
        }
    }, [faturamentoMensal, diasTrabalhadosMes, horasTrabalhadasDia]);

    // Efeito para calcular o Custo Total Anual de Perdas
    useEffect(() => {
        const totalAnual = calculateTotalAnnualLoss(scenarios);
        setCustoTotalAnualPerdas(totalAnual);
    }, [scenarios, valorHoraEmpresa]); // Depende do valorHoraEmpresa pois os cenários podem usá-lo como default

    // Efeito para calcular a Economia Mensal Financeira e ROI
    useEffect(() => {
        const csNum = parseFloat(custoSolucao);
        const etmNum = parseFloat(economiaTempoMensalEstimada);

        let currentHasError = false;

        if (!isPositiveNumber(csNum) || csNum === 0) { // Should be strictly positive
            setCustoSolucaoError('Deve ser um número positivo.');
            currentHasError = true;
        } else {
            setCustoSolucaoError('');
        }

        if (!isPositiveNumber(etmNum) || etmNum === 0) { // Should be strictly positive
            setEconomiaTempoMensalEstimadaError('Deve ser um número positivo.');
            currentHasError = true;
        } else {
            setEconomiaTempoMensalEstimadaError('');
        }

        if (!currentHasError && isPositiveNumber(valorHoraEmpresa) && valorHoraEmpresa > 0) { // valorHoraEmpresa comes from another useEffect
            const mensalSavings = calculateSolutionMonthlySavings(etmNum, valorHoraEmpresa);
            setEconomiaMensalFinanceira(mensalSavings);
            setRoiMeses(calculateSolutionROI(csNum, mensalSavings));
        } else {
            setEconomiaMensalFinanceira(0);
            setRoiMeses(0);
        }
    }, [custoSolucao, economiaTempoMensalEstimada, valorHoraEmpresa]);

    // --- Handlers ---

    const handleAddScenario = () => {
        setScenarios(prev => [
            ...prev,
            {
                id: nextScenarioId,
                descricao: '',
                papelCargo: '',
                custoHoraEnvolvido: valorHoraEmpresa || 0, // Default to company hourly value
                unidadeTempo: 'horas',
                tempoPerdidoOcorrencia: '',
                frequencia: 'semana',
                numeroPessoasOcorrencias: '',
                perdaCalculada: { semanal: 0, mensal: 0, anual: 0 },
                errors: {}
            }
        ]);
        setNextScenarioId(prev => prev + 1);
    };

    const handleRemoveScenario = (id) => {
        setScenarios(prev => prev.filter(s => s.id !== id));
    };

    const handleScenarioChange = (id, field, value) => {
        setScenarios(prev => prev.map(s => {
            if (s.id === id) {
                const updatedScenario = { ...s, [field]: value };

                // Handle custom role selection to set custoHoraEnvolvido
                if (field === 'selectedCustomRole') {
                    const selectedRole = customRoles.find(role => role.name === value);
                    updatedScenario.papelCargo = value; // Update papelCargo to selected role name
                    updatedScenario.custoHoraEnvolvido = selectedRole ? selectedRole.hourlyCost : '';
                }

                // Recalculate loss for this specific scenario
                const {
                    custoHoraEnvolvido,
                    tempoPerdidoOcorrencia,
                    unidadeTempo,
                    frequencia,
                    numeroPessoasOcorrencias
                } = updatedScenario;

                const custoH = parseFloat(custoHoraEnvolvido);
                const tempoP = parseFloat(tempoPerdidoOcorrencia);
                const numP = parseFloat(numeroPessoasOcorrencias);
                const tempoEmHoras = convertToHours(tempoP, unidadeTempo);

                // Basic validation for scenario fields
                let scenarioErrors = {};
                if (!isPositiveNumber(custoH) || custoH <= 0) scenarioErrors.custoHoraEnvolvido = 'Positivo.';
                if (!isPositiveNumber(tempoP) || tempoP <= 0) scenarioErrors.tempoPerdidoOcorrencia = 'Positivo.';
                if (!isPositiveNumber(numP) || numP <= 0) scenarioErrors.numeroPessoasOcorrencias = 'Positivo.';

                if (Object.keys(scenarioErrors).length === 0 && custoH > 0 && tempoEmHoras > 0 && numP > 0) {
                    updatedScenario.perdaCalculada = calculateScenarioLoss(
                        custoH,
                        tempoEmHoras,
                        frequencia,
                        numP
                    );
                } else {
                    updatedScenario.perdaCalculada = { semanal: 0, mensal: 0, anual: 0 };
                }
                updatedScenario.errors = scenarioErrors;
                return updatedScenario;
            }
            return s;
        }));
    };

    // --- Renderização ---
    return (
        <div className="diagnostico-valor-calculator">
            <section className="section-card">
                <h2>1. Diagnóstico da Empresa</h2>
                <Input
                    label="Nome do Cliente:"
                    id="nomeCliente"
                    type="text"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                />
                <Input
                    label="Descrição Básica do Negócio:"
                    id="descricaoNegocio"
                    type="text"
                    value={descricaoNegocio}
                    onChange={(e) => setDescricaoNegocio(e.target.value)}
                />
                <Input
                    label="Nicho de Mercado:"
                    id="nichoMercado"
                    type="text"
                    value={nichoMercado}
                    onChange={(e) => setNichoMercado(e.target.value)}
                />
                <Input
                    label="Faturamento Mensal Estimado (R$):"
                    id="faturamentoMensal"
                    type="number"
                    value={faturamentoMensal}
                    onChange={(e) => setFaturamentoMensal(e.target.value)}
                    error={faturamentoMensalError}
                />
                <Input
                    label="Dias Trabalhados no Mês:"
                    id="diasTrabalhadosMes"
                    type="number"
                    value={diasTrabalhadosMes}
                    onChange={(e) => setDiasTrabalhadosMes(e.target.value)}
                    error={diasTrabalhadosMesError}
                />
                <Input
                    label="Horas Trabalhadas por Dia:"
                    id="horasTrabalhadasDia"
                    type="number"
                    value={horasTrabalhadasDia}
                    onChange={(e) => setHorasTrabalhadasDia(e.target.value)}
                    error={horasTrabalhadasDiaError}
                />
                <div className="result-display">
                    <strong>Valor por Hora da Empresa:</strong> {formatCurrency(valorHoraEmpresa)}
                </div>
            </section>

            <section className="section-card">
                <h2>Gerenciamento de Cargos e Salários</h2>
                <CargoSalarioManager onRolesChange={setCustomRoles} />
            </section>

            <section className="section-card">
                <h2>2. Cenários de Perda/Ineficiência</h2>
                <Button onClick={handleAddScenario} variant="secondary">Adicionar Novo Cenário de Perda</Button>
                {scenarios.map(scenario => (
                    <div key={scenario.id} className="scenario-card">
                        <h3>Cenário #{scenario.id}</h3>
                        <Input
                            label="Descrição do Cenário:"
                            id={`scenario-desc-${scenario.id}`}
                            type="text"
                            value={scenario.descricao}
                            onChange={(e) => handleScenarioChange(scenario.id, 'descricao', e.target.value)}
                        />
                         <div className="input-group-inline">
                            <Input
                                label="Papel/Cargo Envolvido:"
                                id={`scenario-role-${scenario.id}`}
                                type="text"
                                value={scenario.papelCargo}
                                onChange={(e) => handleScenarioChange(scenario.id, 'papelCargo', e.target.value)}
                                placeholder="Ex: Gestor de Marketing"
                            />
                            {customRoles.length > 0 && (
                                <div className="select-container">
                                    <label htmlFor={`custom-role-select-${scenario.id}`}>Ou Selecione:</label>
                                    <select
                                        id={`custom-role-select-${scenario.id}`}
                                        value={scenario.papelCargo} // Bind to papelCargo for consistency
                                        onChange={(e) => handleScenarioChange(scenario.id, 'selectedCustomRole', e.target.value)}
                                    >
                                        <option value="">-- Cargo Personalizado --</option>
                                        {customRoles.map(role => (
                                            <option key={role.id} value={role.name}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <Input
                            label="Custo/Hora do Envolvido (R$):"
                            id={`scenario-cost-hour-${scenario.id}`}
                            type="number"
                            value={scenario.custoHoraEnvolvido}
                            onChange={(e) => handleScenarioChange(scenario.id, 'custoHoraEnvolvido', e.target.value)}
                            error={scenario.errors.custoHoraEnvolvido}
                        />
                        <div className="input-group-inline">
                            <Input
                                label="Tempo Perdido por Ocorrência:"
                                id={`scenario-time-lost-${scenario.id}`}
                                type="number"
                                value={scenario.tempoPerdidoOcorrencia}
                                onChange={(e) => handleScenarioChange(scenario.id, 'tempoPerdidoOcorrencia', e.target.value)}
                                error={scenario.errors.tempoPerdidoOcorrencia}
                            />
                            <div className="select-container">
                                <label htmlFor={`unidade-tempo-${scenario.id}`}>Unidade</label>
                                <select
                                    id={`unidade-tempo-${scenario.id}`}
                                    value={scenario.unidadeTempo}
                                    onChange={(e) => handleScenarioChange(scenario.id, 'unidadeTempo', e.target.value)}
                                >
                                    <option value="horas">Horas</option>
                                    <option value="minutos">Minutos</option>
                                </select>
                            </div>
                        </div>
                        <div className="select-container">
                            <label htmlFor={`frequencia-${scenario.id}`}>Frequência da Ocorrência:</label>
                            <select
                                id={`frequencia-${scenario.id}`}
                                value={scenario.frequencia}
                                onChange={(e) => handleScenarioChange(scenario.id, 'frequencia', e.target.value)}
                            >
                                <option value="dia">Por Dia</option>
                                <option value="semana">Por Semana</option>
                                <option value="mes">Por Mês</option>
                            </select>
                        </div>
                        <Input
                            label="Número de Pessoas/Ocorrências Afetadas:"
                            id={`scenario-num-people-${scenario.id}`}
                            type="number"
                            value={scenario.numeroPessoasOcorrencias}
                            onChange={(e) => handleScenarioChange(scenario.id, 'numeroPessoasOcorrencias', e.target.value)}
                            error={scenario.errors.numeroPessoasOcorrencias}
                        />

                        <div className="scenario-results">
                            <p>Perda Semanal: <strong>{formatCurrency(scenario.perdaCalculada.semanal)}</strong></p>
                            <p>Perda Mensal: <strong>{formatCurrency(scenario.perdaCalculada.mensal)}</strong></p>
                            <p>Perda Anual: <strong>{formatCurrency(scenario.perdaCalculada.anual)}</strong></p>
                        </div>
                        <Button onClick={() => handleRemoveScenario(scenario.id)} variant="danger" size="small">Remover Cenário</Button>
                    </div>
                ))}
            </section>

            <section className="section-card">
                <h2>3. Resumo das Perdas e Oportunidades</h2>
                <div className="result-display total-annual-loss">
                    <strong>Custo Total Anual de Perdas:</strong> {formatCurrency(custoTotalAnualPerdas)}
                </div>

                <h3>Propor Solução</h3>
                <Input
                    label="Descrição da Solução:"
                    id="descricaoSolucao"
                    type="text"
                    value={descricaoSolucao}
                    onChange={(e) => setDescricaoSolucao(e.target.value)}
                />
                <Input
                    label="Custo da Solução (R$):"
                    id="custoSolucao"
                    type="number"
                    value={custoSolucao}
                    onChange={(e) => setCustoSolucao(e.target.value)}
                    error={custoSolucaoError}
                />
                <Input
                    label="Economia de Tempo Mensal Estimada (Horas):"
                    id="economiaTempoMensalEstimada"
                    type="number"
                    value={economiaTempoMensalEstimada}
                    onChange={(e) => setEconomiaTempoMensalEstimada(e.target.value)}
                    error={economiaTempoMensalEstimadaError}
                />

                <div className="result-display">
                    <p>Economia Mensal Financeira da Solução: <strong>{formatCurrency(economiaMensalFinanceira)}</strong></p>
                    <p>ROI (Retorno sobre Investimento) em Meses: <strong>{roiMeses.toFixed(2)}</strong></p>
                </div>
            </section>

            <section className="section-card actions-export">
                <h2>4. Ações e Exportação</h2>
                <Button onClick={() => {
                  const diagnosticReport = {
                    empresa: {
                      nomeCliente,
                      descricaoNegocio,
                      nichoMercado,
                      faturamentoMensal: parseFloat(faturamentoMensal),
                      diasTrabalhadosMes: parseFloat(diasTrabalhadosMes),
                      horasTrabalhadasDia: parseFloat(horasTrabalhadasDia),
                      valorHoraEmpresa,
                    },
                    cargosSalarios: customRoles,
                    cenariosPerda: scenarios.map(s => ({
                      ...s,
                      perdaCalculada: s.perdaCalculada, // Ensure calculated loss is present
                      errors: undefined // Exclude errors from report
                    })),
                    resumoPerdas: {
                      custoTotalAnualPerdas,
                    },
                    solucaoProposta: {
                      descricaoSolucao,
                      custoSolucao: parseFloat(custoSolucao),
                      economiaTempoMensalEstimada: parseFloat(economiaTempoMensalEstimada),
                      economiaMensalFinanceira,
                      roiMeses,
                    }
                  };
                  console.log('Relatório de Diagnóstico Gerado:', diagnosticReport);
                  alert('Relatório de Diagnóstico gerado! Verifique o console para os detalhes.');
                }} variant="primary">Gerar Relatório de Diagnóstico</Button>
                <Button onClick={() => window.location.reload()} variant="secondary">Limpar Formulário</Button> {/* Simple reload for now */}
            </section>
        </div>
    );
}

export default DiagnosticoDeValorCalculator;
