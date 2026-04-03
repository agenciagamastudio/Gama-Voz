'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/Sidebar'
import { useReportsStore } from '@/hooks/useReportsStore'
import { Search, Bell, LogOut, ChevronDown, BarChart3, TrendingDown, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tab content components
const RelatoriosTab = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Relatórios Disponíveis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'DRE Completa', desc: 'Demonstração de Resultado do Exercício' },
          { title: 'Análise de Margens', desc: 'Margem bruta, operacional e líquida' },
          { title: 'Fluxo de Caixa Projetado', desc: 'Previsão de caixa para 12 meses' },
          { title: 'Análise de Custos', desc: 'Detalhamento de custos variáveis e fixos' },
        ].map((item, i) => (
          <button
            key={i}
            className="surface-card p-6 text-left hover:border-[var(--primary)]/50 hover:-translate-y-1 transition-all group"
          >
            <h4 className="text-sm font-black text-[var(--foreground)] uppercase tracking-wider mb-2">
              {item.title}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] font-bold">{item.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
              <span>EXPORTAR</span>
              <span className="text-lg">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>

    <div className="surface-card p-8">
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Gráfico de Desempenho</h3>
      <div className="h-80 flex items-center justify-center border border-white/5 rounded-xl bg-white/2">
        <p className="text-xs text-[var(--text-secondary)] font-bold">Gráfico de receita, custos e lucro será renderizado aqui</p>
      </div>
    </div>
  </div>
)

const FluxoCaixaTab = () => (
  <div className="space-y-8">
    <div className="surface-card p-8">
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Previsão de Fluxo de Caixa</h3>
      <div className="space-y-4">
        {[
          { mes: 'Janeiro', entrada: 45000, saida: 32000, saldo: 13000 },
          { mes: 'Fevereiro', entrada: 48000, saida: 34000, saldo: 14000 },
          { mes: 'Março', entrada: 52000, saida: 36000, saldo: 16000 },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-[var(--primary)]/20 transition-all"
          >
            <div className="flex-1">
              <p className="text-sm font-black text-[var(--foreground)]">{item.mes}</p>
              <p className="text-xs text-[var(--text-secondary)] font-bold">Saldo: R$ {item.saldo.toLocaleString('pt-BR')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--primary)] font-black">↑ R$ {item.entrada.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-[#E11D48] font-black">↓ R$ {item.saida.toLocaleString('pt-BR')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="surface-card p-8">
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Análise de Caixa</h3>
      <div className="h-80 flex items-center justify-center border border-white/5 rounded-xl bg-white/2">
        <p className="text-xs text-[var(--text-secondary)] font-bold">Gráfico de fluxo de caixa será renderizado aqui</p>
      </div>
    </div>
  </div>
)

const EquipeTab = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Equipe de Análise</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { nome: 'Matheus Queiroz', cargo: 'CEO Financeiro', perm: 'Admin' },
          { nome: 'Ana Silva', cargo: 'Controller', perm: 'Editar' },
          { nome: 'Carlos Santos', cargo: 'Analista', perm: 'Visualizar' },
        ].map((item, i) => (
          <div
            key={i}
            className="surface-card p-6 flex flex-col items-center text-center hover:-translate-y-1 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-black font-black text-xl mb-4 shadow-lg shadow-[var(--primary)]/30">
              {item.nome
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <h4 className="text-sm font-black text-[var(--foreground)] mb-1">{item.nome}</h4>
            <p className="text-xs text-[var(--text-secondary)] font-bold mb-4">{item.cargo}</p>
            <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
              <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-widest">{item.perm}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="surface-card p-8">
      <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Atividades Recentes</h3>
      <div className="space-y-3">
        {[
          { acao: 'Matheus atualizou previsão de vendas', hora: '2h atrás' },
          { acao: 'Ana gerou relatório de margens', hora: '4h atrás' },
          { acao: 'Carlos comentou na análise de custos', hora: '1d atrás' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
            <p className="text-xs text-[var(--foreground)] font-bold">{item.acao}</p>
            <p className="text-[9px] text-[var(--text-secondary)] font-bold">{item.hora}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default function ReportsPage() {
  const { selectedTab, setTab, filters, updateFilter } = useReportsStore()
  const [expanded, setExpanded] = useState(false)

  const tabs = [
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
    { id: 'fluxo-caixa', label: 'Fluxo Caixa', icon: TrendingDown },
    { id: 'equipe', label: 'Equipe', icon: Users },
  ]

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'relatorios':
        return <RelatoriosTab />
      case 'fluxo-caixa':
        return <FluxoCaixaTab />
      case 'equipe':
        return <EquipeTab />
      default:
        return <RelatoriosTab />
    }
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-[var(--border)] sticky top-0 z-30 px-8 flex items-center justify-between glass">
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="text"
                placeholder="Pesquisar relatórios..."
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-2 pl-12 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)]/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <select
                value={filters.periodo}
                onChange={(e) =>
                  updateFilter({ periodo: e.target.value as 'mes' | 'trimestre' | 'ano' })
                }
                className="bg-transparent text-xs font-black text-[var(--foreground)] uppercase tracking-widest border-none outline-none"
              >
                <option value="mes">Mês</option>
                <option value="trimestre">Trimestre</option>
                <option value="ano">Ano</option>
              </select>
            </div>

            <button className="px-6 py-2.5 bg-[var(--primary)] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg">
              Exportar
            </button>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex items-center gap-4 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[var(--foreground)] tracking-tight">Matheus Queiroz</p>
                <p className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.2em]">CEO Agência GAMA</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-[var(--border)] shadow-inner">
                <span className="text-[var(--primary)] font-black text-xs">MQ</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-8 animate-in fade-in duration-700">
          {/* Page Header */}
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight uppercase">
              Relatórios & Análise
            </h2>
            <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--primary)] rounded-full shadow-[0_0_10px_rgba(136,206,17,0.5)]" />
              Visualização em tempo real dos dados financeiros
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="surface-card p-2 inline-flex gap-2 rounded-xl border border-white/10">
            {tabs.map((tab) => {
              const TabIcon = tab.icon
              const isActive = selectedTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id as any)}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-lg font-black text-[10px] uppercase tracking-wider transition-all duration-200',
                    isActive
                      ? 'bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/30'
                      : 'text-[var(--text-secondary)] hover:text-[var(--foreground)] hover:bg-white/5'
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="animate-in fade-in duration-300">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  )
}
