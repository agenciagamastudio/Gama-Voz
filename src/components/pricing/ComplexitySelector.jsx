import React from 'react';

const HOURLY_RATES = {
  'Baixa': 120,
  'Média': 180,
  'Alta': 250,
};

const COMPLEXITY_DESCRIPTIONS = {
  'Baixa': 'Ideal para landing pages ou CRUDs simples. Taxa horária base: R$ 120,00/h.',
  'Média': 'Para aplicações com lógica de negócio moderada e integrações. Taxa horária base: R$ 180,00/h.',
  'Alta': 'Projetos complexos com IA, blockchain ou alta performance. Taxa horária base: R$ 250,00/h.',
};

/**
 * Componente para seleção de complexidade e descrição
 * Exibe botões de toggle e info box com descrição
 */
export function ComplexitySelector({
  selectedComplexity,
  onComplexityChange,
  formatCurrency,
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">bar_chart</span>
        <h2 className="text-lg font-bold text-white">Complexity &amp; Seniority</h2>
      </div>
      <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Botões de Seleção */}
        <div className="flex p-1 bg-white/5 rounded-lg">
          {['Baixa', 'Média', 'Alta'].map((option) => (
            <button
              key={option}
              onClick={() => onComplexityChange(option)}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                selectedComplexity === option
                  ? 'flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 neon-glow-hover'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Info Box */}
        <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <span className="material-symbols-outlined text-primary mt-1">info</span>
          <div>
            <p className="text-sm font-medium text-slate-300">
              {COMPLEXITY_DESCRIPTIONS[selectedComplexity]}
            </p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                Taxa Horária Padrão:
              </span>
              <span className="text-lg font-bold text-primary">
                {formatCurrency(HOURLY_RATES[selectedComplexity])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
