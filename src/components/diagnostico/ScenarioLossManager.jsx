import React from 'react';
import { calculateScenarioLoss, convertToHours, formatCurrency } from '../../logic/calculosDeValor';

/**
 * Componente para gerenciar cenários de perda
 * Inclui: adicionar, remover, editar cenários com cálculos automáticos
 */
export function ScenarioLossManager({
  scenarios,
  customRoles,
  onAddScenario,
  onRemoveScenario,
  onScenarioChange,
}) {
  const handleAddScenario = () => {
    onAddScenario();
  };

  const handleScenarioChange = (id, field, value) => {
    const updated = { ...scenarios.find(s => s.id === id), [field]: value };

    // Se mudou a função/cargo, atualiza custo hora
    if (field === 'selectedCustomRole') {
      const role = customRoles.find(r => r.name === value);
      updated.papelCargo = value;
      updated.custoHoraEnvolvido = role ? role.hourlyCost : 0;
    }

    // Recalcula perda se houve mudança em valores relevantes
    const shouldRecalculate = [
      'custoHoraEnvolvido',
      'tempoPerdidoOcorrencia',
      'unidadeTempo',
      'frequencia',
      'numeroPessoasOcorrencias',
    ].includes(field);

    if (shouldRecalculate) {
      const custoH = parseFloat(updated.custoHoraEnvolvido) || 0;
      const tempoP = parseFloat(updated.tempoPerdidoOcorrencia) || 0;
      const numP = parseFloat(updated.numeroPessoasOcorrencias) || 0;
      const tempoEmHoras = convertToHours(tempoP, updated.unidadeTempo);
      updated.perdaCalculada = calculateScenarioLoss(custoH, tempoEmHoras, updated.frequencia, numP);
    }

    onScenarioChange(id, field, value);
  };

  return (
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
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className={`group relative bg-card-bg border rounded-xl p-5 shadow-sm transition-all ${
              scenario.isCovered
                ? 'border-primary/50 ring-1 ring-primary/20'
                : 'border-white/5 hover:border-primary/30'
            }`}
          >
            <div className="flex flex-col gap-6">
              {/* Linha 1: Descrição + Cargo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`covered-${scenario.id}`}
                      checked={scenario.isCovered}
                      onChange={(e) =>
                        handleScenarioChange(scenario.id, 'isCovered', e.target.checked)
                      }
                      className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary cursor-pointer"
                    />
                    <label
                      htmlFor={`covered-${scenario.id}`}
                      className="text-[10px] font-bold text-slate-500 uppercase tracking-widest cursor-pointer hover:text-primary transition-colors"
                    >
                      Resolvido pela solução?
                    </label>
                  </div>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#0a0a0a] text-white outline-none focus:border-primary transition-all text-sm font-semibold"
                    type="text"
                    value={scenario.descricao}
                    onChange={(e) =>
                      handleScenarioChange(scenario.id, 'descricao', e.target.value)
                    }
                    placeholder="Ex: Retrabalho em Planilhas"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Cargo Responsável
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-white/10 bg-[#0a0a0a] text-white outline-none focus:border-primary transition-all text-sm font-semibold cursor-pointer"
                    value={scenario.papelCargo}
                    onChange={(e) =>
                      handleScenarioChange(scenario.id, 'selectedCustomRole', e.target.value)
                    }
                  >
                    <option value="" className="bg-[#111]">
                      -- Selecionar Cargo --
                    </option>
                    {customRoles.map((role) => (
                      <option key={role.id} value={role.name} className="bg-[#111]">
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Linha 2: Parâmetros de Cálculo */}
              <div className="flex flex-wrap items-end gap-4 justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-3">
                  {/* Tempo Perdido por Evento */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center block">
                      Perda por Evento
                    </label>
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <input
                        className="w-10 text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent"
                        type="number"
                        value={scenario.tempoPerdidoOcorrencia}
                        onChange={(e) =>
                          handleScenarioChange(scenario.id, 'tempoPerdidoOcorrencia', e.target.value)
                        }
                      />
                      <select
                        className="text-[10px] font-bold text-primary bg-transparent border-none focus:ring-0 p-0 cursor-pointer outline-none uppercase"
                        value={scenario.unidadeTempo}
                        onChange={(e) =>
                          handleScenarioChange(scenario.id, 'unidadeTempo', e.target.value)
                        }
                      >
                        <option value="horas" className="bg-[#111]">
                          hrs
                        </option>
                        <option value="minutos" className="bg-[#111]">
                          min
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Frequência */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Freq.
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <select
                        className="text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent outline-none cursor-pointer"
                        value={scenario.frequencia}
                        onChange={(e) =>
                          handleScenarioChange(scenario.id, 'frequencia', e.target.value)
                        }
                      >
                        <option value="dia" className="bg-[#111]">
                          Dia
                        </option>
                        <option value="semana" className="bg-[#111]">
                          Sem.
                        </option>
                        <option value="mes" className="bg-[#111]">
                          Mês
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Número de Pessoas */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Escala (Pessoas)
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <span className="text-[10px] font-bold text-slate-600">x</span>
                      <input
                        className="w-8 text-sm font-semibold text-white border-none focus:ring-0 p-0 bg-transparent"
                        type="number"
                        value={scenario.numeroPessoasOcorrencias}
                        onChange={(e) =>
                          handleScenarioChange(
                            scenario.id,
                            'numeroPessoasOcorrencias',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Perda Anual */}
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                    Perda Anual
                  </span>
                  <span
                    className={`text-xl font-black tracking-tight ${
                      scenario.isCovered ? 'text-primary' : 'text-red-500'
                    }`}
                  >
                    {formatCurrency(scenario.perdaCalculada.anual)}
                  </span>
                </div>
              </div>
            </div>

            {/* Botão Remover */}
            <button
              onClick={() => onRemoveScenario(scenario.id)}
              className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1.5 rounded-full shadow-lg flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
