import React from 'react';

/**
 * Componente para gerenciar lista de funcionalidades com cálculos
 * Exibe features, permite add/remove, calcula custo por feature
 */
export function FeaturesCalculator({
  features,
  currentHourlyRate,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
  formatCurrency,
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">list_alt</span>
          <h2 className="text-lg font-bold text-white">Funcionalidades</h2>
        </div>
        <button
          onClick={onAddFeature}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-black text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 neon-glow-hover"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Adicionar Funcionalidade
        </button>
      </div>
      <div className="space-y-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="group relative bg-card-bg border border-white/5 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-all"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Título Feature */}
              <div className="flex-1 w-full">
                <input
                  id={`feature-title-${feature.id}`}
                  className="w-full text-sm font-semibold text-white border-none focus:ring-0 p-0 placeholder:text-slate-600 bg-transparent"
                  type="text"
                  value={feature.title}
                  onChange={(e) => onFeatureChange(feature.id, 'title', e.target.value)}
                  placeholder="Título da Feature"
                />
              </div>

              {/* Horas + Custo */}
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-xs font-bold text-slate-500 uppercase">Horas</span>
                  <input
                    id={`feature-hours-${feature.id}`}
                    className="w-full text-sm font-semibold text-white border-none focus:ring-0 p-0 placeholder:text-slate-600 bg-transparent"
                    type="number"
                    value={feature.hours}
                    onChange={(e) => onFeatureChange(feature.id, 'hours', e.target.value)}
                  />
                </div>
                <div className="text-right min-w-[100px]">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Custo</span>
                  <span className="text-sm font-bold text-white tracking-tight">
                    {formatCurrency(feature.hours * currentHourlyRate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botão Remover */}
            <button
              onClick={() => onRemoveFeature(feature.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 text-red-600 p-1 rounded-full border border-red-200 shadow-sm flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
