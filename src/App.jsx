import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProposalProvider } from './context/ProposalContext';
import { ValueReportProvider } from './context/ValueReportContext';
import { ToastProvider } from './context/ToastContext';
import { PointsProvider } from './context/PointsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AccentColorProvider } from './context/AccentColorContext';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Layout from './Layout';

const LoginPage = lazy(() => import('./components/LoginPage'));
const SignUpPage = lazy(() => import('./components/SignUpPage')); // Importar SignUpPage
const LandingPage = lazy(() => import('./components/LandingPage'));

// Componente de Proteção de Rota (simplificado - sem autenticação)
const ProtectedRoute = ({ children }) => {
    const { loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-gama-dark flex items-center justify-center text-primary font-black animate-pulse">CARREGANDO...</div>;
    }

    return children;
};

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <ToastProvider>
                <AuthProvider>
                    <AccentColorProvider>
                        <PointsProvider>
                            <ProposalProvider>
                                <ValueReportProvider>
                                <Suspense fallback={<LoadingSpinner text="CARREGANDO SISTEMA..." />}>
                                    <Routes>
                                        <Route path="/login" element={<LoginPage />} />
                                        <Route path="/signup" element={<SignUpPage />} /> {/* Adicionar rota de cadastro */}
                                        <Route path="/welcome" element={<LandingPage />} />
                                        <Route 
                                            path="/*" 
                                            element={
                                                <ProtectedRoute>
                                                    <Layout />
                                                </ProtectedRoute>
                                            } 
                                        />
                                    </Routes>
                                </Suspense>
                                </ValueReportProvider>
                            </ProposalProvider>
                        </PointsProvider>
                    </AccentColorProvider>
                </AuthProvider>
            </ToastProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
