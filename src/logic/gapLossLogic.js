// src/logic/gapLossLogic.js

/**
 * Calcula o prejuízo anual de um GAP.
 * @param {number} averageHourlyCost Custo médio por hora.
 * @param {number} weeklyTimeSpentOnGap Tempo semanal gasto no GAP em horas.
 * @returns {number} O prejuízo anual calculado.
 */
export function calculateGapLoss(averageHourlyCost, weeklyTimeSpentOnGap) {
    if (isNaN(averageHourlyCost) || isNaN(weeklyTimeSpentOnGap)) {
        return 0; // Ou lançar um erro
    }
    const weeklyLoss = weeklyTimeSpentOnGap * averageHourlyCost;
    return weeklyLoss * 52; // 52 semanas no ano
}

/**
 * Calcula o potencial de economia anual de um GAP.
 * @param {number} averageHourlyCost Custo médio por hora.
 * @param {number} weeklyTimeSaved Tempo semanal economizado com a resolução do GAP em horas.
 * @returns {number} O potencial de economia anual calculado.
 */
export function calculatePotentialSavings(averageHourlyCost, weeklyTimeSaved) {
    if (isNaN(averageHourlyCost) || isNaN(weeklyTimeSaved)) {
        return 0; // Ou lançar um erro
    }
    const weeklySavings = weeklyTimeSaved * averageHourlyCost;
    return weeklySavings * 52; // 52 semanas no ano
}
