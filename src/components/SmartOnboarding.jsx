import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { usePoints } from '../context/PointsContext';

const QUESTIONS = [
  {
    id: 'objective',
    question: 'Qual seu principal objetivo com o Gama Calc hoje?',
    options: [
      { key: 'A', label: 'Precificar meus serviços com precisão', value: 'pricing' },
      { key: 'B', label: 'Diagnosticar perdas financeiras em clientes', value: 'diagnostic' },
      { key: 'C', label: 'Ambos: Otimizar minha lucratividade total', value: 'both' }
    ]
  },
  {
    id: 'team_size',
    question: 'Qual o tamanho atual da sua equipe ou operação?',
    options: [
      { key: 'A', label: 'Solo / Freelancer', value: '1' },
      { key: 'B', label: 'Pequena Equipe (2 a 5 pessoas)', value: '2-5' },
      { key: 'C', label: 'Equipe em Escala (6 a 15 pessoas)', value: '6-15' },
      { key: 'D', label: 'Operação Robusta (Mais de 15 pessoas)', value: '15+' }
    ]
  },
  {
    id: 'revenue',
    question: 'Qual o faturamento médio mensal da sua operação?',
    options: [
      { key: 'A', label: 'Até R$ 10.000,00', value: '0-10k' },
      { key: 'B', label: 'De R$ 10k a R$ 50.000,00', value: '10k-50k' },
      { key: 'C', label: 'De R$ 50k a R$ 200.000,00', value: '50k-200k' },
      { key: 'D', label: 'Acima de R$ 200.000,00', value: '200k+' }
    ]
  },
  {
    id: 'current_method',
    question: 'Como você faz seus diagnósticos e propostas hoje?',
    options: [
      { key: 'A', label: 'Não faço, apenas envio o preço', value: 'none' },
      { key: 'B', label: 'Uso planilhas manuais (Excel/Sheets)', value: 'sheets' },
      { key: 'C', label: 'Uso ferramentas básicas de mercado', value: 'basic_tools' },
      { key: 'D', label: 'Já possuo um método de consultoria estruturado', value: 'expert' }
    ]
  }
];

function SmartOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { addBonusPoints } = usePoints();

  const currentQuestion = QUESTIONS[currentStep];

  const handleAnswer = (option) => {
    const newAnswers = { ...answers, [currentQuestion.id]: option.value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishOnboarding(newAnswers);
    }
  };

  const finishOnboarding = (finalAnswers) => {
    // Salva perfil inicial
    const profile = {
      name: 'Novo Orquestrador',
      role: finalAnswers.objective === 'diagnostic' ? 'Consultor' : 'Empreendedor',
      company: 'Gama Studio',
      onboardingData: finalAnswers,
      completedAt: new Date().toISOString()
    };
    
    localStorage.setItem('gama-user-profile', JSON.stringify(profile));
    localStorage.setItem('gama-onboarding-completed', 'true');
    
    addBonusPoints(50, 'Bônus de Boas-vindas');
    addToast('Perfil configurado! Bem-vindo ao ecossistema Gama.', 'success');
    navigate('/');
  };

  // Atalhos de Teclado (A, B, C, D)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      const option = currentQuestion.options.find(opt => opt.key === key);
      if (option) {
        handleAnswer(option);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5">
        <div 
          className="h-full bg-primary shadow-[0_0_15px_rgba(var(--primary-color-rgb),0.5)] transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="max-w-xl w-full space-y-12 relative z-10">
        
        {/* Question Counter */}
        <div className="flex items-center gap-3">
          <span className="text-primary font-black text-sm tracking-widest">{currentStep + 1}</span>
          <span className="material-symbols-outlined text-slate-600 text-sm">arrow_forward</span>
          <span className="text-slate-600 font-bold text-[10px] uppercase tracking-[0.2em]">Pergunta {currentStep + 1} de {QUESTIONS.length}</span>
        </div>

        {/* Question Text */}
        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight animate-in fade-in slide-in-from-bottom-4 duration-500">
          {currentQuestion.question}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {currentQuestion.options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleAnswer(option)}
              className="group flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all text-left relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-black text-sm text-slate-400 group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                {option.key}
              </div>
              <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">{option.label}</span>
              
              {/* Keyboard Hint */}
              <span className="absolute right-6 opacity-0 group-hover:opacity-30 text-[10px] font-black text-primary uppercase tracking-widest hidden md:block">Pressione {option.key}</span>
            </button>
          ))}
        </div>

        {/* Footer Hint */}
        <p className="text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest pt-8">
          Toque na opção ou use o teclado
        </p>
      </div>
    </div>
  );
}

export default SmartOnboarding;
