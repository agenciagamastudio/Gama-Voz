import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OnboardingTour } from './OnboardingTour';

function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="bg-gama-dark text-gama-text overflow-x-hidden font-poppins selection:bg-primary selection:text-black">
      
      {/* Navigation (Transparent) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 flex justify-between items-center bg-gradient-to-b from-gama-dark/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl font-bold">calculate</span>
          <h1 className="text-xl font-black uppercase tracking-tighter italic">Gama <span className="text-primary">Calc</span></h1>
        </div>
        <Link to="/login" className="px-6 py-2 border border-gama-border-default rounded-full text-xs font-black uppercase tracking-widest hover:bg-gama-surface-accent transition-all text-gama-text">
          Acessar Sistema
        </Link>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 pt-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        ></motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-6 relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gama-surface-accent border border-gama-border-default rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 animate-pulse">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            A Nova Era da Consultoria Estratégica
          </div>
          <h1 className="text-4xl md:text-8xl font-black leading-[0.9] uppercase tracking-tighter">
            Não venda tempo.<br />
            Venda <span className="text-primary text-shadow-neon">Resultados</span>.
          </h1>
          <p className="text-gama-text-secondary text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
            A ferramenta definitiva para orquestradores que desejam quantificar ineficiências e provar o ROI de suas propostas com precisão matemática.
          </p>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-center gap-4 px-6">
            <Link to="/onboarding" className="w-full md:w-auto px-10 py-5 bg-primary text-gama-darker font-black uppercase text-sm tracking-[0.2em] rounded-2xl hover:brightness-110 shadow-[0_0_30px_rgba(136,206,17,0.4)] transition-all transform hover:scale-105 active:scale-95 text-center">
              Começar Agora — Grátis
            </Link>
            <a href="#features" className="w-full md:w-auto px-10 py-5 border border-gama-border-hover text-gama-text font-black uppercase text-sm tracking-[0.2em] rounded-2xl hover:border-primary hover:bg-primary/10 transition-all text-center">
              Ver Diferenciais
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 w-full max-w-5xl px-4 pointer-events-none"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-all"></div>
            <div className="relative bg-gama-darker border border-gama-border-default rounded-3xl p-2 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070" alt="Interface Dashboard" className="rounded-2xl grayscale opacity-50" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Impact Section (Scroll Reveal) */}
      <section id="features" className="py-32 px-6 bg-gama-dark">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeInUp} className="space-y-8 text-left">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl font-black">query_stats</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Identifique o <span className="text-primary">GAP</span> que está matando o seu cliente.
            </h2>
            <p className="text-gama-text-secondary text-lg leading-relaxed">
              Muitas empresas sofrem com ineficiências ocultas. O Gama Calc permite que você mapeie esses "vazamentos" e mostre o valor exato em reais que está sendo perdido todos os anos.
            </p>
            <ul className="space-y-4 pt-4">
              {['Diagnósticos de Perda em Tempo Real', 'Cálculo Automático de ROI', 'Propostas Comerciais que se pagam'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-gama-text uppercase text-xs tracking-widest">
                  <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gama-surface border border-gama-border-default p-8 rounded-[40px] shadow-2xl space-y-8"
          >
            <div className="flex justify-between items-center pb-6 border-b border-gama-border-default">
              <p className="text-[10px] font-black uppercase tracking-widest text-gama-text-tertiary">Exemplo de Diagnóstico</p>
              <span className="bg-red-500/20 text-red-500 text-[10px] font-black px-3 py-1 rounded-full uppercase">Perda Crítica</span>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-gama-darker rounded-2xl border border-gama-border-default">
                <p className="text-gama-text-tertiary text-xs uppercase font-black mb-2 tracking-widest">Ineficiência Detectada</p>
                <p className="text-xl font-bold text-gama-text uppercase italic">Retrabalho em Planilhas</p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-gama-text-secondary">Impacto Financeiro:</p>
                  <p className="text-2xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">R$ 126.720,00 <span className="text-xs">/ano</span></p>
                </div>
              </div>
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                <p className="text-gama-text-tertiary text-xs uppercase font-black mb-2 tracking-widest">Solução Proposta</p>
                <p className="text-xl font-bold text-gama-text uppercase italic">Automação de Processos</p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-gama-text-secondary">Payback Estimado:</p>
                  <p className="text-2xl font-black text-primary">2.4 Meses</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-32 px-6 text-center">
        <motion.div {...fadeInUp} className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
            Uma suíte <span className="text-primary">completa</span>
          </h2>
          <p className="text-gama-text-secondary font-medium tracking-widest uppercase text-xs">Tudo o que você precisa para escalar sua consultoria</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'calculate', title: 'Calculadora Smart', desc: 'Precificação baseada em complexidade e valor real de mercado.' },
            { icon: 'history', title: 'Histórico na Nuvem', desc: 'Nunca perca uma negociação. Todos os dados salvos e acessíveis.' },
            { icon: 'share', title: 'Exportação Elite', desc: 'Relatórios e Propostas em PDF com design premium e ROI integrado.' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-gama-surface border border-gama-border-default rounded-[40px] text-left group hover:border-primary/30 transition-all shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-gama-surface-accent border border-gama-border-hover flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-all">
                <span className="material-symbols-outlined text-primary text-2xl font-black">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-black text-gama-text uppercase tracking-tight mb-4">{feature.title}</h3>
              <p className="text-gama-text-secondary text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-[#7ABE0C] p-12 md:p-20 rounded-[60px] text-center space-y-8 shadow-[0_0_60px_rgba(136,206,17,0.3)]"
        >
          <h2 className="text-4xl md:text-7xl font-black text-gama-darker leading-none uppercase tracking-tighter">
            Pronto para virar<br />o jogo comercial?
          </h2>
          <p className="text-gama-darker text-lg font-bold max-w-xl mx-auto uppercase tracking-widest">
            Junte-se aos consultores que pararam de dar descontos e começaram a gerar lucro.
          </p>
          <div className="pt-6">
            <Link to="/onboarding" className="px-12 py-6 bg-gama-darker text-primary font-black uppercase text-sm tracking-[0.3em] rounded-2xl hover:bg-gama-surface hover:text-primary transition-all shadow-2xl block md:inline-block">
              Quero Acesso Vitalício
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <span className="material-symbols-outlined text-gama-text text-xl font-bold">calculate</span>
            <h1 className="text-sm font-black uppercase tracking-tighter text-gama-text">Gama <span className="text-primary">Calc</span></h1>
          </div>
          <p className="text-[10px] text-gama-text-tertiary font-bold uppercase tracking-widest">© 2026 Gama Studio Solutions • Feito para Orquestradores</p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-gama-text-secondary font-bold uppercase hover:text-gama-text transition-colors">Termos</a>
            <a href="#" className="text-[10px] text-gama-text-secondary font-bold uppercase hover:text-gama-text transition-colors">Privacidade</a>
          </div>
        </div>
      </footer>

      {/* Onboarding Tour para primeira vez */}
      <OnboardingTour />

    </div>
  );
}

export default LandingPage;
