import React from 'react';
import { Link } from 'react-router-dom';

function PricingPlans() {
  const tiers = [
    {
      name: 'Go',
      price: '47,00',
      description: 'Ideal para profissionais independentes começando a jornada.',
      buttonText: 'Alternar para o Go',
      current: false,
      features: [
        '50 pontos de energia diários',
        'Diagnósticos básicos ilimitados',
        'Exportação de PDF com marca Gama',
        'Suporte via e-mail',
        'Histórico de 30 dias'
      ]
    },
    {
      name: 'Plus',
      price: '147,00',
      description: 'Desbloqueie o poder total de fechamento de contratos.',
      buttonText: 'Seu plano atual',
      current: true,
      features: [
        'Energia ilimitada (sem pontos)',
        'Sua logo personalizada nos documentos',
        'Gráficos de impacto avançados',
        'Remoção total da marca Gama',
        'Histórico vitalício na nuvem',
        'Prioridade no suporte técnico'
      ]
    },
    {
      name: 'Pro',
      price: '997,00',
      description: 'Para agências e operações que buscam escala máxima.',
      buttonText: 'Fazer upgrade para o Pro',
      current: false,
      features: [
        'Até 5 contas de consultores inclusas',
        'Simulações de ROI em massa',
        'Integração direta com CRM (Hubspot/Pipedrive)',
        'Treinamento exclusivo de metodologia',
        'Acesso antecipado a novos módulos',
        'Gerente de conta dedicado'
      ]
    }
  ];

  return (
    <div className="flex-1 w-full max-w-6xl mx-auto px-4 pt-12 pb-32 space-y-12 animate-in fade-in zoom-in duration-500">
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Evolua sua <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary-color-rgb),0.4)]">Consultoria</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto font-medium">Escolha o plano ideal para transformar ineficiências em lucros extraordinários.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 ${
              tier.current
                ? 'bg-primary/5 border-primary shadow-[0_0_40px_rgba(var(--primary-color-rgb),0.1)] scale-105 z-10'
                : 'bg-card-bg border-white/5 hover:border-white/20'
            }`}
          >
            {tier.current && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                Recomendado
              </div>
            )}

            <div className="space-y-2 mb-8">
              <h3 className="text-2xl font-black text-white uppercase italic">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 text-sm">R$</span>
                <span className="text-4xl font-black text-white tracking-tighter">{tier.price}</span>
                <span className="text-slate-500 text-xs">/mês</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed min-h-[40px]">{tier.description}</p>
            </div>

            <button 
              className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all mb-8 ${
                tier.current 
                  ? 'bg-primary text-black hover:bg-primary/90 shadow-lg shadow-primary/20' 
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {tier.buttonText}
            </button>

            <div className="space-y-4 flex-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">O que está incluso:</p>
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <span className="material-symbols-outlined text-primary text-lg font-bold group-hover:scale-125 transition-transform">check_circle</span>
                    <span className="text-sm text-slate-300 font-medium leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-12 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-6">Precisa de algo sob medida para sua empresa?</p>
        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center gap-3 mx-auto">
          <span className="material-symbols-outlined">business</span>
          Falar com o Setor Enterprise
        </button>
      </div>

      <Link to="/" className="block text-center text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors">
        Voltar para a Calculadora
      </Link>
    </div>
  );
}

export default PricingPlans;
