import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { usePoints } from './context/PointsContext';
import { useAuth } from './context/AuthContext';
import BottomNav from './components/BottomNav';

const DiagnosticoDeValorCalculator = lazy(() => import('./components/DiagnosticoDeValorCalculator'));
const PricingCalculator = lazy(() => import('./components/PricingCalculator'));
const ProposalPreview = lazy(() => import('./components/ProposalPreview'));
const ValueReportPreview = lazy(() => import('./components/ValueReportPreview'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const UserSettings = lazy(() => import('./components/UserSettings'));
const SmartOnboarding = lazy(() => import('./components/SmartOnboarding'));
const PricingPlans = lazy(() => import('./components/PricingPlans'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const PromoCodesManager = lazy(() => import('./components/PromoCodesManager'));
const ShareProposal = lazy(() => import('./components/ShareProposal'));
const WhatsappConfirmation = lazy(() => import('./components/WhatsappConfirmation'));
const HistoryWithSavedFilters = lazy(() => import('./components/HistoryWithSavedFilters'));
const AdvancedFilters = lazy(() => import('./components/AdvancedFilters'));

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { balance } = usePoints();
    const { currentUser, logout, profile } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    // Email do admin master
    const MASTER_EMAIL = 'prontoatendimentogama@gmail.com';
    const isAdmin = currentUser && (
      profile?.role === 'master' ||
      profile?.role === 'admin' ||
      currentUser.email?.toLowerCase() === MASTER_EMAIL.toLowerCase()
    );

    // Estado global do perfil para sincronização de UI (Fallback para dados locais se não houver currentUser full)
    const [globalProfile, setGlobalProfile] = useState(() => {
        const saved = localStorage.getItem('gama-user-profile');
        const parsed = saved ? JSON.parse(saved) : null;
        // Aplicar cor do localStorage imediatamente se disponível
        if (parsed?.accentColor || parsed?.accent_color) {
            const color = parsed.accentColor || parsed.accent_color;
            document.documentElement.style.setProperty('--primary-color', color);
        }
        return currentUser || parsed;
    });

    useEffect(() => {
        if (currentUser) {
            setGlobalProfile(currentUser);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.id]);

    // SYNC COM PROFILE DO CONTEXT - corrige sincronização de cores entre telas
    useEffect(() => {
        if (profile) {
            // Sincroniza o globalProfile com as mudanças do profile context
            // Especialmente importante para accent_color que pode mudar sem recarregar a página
            setGlobalProfile(prev => ({
                ...prev,
                ...profile,
                // Garantir que a cor está no formato esperado
                accentColor: profile.accent_color || prev?.accentColor,
                accent_color: profile.accent_color || prev?.accent_color
            }));
            // Salvar em localStorage para persistência entre navegações
            localStorage.setItem('gama-user-profile', JSON.stringify({
                ...currentUser,
                ...profile,
                accentColor: profile.accent_color,
                accent_color: profile.accent_color
            }));
            // FORÇA aplicar a cor IMEDIATAMENTE quando profile muda
            if (profile.accent_color) {
                console.log('📢 Aplicando cor do profile:', profile.accent_color);
                document.documentElement.style.setProperty('--primary-color', profile.accent_color);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile?.accent_color]); // Monitorar especificamente a cor

    useEffect(() => {
        if (globalProfile?.accentColor) {
            document.documentElement.style.setProperty('--primary-color', globalProfile.accentColor);
        }
        // Também aplicar a cor de profile.accent_color diretamente se disponível
        if (profile?.accent_color) {
            document.documentElement.style.setProperty('--primary-color', profile.accent_color);
        }
    }, [globalProfile, profile?.accent_color]);

    // SINCRONIZAÇÃO EM TEMPO REAL: Escuta evento customizado de mudança de cor
    // Dispara quando UserProfile salva a cor, sincronizando todas as páginas instantaneamente
    useEffect(() => {
        const handleAccentColorChange = (e) => {
            const { accentColor, accent_color } = e.detail || {};
            const newColor = accentColor || accent_color;
            if (newColor) {
                console.log('🎨 Cor sincronizada em tempo real:', newColor);
                document.documentElement.style.setProperty('--primary-color', newColor);
                setGlobalProfile(prev => ({
                    ...prev,
                    accentColor: newColor,
                    accent_color: newColor
                }));
            }
        };

        window.addEventListener('accentColorChanged', handleAccentColorChange);
        return () => window.removeEventListener('accentColorChanged', handleAccentColorChange);
    }, []);

    // Atalho Secreto: Alt + Shift + A para Admin
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.altKey && e.shiftKey && e.key.toUpperCase() === 'A') {
                if (isAdmin) {
                    navigate('/admin');
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isAdmin, navigate]);

    // Redirecionamento para Onboarding (se necessário e logado)
    useEffect(() => {
        const isCompleted = localStorage.getItem('gama-onboarding-completed');
        if (!isCompleted && location.pathname !== '/onboarding' && currentUser) {
            navigate('/onboarding');
        }
    }, [location.pathname, navigate, currentUser]);

    const getLinkClasses = (path) => {
        const baseClasses = "text-sm font-medium transition-colors";
        const activeClasses = "text-primary border-b-2 border-primary pb-1";
        const inactiveClasses = "text-slate-400 hover:text-primary";
        if (path === '/') return `${baseClasses} ${location.pathname === '/' ? activeClasses : inactiveClasses}`;
        return `${baseClasses} ${location.pathname.startsWith(path) ? activeClasses : inactiveClasses}`;
    };

    const whatsappLinks = {
        agencia: `https://wa.me/5575983129198?text=${encodeURIComponent('Olá! Vim do Gama Calc e gostaria de falar com um consultor.')}`,
        suporte: `https://wa.me/5575981472503?text=${encodeURIComponent('Olá, Matheus! Preciso de suporte técnico no Gama Calc.')}`,
        socia: `https://wa.me/5575988682893?text=${encodeURIComponent('Olá! Gostaria de falar com a equipe estratégica.')}`
    };

    const isFullPage = location.pathname === '/onboarding' || location.pathname === '/login';

    return (
        <div className="bg-background-dark text-slate-300 font-display min-h-screen flex flex-col relative overflow-x-hidden">
            {!isFullPage && (
                <>
                    {/* Menu Lateral */}
                    <div className={`fixed inset-0 z-[200] transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
                        <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-[#0a0a0a] border-r border-white/5 p-6 shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                            <div className="flex items-center justify-between mb-10 text-left">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center">
                                        {globalProfile?.avatar ? <img src={globalProfile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>}
                                    </div>
                                    <div className="text-left">
                                        <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-tight">{globalProfile?.company || 'Gama Calc'}</h1>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{globalProfile?.name || 'Pro Master'}</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsMenuOpen(false)} className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">close</span></button>
                            </div>
                            <nav className="space-y-6 text-left">
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Navegação</p>
                                <div className="flex flex-col gap-4">
                                    <Link onClick={() => setIsMenuOpen(false)} to="/" className="flex items-center gap-3 text-slate-300 font-bold hover:text-primary transition-colors"><span className="material-symbols-outlined opacity-50 text-primary">calculate</span> Calculadora</Link>
                                    <Link onClick={() => setIsMenuOpen(false)} to="/diagnostico-de-valor" className="flex items-center gap-3 text-slate-300 font-bold hover:text-primary transition-colors"><span className="material-symbols-outlined opacity-50 text-primary">analytics</span> Diagnóstico</Link>
                                    <Link onClick={() => setIsMenuOpen(false)} to="/history" className="flex items-center gap-3 text-slate-300 font-bold hover:text-primary transition-colors"><span className="material-symbols-outlined opacity-50 text-primary">history</span> Histórico</Link>
                                    {isAdmin && (
                                        <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="flex items-center gap-3 text-primary font-black hover:text-white transition-all bg-primary/10 p-3 rounded-xl border border-primary/20">
                                            <span className="material-symbols-outlined">admin_panel_settings</span> PAINEL MESTRE
                                        </Link>
                                    )}
                                </div>
                                <div className="pt-8 border-t border-white/5 space-y-4">
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Canais de Ajuda</p>
                                    <a href={whatsappLinks.agencia} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-3"><span className="material-symbols-outlined text-emerald-400">support_agent</span><span className="text-sm font-bold text-slate-300">Consultor</span></div>
                                        <span className="material-symbols-outlined text-xs text-slate-600">north_east</span>
                                    </a>
                                    <a href={whatsappLinks.suporte} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-3"><span className="material-symbols-outlined text-blue-400">terminal</span><span className="text-sm font-bold text-slate-300">Dev Suporte</span></div>
                                        <span className="material-symbols-outlined text-xs text-slate-600">north_east</span>
                                    </a>
                                    <a href={whatsappLinks.socia} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-3"><span className="material-symbols-outlined text-rose-400">strategy</span><span className="text-sm font-bold text-slate-300">Estratégico</span></div>
                                        <span className="material-symbols-outlined text-xs text-slate-600">north_east</span>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Menu Opções */}
                    <div className={`fixed inset-0 z-[200] transition-all duration-300 ${isOptionsOpen ? 'opacity-100 visible' : 'opacity-0 pointer-events-none'}`}>
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOptionsOpen(false)}></div>
                        <div className={`absolute top-4 right-4 w-[240px] bg-[#111] border border-white/10 p-2 rounded-2xl shadow-2xl transition-all duration-300 transform ${isOptionsOpen ? 'scale-100 translate-y-0' : 'scale-95 -translate-y-2'}`}>
                            <div className="flex flex-col">
                                <div className="px-4 py-3 border-b border-white/5 mb-2 flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-white truncate">{globalProfile?.name}</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest truncate">{isAdmin ? 'Master Admin' : 'Usuário'}</p>
                                    </div>
                                    {isAdmin && (
                                        <span className="bg-primary/20 text-primary text-[8px] font-black px-1.5 py-0.5 rounded border border-primary/20">ADMIN</span>
                                    )}
                                </div>
                                <Link to="/profile" onClick={() => setIsOptionsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left">
                                    <span className="material-symbols-outlined text-lg opacity-50 text-primary">person</span> Meu Perfil
                                </Link>
                                <Link to="/settings" onClick={() => setIsOptionsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white rounded-xl transition-all text-left">
                                    <span className="material-symbols-outlined text-lg opacity-50 text-primary">settings</span> Configurações
                                </Link>
                                {isAdmin && (
                                    <Link to="/admin" onClick={() => setIsOptionsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-black text-primary hover:bg-primary/10 rounded-xl transition-all text-left">
                                        <span className="material-symbols-outlined text-lg">admin_panel_settings</span> ADMIN
                                    </Link>
                                )}
                                <div className="h-px bg-white/5 my-1 mx-2"></div>
                                <button 
                                    onClick={() => {
                                        setIsOptionsOpen(false);
                                        logout();
                                        navigate('/login');
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full text-left"
                                >
                                    <span className="material-symbols-outlined text-lg opacity-50">logout</span> Sair
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Header Mobile */}
                    {location.pathname !== '/onboarding' && (
                    <header className="md:hidden sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
                        <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-2xl">menu</span></button>
                        <Link to="/pricing" className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity active:scale-95 transition-transform shrink-0">
                            <span className="material-symbols-outlined text-primary text-xl font-bold">calculate</span>
                            <h1 className="text-[13px] font-black tracking-tighter text-white uppercase italic leading-none">Gama <span className="text-primary text-shadow-neon">Calc</span></h1>
                        </Link>
                        <div className="flex items-center gap-2">
                            <div 
                                onClick={() => navigate('/pricing')}
                                className="flex items-center gap-1 px-2 py-1 bg-primary/10 border border-primary/20 rounded-lg shadow-[0_0_10px_rgba(var(--primary-color-rgb),0.1)] cursor-pointer hover:bg-primary/20 transition-all"
                            >
                                <span className="material-symbols-outlined text-[14px] text-primary font-black">bolt</span>
                                <span className="text-[10px] font-black text-white">{balance}</span>
                            </div>
                            <button onClick={() => setIsOptionsOpen(true)} className="p-2 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-2xl">more_vert</span></button>
                        </div>
                    </header>
                    )}

                    {/* Header Desktop */}
                    <header className="hidden md:flex sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3 items-center justify-between">
                        <Link to="/pricing" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-primary text-3xl font-bold">calculate</span>
                            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Gama <span className="text-primary">Calc</span></h1>
                        </Link>
                        <nav className="flex items-center gap-6">
                            <Link to="/" className={getLinkClasses('/')}>Calculadora</Link>
                            <Link to="/proposal/preview" className={getLinkClasses('/proposal/preview')}>Propostas</Link>
                            <Link to="/diagnostico-de-valor" className={getLinkClasses('/diagnostico-de-valor')}>Diagnóstico</Link>
                            <Link to="/history" className={getLinkClasses('/history')}>Histórico</Link>
                        </nav>
                        <div className="flex items-center gap-3">
                            <div 
                                onClick={() => navigate('/pricing')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-xl hover:bg-primary/10 transition-all cursor-pointer group" title="Energia Diária"
                            >
                                <span className="material-symbols-outlined text-[18px] text-primary font-black animate-pulse">bolt</span>
                                <span className="text-xs font-black text-white">{balance} pts</span>
                            </div>
                            <div 
                                onClick={() => setIsOptionsOpen(true)}
                                className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs border border-primary/20 overflow-hidden hover:border-primary/50 transition-all shadow-lg cursor-pointer"
                            >
                                {globalProfile?.avatar ? <img src={globalProfile.avatar} alt="Avatar" className="w-full h-full object-cover" /> : globalProfile?.name ? globalProfile.name.substring(0, 2).toUpperCase() : 'JD'}
                            </div>
                        </div>
                    </header>
                </>
            )}

            <main className={isFullPage ? '' : 'pb-44 md:pb-0'}>
                <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh] text-primary font-black animate-pulse text-xs tracking-widest uppercase">Carregando Gama Calc...</div>}>
                    <Routes>
                        <Route path="/onboarding" element={<SmartOnboarding />} />
                        <Route path="/pricing" element={<PricingPlans />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/codes" element={<PromoCodesManager />} />
                        <Route path="/" element={<PricingCalculator />} />
                        <Route path="/diagnostico-de-valor" element={<DiagnosticoDeValorCalculator />} />
                        <Route path="/value-report/preview" element={<ValueReportPreview />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/settings" element={<UserSettings />} />
                        <Route path="/proposal/preview" element={<ProposalPreview />} />
                        <Route path="/proposal/share" element={<ShareProposal />} />
                        <Route path="/proposal/whatsapp-confirm" element={<WhatsappConfirmation />} />
                        <Route path="/history" element={<HistoryWithSavedFilters />} />
                        <Route path="/history/filters" element={<AdvancedFilters />} />
                    </Routes>
                </Suspense>
            </main>

            {!isFullPage && <BottomNav />}
        </div>
    );
}

export default Layout;
