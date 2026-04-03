import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-12">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] flex items-center justify-center shadow-[0_0_30px_rgba(136,206,17,0.3)]">
            <span className="text-2xl font-black text-black">G</span>
          </div>
          <h1 className="text-4xl font-black text-[var(--foreground)] tracking-tight">
            GAMA
          </h1>
          <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">
            Financeiro Prime
          </p>
        </div>

        {/* Login Form */}
        <div className="surface-card p-8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[var(--foreground)] tracking-tight mb-2">
              Centro de Comando
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              Acesso Executivo Autorizado
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-secondary)] font-medium text-center mb-3">
              Credenciais de demonstração:
            </p>
            <div className="space-y-2 text-[11px] text-[var(--text-secondary)] font-mono">
              <div className="bg-white/5 p-2 rounded">
                <p className="text-[var(--text-secondary)]">matheus@gama.com</p>
                <p className="text-[var(--text-secondary)]/60">GamaFinanceiro2024</p>
              </div>
              <div className="bg-white/5 p-2 rounded">
                <p className="text-[var(--text-secondary)]">user@gama.com</p>
                <p className="text-[var(--text-secondary)]/60">GamaUser2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-[var(--text-secondary)]/50 text-center mt-8 font-medium">
          Sincronização Prime Edition v1.0
        </p>
      </div>
    </div>
  );
}
