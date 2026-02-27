import React, { useState } from 'react';
import { suggestMonthlyRevenue } from '../../utils/marketData';
import { formatCurrency } from '../../logic/calculosDeValor';

/**
 * Componente para formulário "Perfil da Operação"
 * Inputs: Nome cliente, nicho, faturamento, dias trabalhados, horas úteis
 * Outputs: valorHoraEmpresa calculado
 */
export function OperationProfileForm({
  nomeCliente,
  nichoMercado,
  faturamentoMensal,
  diasTrabalhadosMes,
  horasTrabalhadasDia,
  valorHoraEmpresa,
  onNomeClienteChange,
  onNichoMercadoChange,
  onFaturamentoMensalChange,
  onDiasTrabalhadosChange,
  onHorasTrabalhadasChange,
}) {
  const [isSearchingRevenue, setIsSearchingRevenue] = useState(false);

  const handleSuggestRevenue = async () => {
    if (!nichoMercado) return;
    setIsSearchingRevenue(true);
    try {
      const suggested = await suggestMonthlyRevenue(nichoMercado, nomeCliente);
      onFaturamentoMensalChange(suggested.toString());
    } catch (error) {
      console.error('Erro ao sugerir faturamento:', error);
    } finally {
      setIsSearchingRevenue(false);
    }
  };

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary">analytics</span>
        <h2 className="text-lg font-bold text-white">Perfil da Operação</h2>
      </div>
      <div className="bg-card-bg p-6 rounded-xl border border-white/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome do Cliente */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Nome do Cliente
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium"
            type="text"
            value={nomeCliente}
            onChange={(e) => onNomeClienteChange(e.target.value)}
            placeholder="Nome da empresa ou contato principal"
          />
        </div>

        {/* Nicho de Mercado */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Nicho de Mercado
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium"
            type="text"
            value={nichoMercado}
            onChange={(e) => onNichoMercadoChange(e.target.value)}
            placeholder="Ex: Consultoria, Tecnologia"
          />
        </div>

        {/* Faturamento Mensal com Sugestão */}
        <div className="space-y-1.5 relative group">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Faturamento Mensal (R$)
          </label>
          <div className="relative">
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white placeholder:text-slate-600 text-sm font-medium pr-10"
              type="number"
              value={faturamentoMensal}
              onChange={(e) => onFaturamentoMensalChange(e.target.value)}
              placeholder="0.00"
            />
            <button
              onClick={handleSuggestRevenue}
              disabled={isSearchingRevenue || !nichoMercado}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-all ${
                isSearchingRevenue
                  ? 'animate-spin text-primary'
                  : 'text-slate-500 hover:text-primary hover:bg-white/5'
              } ${!nichoMercado && 'opacity-20 cursor-not-allowed'}`}
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

        {/* Dias Trabalhados e Horas Úteis */}
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Dias Trabalhados/Mês
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-medium"
              type="number"
              value={diasTrabalhadosMes}
              onChange={(e) => onDiasTrabalhadosChange(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Horas Úteis/Dia
            </label>
            <input
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-white text-sm font-medium"
              type="number"
              value={horasTrabalhadasDia}
              onChange={(e) => onHorasTrabalhadasChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Valor Hora Operacional - Display */}
      <div className="mt-4 flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">payments</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Valor Hora Operacional:
          </span>
        </div>
        <span className="text-xl font-black text-primary drop-shadow-[0_0_10px_rgba(196,255,13,0.3)]">
          {formatCurrency(valorHoraEmpresa)}
        </span>
      </div>
    </section>
  );
}
