// src/logic/calculosDeValor.js

/**
 * Calcula o valor por hora da empresa com base no faturamento mensal, dias e horas trabalhadas.
 * @param {number} faturamentoMensal
 * @param {number} diasTrabalhadosMes
 * @param {number} horasTrabalhadasDia
 * @returns {number} Valor por hora da empresa.
 */
export const calculateCompanyHourlyValue = (faturamentoMensal, diasTrabalhadosMes, horasTrabalhadasDia) => {
    if (faturamentoMensal <= 0 || diasTrabalhadosMes <= 0 || horasTrabalhadasDia <= 0) {
        return 0;
    }
    const horasTotaisMes = diasTrabalhadosMes * horasTrabalhadasDia;
    return faturamentoMensal / horasTotaisMes;
};

/**
 * Converte tempo (minutos ou horas) para horas decimais.
 * @param {number} tempo
 * @param {string} unidade 'minutos' ou 'horas'
 * @returns {number} Tempo em horas decimais.
 */
export const convertToHours = (tempo, unidade) => {
    if (unidade === 'minutos') {
        return tempo / 60;
    }
    return tempo; // Já está em horas
};

/**
 * Calcula o custo da perda de um cenário específico (semanal, mensal, anual).
 * @param {number} custoHoraEnvolvido Custo por hora da pessoa/cargo envolvido.
 * @param {number} tempoPerdidoOcorrencia Tempo perdido por ocorrência em horas decimais.
 * @param {string} frequencia Ocorrência: 'dia', 'semana', 'mes'.
 * @param {number} numeroPessoasOcorrencias Número de pessoas ou ocorrências afetadas.
 * @returns {{semanal: number, mensal: number, anual: number}} Custos calculados.
 */
export const calculateScenarioLoss = (custoHoraEnvolvido, tempoPerdidoOcorrencia, frequencia, numeroPessoasOcorrencias) => {
    if (custoHoraEnvolvido <= 0 || tempoPerdidoOcorrencia <= 0 || numeroPessoasOcorrencias <= 0) {
        return { semanal: 0, mensal: 0, anual: 0 };
    }

    let perdaDiaria = 0;
    let perdaSemanal = 0;
    let perdaMensal = 0;

    const perdaPorOcorrencia = custoHoraEnvolvido * tempoPerdidoOcorrencia;

    switch (frequencia) {
        case 'dia':
            perdaDiaria = perdaPorOcorrencia * numeroPessoasOcorrencias;
            perdaSemanal = perdaDiaria * 5; 
            perdaMensal = perdaDiaria * 22; 
            break;
        case 'semana':
            perdaSemanal = perdaPorOcorrencia * numeroPessoasOcorrencias;
            perdaMensal = perdaSemanal * 4.33; // Média de semanas no mês
            break;
        case 'mes':
            perdaMensal = perdaPorOcorrencia * numeroPessoasOcorrencias;
            perdaSemanal = perdaMensal / 4.33;
            break;
        default:
            break;
    }

    const anual = Math.round(perdaMensal * 12);
    return { semanal: perdaSemanal, mensal: perdaMensal, anual };
};


/**
 * Calcula o custo total anual de perdas de todos os cenários.
 * @param {Array<object>} cenarios Array de objetos de cenário, cada um com 'custoHoraEnvolvido', 'tempoPerdidoOcorrencia', 'frequencia', 'numeroPessoasOcorrencias'.
 * @returns {number} Custo total anual.
 */
export const calculateTotalAnnualLoss = (scenarios) => {
    return scenarios.reduce((total, scenario) => {
        const { anual } = calculateScenarioLoss(
            scenario.custoHoraEnvolvido,
            scenario.tempoPerdidoOcorrencia,
            scenario.frequencia,
            scenario.numeroPessoasOcorrencias
        );
        return total + anual;
    }, 0);
};

/**
 * Calcula a economia mensal financeira de uma solução.
 * @param {number} estimatedTimeSavings Economia de tempo mensal estimada em horas.
 * @param {number} companyHourlyValue Valor por hora da empresa ou custo por hora do envolvido.
 * @returns {number} Economia financeira mensal.
 */
export const calculateSolutionMonthlySavings = (estimatedTimeSavings, companyHourlyValue) => {
    if (estimatedTimeSavings <= 0 || companyHourlyValue <= 0) {
        return 0;
    }
    return estimatedTimeSavings * companyHourlyValue;
};

/**
 * Calcula o Retorno sobre Investimento (ROI) em meses.
 * @param {number} custoSolucao Custo total da solução.
 * @param {number} economiaMensalFinanceira Economia financeira mensal gerada pela solução.
 * @returns {number} ROI em meses.
 */
export const calculateSolutionROI = (custoSolucao, economiaMensalFinanceira) => {
    if (custoSolucao <= 0 || economiaMensalFinanceira <= 0) {
        return 0;
    }
    return custoSolucao / economiaMensalFinanceira;
};

/**
 * Função utilitária para formatar moeda.
 * @param {number} value
 * @returns {string} Valor formatado como moeda.
 */
export const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

/**
 * Valida se um valor é um número positivo.
 * @param {*} value
 * @returns {boolean} True se for um número positivo, false caso contrário.
 */
export const isPositiveNumber = (value) => {
    return typeof value === 'number' && !isNaN(value) && value >= 0;
};

/**
 * Calcula o custo por hora a partir do custo mensal, dias trabalhados no mês e horas trabalhadas por dia.
 * @param {number} custoMensal
 * @param {number} diasTrabalhadosMes
 * @param {number} horasTrabalhadasDia
 * @returns {number} Custo por hora.
 */
export const calculateHourlyCostFromMonthly = (custoMensal, diasTrabalhadosMes, horasTrabalhadasDia) => {
    if (custoMensal <= 0 || diasTrabalhadosMes <= 0 || horasTrabalhadasDia <= 0) {
        return 0;
    }
    const horasTotaisMes = diasTrabalhadosMes * horasTrabalhadasDia;
    return custoMensal / horasTotaisMes;
};
