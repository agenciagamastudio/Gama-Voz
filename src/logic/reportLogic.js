// src/logic/reportLogic.js

/**
 * Gera um relatório financeiro estruturado com projeções temporais.
 * @param {string} reportType Tipo de relatório ('pricing' ou 'gap').
 * @param {Object} data Dados relevantes do cálculo (ex: { finalPrice, basePrice } ou { annualLoss, annualSavings }).
 * @param {string} customMessage Mensagem personalizada para o relatório.
 * @returns {Object} Um objeto contendo o relatório financeiro com projeções.
 */
export function generateFinancialReport(reportType, data, customMessage = "") {
    const report = {
        type: reportType,
        summary: {},
        projections: {},
        message: customMessage,
        disclaimer: "As projeções são estimativas baseadas nos dados fornecidos e metodologias simplificadas."
    };

    const daysInYear = 252; // Dias úteis em um ano
    const weeksInYear = 52;
    const monthsInYear = 12;

    if (reportType === 'pricing') {
        const { finalPrice, basePrice } = data;
        if (isNaN(finalPrice) || isNaN(basePrice)) return report;

        report.summary = {
            basePrice: basePrice,
            finalPrice: finalPrice
        };
        report.message = customMessage || `O preço sugerido de ${formatCurrency(finalPrice)} foi calculado com base em custos e fatores de valor.`;
        // Para precificação, as projeções podem ser mais complexas e dependem do volume de vendas,
        // mas para o MVP, podemos focar no preço unitário.
        report.projections = {
            unitPrice: finalPrice
        };

    } else if (reportType === 'gap') {
        const { annualLoss, annualSavings } = data;
        report.summary = {
            annualLoss: annualLoss,
            annualSavings: annualSavings,
            netImpact: annualSavings - annualLoss // Se annualSavings > annualLoss, é um ganho, senão uma perda
        };

        const monthlyLoss = annualLoss / monthsInYear;
        const weeklyLoss = annualLoss / weeksInYear;
        const dailyLoss = annualLoss / daysInYear;

        const monthlySavings = annualSavings / monthsInYear;
        const weeklySavings = annualSavings / weeksInYear;
        const dailySavings = annualSavings / daysInYear; // corrected this one, it was `annualLoss / daysInYear;`

        report.projections = {
            dailyLoss: dailyLoss,
            weeklyLoss: weeklyLoss,
            monthlyLoss: monthlyLoss,
            annualLoss: annualLoss,
            dailySavings: dailySavings,
            weeklySavings: weeklySavings,
            monthlySavings: monthlySavings,
            annualSavings: annualSavings,
        };
        report.message = customMessage || `A resolução do GAP pode gerar uma economia anual de ${formatCurrency(annualSavings)}, mitigando um prejuízo de ${formatCurrency(annualLoss)}.`;
    }

    return report;
}

/**
 * Formata um valor numérico para moeda brasileira (BRL).
 * @param {number} value O valor a ser formatado.
 * @returns {string} O valor formatado como moeda.
 */
export function formatCurrency(value) {
    if (isNaN(value)) return "R$ 0,00";
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value).replace(/\s/g, ' '); // Replace non-breaking space with normal space
}
