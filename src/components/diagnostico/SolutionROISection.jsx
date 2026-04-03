import React from 'react';
import { formatCurrency } from '../../logic/calculosDeValor';

/**
 * Componente para seção de Solução Proposta e ROI
 * Inputs: descricaoSolucao, custoSolucao
 * Outputs: percentageRecovered, roiMeses, economiaMensalFinanceira
 */
export function SolutionROISection({
  descricaoSolucao,
  custoSolucao,
  economiaMensalFinanceira,
  roiMeses,
  percentageRecovered,
  onDescricaoChange,
  onCustoChange,
}) {
  return (
    <section className="pb-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">rocket_launch</span>
        <h2 className="text-lg font-bold text-white">Solução & Retorno (ROI)</h2>
      </div>
      <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Inputs */}
        <div className="space-y-4">
          {/* Descrição Solução */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-400">Solução Proposta</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-semibold placeholder:text-slate-600"
              type="text"
              value={descricaoSolucao}
              onChange={(e) => onDescricaoChange(e.target.value)}
              placeholder="Ex: Automatização de Processos"
            />
          </div>

          {/* Custo Solução */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-400">Investimento (R$)</label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-semibold"
              type="number"
              value={custoSolucao}
              onChange={(e) => onCustoChange(e.target.value)}
              placeholder="0.00"
            />
          </div>

          {/* Capacidade de Entrega */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/5 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Capacidade de Entrega:
              </span>
              <span className="text-sm font-black text-primary">{percentageRecovered.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.5)] transition-all duration-500"
                style={{ width: `${Math.min(percentageRecovered, 100)}%` }}
              />
            </div>
            <p className="text-[9px] text-slate-500 leading-tight">
              Esta solução recupera o equivalente a <strong>{formatCurrency(economiaMensalFinanceira)}/mês</strong> em
              tempo produtivo.
            </p>
          </div>
        </div>

        {/* Lado Direito: Resultados de ROI */}
        <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-center space-y-6">
          {/* Payback */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Payback (Retorno)
              </p>
              <p className="text-2xl font-black text-primary drop-shadow-[0_0_8px_rgba(var(--primary-color-rgb),0.3)]">
                {roiMeses > 0 ? roiMeses.toFixed(1) : 0} <span className="text-xs font-medium opacity-60">meses</span>
              </p>
            </div>
            <span className="material-symbols-outlined text-primary text-3xl opacity-20">schedule</span>
          </div>

          <div className="h-px bg-primary/10 w-full" />

          {/* Economia Mensal */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Economia Mensal Financeira
              </p>
              <p className="text-2xl font-bold text-emerald-400">
                {formatCurrency(economiaMensalFinanceira)}
              </p>
            </div>
            <span className="material-symbols-outlined text-emerald-400 text-3xl opacity-20">trending_up</span>
          </div>
        </div>
      </div>
    </section>
  );
}
