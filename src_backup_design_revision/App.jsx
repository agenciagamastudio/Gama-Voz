import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
const DiagnosticoDeValorCalculator = lazy(() => import('./components/DiagnosticoDeValorCalculator'));
const PricingCalculator = lazy(() => import('./components/PricingCalculator'));
const ProposalPreview = lazy(() => import('./components/ProposalPreview'));
const ShareProposal = lazy(() => import('./components/ShareProposal'));
const WhatsappConfirmation = lazy(() => import('./components/WhatsappConfirmation'));
const HistoryWithSavedFilters = lazy(() => import('./components/HistoryWithSavedFilters'));
const AdvancedFilters = lazy(() => import('./components/AdvancedFilters'));

function App() {
    const location = useLocation(); // Get current location

    // Helper to get link classes
    const getLinkClasses = (path) => {
        const baseClasses = "text-sm font-medium transition-colors";
        const activeClasses = "text-primary border-b-2 border-primary pb-1";
        const inactiveClasses = "text-slate-400 hover:text-primary";
        
        // Handle root path separately to avoid matching /proposal/preview for /
        if (path === '/') {
            return `${baseClasses} ${location.pathname === '/' ? activeClasses : inactiveClasses}`;
        }
        return `${baseClasses} ${location.pathname.startsWith(path) ? activeClasses : inactiveClasses}`;
    };
    return (
            <div className="bg-background-dark text-slate-300 font-display min-h-screen flex flex-col">
                <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-3xl font-bold">calculate</span>
                        <h1 className="text-xl font-bold tracking-tight text-white">GAMA <span className="text-xl font-bold tracking-tight text-white">Calculadora</span></h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className={getLinkClasses('/')}>Calculadora</Link>
                        <Link to="/proposal/preview" className={getLinkClasses('/proposal/preview')}>Propostas</Link>
                        <Link to="/diagnostico-de-valor" className={getLinkClasses('/diagnostico-de-valor')}>Diagnóstico de Valor</Link>
                        <Link to="/history" className={getLinkClasses('/history')}>Histórico</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-100">
                            <span className="material-symbols-outlined text-slate-600">notifications</span>
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
                            JD
                        </div>
                    </div>
                </header>

                <main>
                    <Suspense fallback={<div>Carregando...</div>}>
                        <Routes>
                        <Route path="/" element={<PricingCalculator />} />
                        <Route path="/diagnostico-de-valor" element={<DiagnosticoDeValorCalculator />} />
                        <Route path="/proposal/preview" element={<ProposalPreview />} />
                        <Route path="/proposal/share" element={<ShareProposal />} />
                        <Route path="/proposal/whatsapp-confirm" element={<WhatsappConfirmation />} />
                        <Route path="/history" element={<HistoryWithSavedFilters />} />
                        <Route path="/history/filters" element={<AdvancedFilters />} />
                                            </Routes>
                                        </Suspense>                </main>
            </div>
    );
}

export default App;