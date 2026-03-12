import { Sidebar } from "@/components/Sidebar";
import { BarChartDRE, WaterfallChartDRE } from "@/components/Charts";
import { LogoutButton } from "@/components/LogoutButton";
import { Search } from "lucide-react";

// Mock DRE entries for display
const mockDREEntries = [
  { label: 'VENDAS TOTAIS', planned_value: 250000, actual_value: 248000, level: 0 },
  { label: 'Descontos', planned_value: 10000, actual_value: 8000, level: 1 },
  { label: 'Receita Líquida', planned_value: 240000, actual_value: 240000, level: 0 },
  { label: 'CUSTOS VARIÁVEIS', planned_value: 96000, actual_value: 96000, level: 0 },
  { label: 'MARGEM DE CONTRIBUIÇÃO', planned_value: 144000, actual_value: 144000, level: 0 },
  { label: 'CUSTOS FIXOS', planned_value: 72000, actual_value: 72000, level: 0 },
  { label: 'LUCRO OPERACIONAL', planned_value: 72000, actual_value: 72000, level: 0 },
  { label: 'Despesas Financeiras', planned_value: 10800, actual_value: 10800, level: 1 },
  { label: 'LUCRO LÍQUIDO', planned_value: 61200, actual_value: 61200, level: 0 },
  { label: 'Ponto de Equilíbrio', planned_value: 120000, actual_value: 120000, level: 0 },
];

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Menu */}
        <header className="h-20 border-b border-[var(--border)] sticky top-0 z-30 px-8 flex items-center justify-between glass">
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors" />
              <input
                type="text"
                placeholder="Pesquisar no Centro de Comando..."
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl py-2 pl-12 pr-4 text-sm text-[var(--foreground)] placeholder:text-[var(--text-secondary)] focus:border-[var(--primary)]/50 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-[var(--primary)] text-black font-black uppercase text-[10px] tracking-widest rounded-xl transition-all shadow-lg">
              Exportar Dados
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

            <div className="h-8 w-px bg-white/10" />

            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8 space-y-10 animate-in fade-in duration-700">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight uppercase">Painel Executivo</h2>
            <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--primary)] rounded-full shadow-[0_0_10px_rgba(136,206,17,0.5)]" />
              Sincronização Prime Ativa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="surface-card p-6 h-32 flex flex-col justify-center gap-2 shadow-xl hover:-translate-y-1">
                <div className="h-3 w-24 bg-white/5 rounded animate-pulse" />
                <div className="h-8 w-32 bg-white/10 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-black text-[var(--text-secondary)] uppercase tracking-[0.3em] mb-6">Performance Analítica</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="surface-card p-8 shadow-2xl">
                  <h4 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Planejado vs Realizado</h4>
                  <BarChartDRE entries={mockDREEntries} />
                </div>
                <div className="surface-card p-8 shadow-2xl">
                  <h4 className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest mb-4">Fluxo de Resultado</h4>
                  <WaterfallChartDRE entries={mockDREEntries} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
