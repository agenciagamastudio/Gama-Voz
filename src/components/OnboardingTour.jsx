import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Tour de Onboarding - guia para primeira vez que user loga
 * Simples e direto, sem complicações
 */
export const OnboardingTour = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [step, setStep] = useState(0);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const hasSeenTour = localStorage.getItem(`gama-tour-seen-${currentUser.id}`);
    if (!hasSeenTour) {
      setShowTour(true);
    }
  }, [currentUser]);

  if (!showTour) return null;

  const steps = [
    {
      title: 'Bem-vindo à GAMA Calculadora! 👋',
      description:
        'Seu assistente inteligente para transformar propostas em vendas. Vamos fazer um tour rápido?',
      action: 'Começar',
      highlight: null,
      nextStep: 1
    },
    {
      title: 'Como Funciona',
      description:
        '1️⃣ Você responde perguntas sobre a solução\n2️⃣ GAMA calcula o ROI e impacto\n3️⃣ Você compartilha com seus clientes\n4️⃣ Mais vendas garantidas!',
      action: 'Próximo',
      highlight: null,
      nextStep: 2
    },
    {
      title: 'Sua Primeira Calculadora',
      description:
        'Clique no botão "Começar Diagnóstico" para criar seu primeiro cálculo de valor.',
      action: 'Ir para Calculadora',
      highlight: 'calculator-button',
      nextStep: null,
      link: '/calculadora'
    },
    {
      title: 'Personalize Seu Perfil',
      description:
        'Adicione seu nome, avatar e cor preferida. Seus clientes vão ver isso nas propostas!',
      action: 'Ir para Perfil',
      highlight: 'profile-button',
      nextStep: null,
      link: '/profile'
    },
    {
      title: 'Ganhe Pontos Extras',
      description:
        'Complete ações simples para desbloquear mais energia. Siga redes sociais, mande WhatsApp...',
      action: 'Entendi!',
      highlight: null,
      nextStep: null
    }
  ];

  const currentStepData = steps[step];

  const handleNext = () => {
    if (currentStepData.link) {
      navigate(currentStepData.link);
      setShowTour(false);
      localStorage.setItem(
        `gama-tour-seen-${currentUser.id}`,
        'true'
      );
      return;
    }

    if (currentStepData.nextStep !== null) {
      setStep(currentStepData.nextStep);
    } else {
      setShowTour(false);
      localStorage.setItem(
        `gama-tour-seen-${currentUser.id}`,
        'true'
      );
    }
  };

  const handleSkip = () => {
    setShowTour(false);
    localStorage.setItem(
      `gama-tour-seen-${currentUser.id}`,
      'true'
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal de Onboarding */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 fade-in duration-300">
          {/* Header com Progress */}
          <div className="bg-gradient-to-r from-primary/20 to-yellow-500/10 p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-black text-white uppercase">
                {currentStepData.title}
              </h2>
              <button
                onClick={handleSkip}
                className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary to-yellow-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Passo {step + 1} de {steps.length}
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Description - com suporte a quebras de linha */}
            <div className="space-y-3">
              {currentStepData.description.split('\n').map((line, idx) => (
                <p key={idx} className="text-sm text-slate-300 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>

            {/* Visual Enhancement */}
            {step === 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 text-center">
                <div className="text-6xl mb-3">🚀</div>
                <p className="text-sm text-slate-400">
                  Pronto para revolucionar suas vendas?
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-3 bg-white/5 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <p className="font-bold text-white text-sm">Responda</p>
                    <p className="text-xs text-slate-400">Questões simples</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <p className="font-bold text-white text-sm">Veja</p>
                    <p className="text-xs text-slate-400">Impacto calculado</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📤</span>
                  <div>
                    <p className="font-bold text-white text-sm">Compartilhe</p>
                    <p className="text-xs text-slate-400">Com seus clientes</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Actions */}
          <div className="bg-gradient-to-t from-black/30 to-transparent p-8 border-t border-white/5 space-y-3">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-primary text-black font-black uppercase text-sm rounded-2xl hover:bg-primary/90 transition-all transform active:scale-[0.98]"
            >
              {currentStepData.action}
            </button>

            {step < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="w-full py-2 bg-white/5 text-slate-400 font-bold uppercase text-xs rounded-lg hover:bg-white/10 transition-all"
              >
                Pular tour
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
