import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProposal } from '../context/ProposalContext'; // Import useProposal

function WhatsappConfirmation() {
  const { proposalData } = useProposal();
  const navigate = useNavigate();

  // Redirect if no proposal data is available
  if (!proposalData) {
    navigate('/');
    return null;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const handleOpenWhatsApp = () => {
    const proposalLink = `${window.location.origin}/proposal/preview?id=${proposalData.proposalId}`; // Assuming a link to the preview
    const message = `Olá! Gostaria de compartilhar a proposta "${proposalData.projectName}" com você. O investimento total é de ${formatCurrency(proposalData.totalInvestment)}. Veja mais detalhes aqui: ${proposalLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Top Navigation Bar (Simplified) */}
      <nav className="flex items-center justify-between px-4 py-4 border-b border-primary/10 bg-background-light dark:bg-background-dark">
        <Link to="/proposal/share" className="flex items-center justify-center size-10 rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-slate-400">arrow_back</span>
        </Link>
        <span className="font-semibold text-sm uppercase tracking-wider text-slate-500">Enviar Proposta</span>
        <div className="size-10"></div> {/* Spacer for centering */}
      </nav>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full">
        {/* Success Icon Section */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150"></div>
          <div className="relative bg-primary/10 border-2 border-primary/30 rounded-full p-6">
            <span className="material-symbols-outlined text-primary text-6xl fill-icon">check_circle</span>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Pronto para enviar!</h1>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Sua proposta está pronta. Ao clicar no botão abaixo, você será redirecionado para o WhatsApp para concluir o envio.
          </p>
        </div>

        {/* Preview Card */}
        <div className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 mb-10 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 dark:border-slate-700/50 pb-3">
            <span className="material-symbols-outlined text-primary text-sm">description</span>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Resumo da Mensagem</span>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="projectNameDisplay" className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Projeto</label>
              <p id="projectNameDisplay" className="text-lg font-semibold text-slate-800 dark:text-slate-100">{proposalData.projectName || 'Projeto Indefinido'}</p>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <label htmlFor="totalValueDisplay" className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Valor Total</label>
                <p id="totalValueDisplay" className="text-2xl font-bold text-primary italic">{formatCurrency(proposalData.totalInvestment)}</p>
              </div>
              <div className="bg-primary/10 px-2 py-1 rounded text-[10px] font-bold text-primary border border-primary/20">
                PDF GERADO
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <button
            onClick={handleOpenWhatsApp}
            className="flex items-center justify-center gap-3 w-full px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg shadow-emerald-900/10 transition-all"
          >
            <span className="material-symbols-outlined fill-icon group-hover:scale-110 transition-transform">chat</span>
            Abrir WhatsApp
          </button>
          <Link to="/proposal/share" className="w-full text-slate-400 font-bold rounded-lg hover:text-white hover:bg-white/5 py-2.5 transition-all text-sm">
            Voltar e editar proposta
          </Link>
        </div>
      </main>

      {/* Bottom Navigation Bar Component */}
      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#192233] px-4 pb-6 pt-3 flex items-center justify-between">
        <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#92a4c9]">
          <span className="material-symbols-outlined">home</span>
        </Link>
        <Link to="/proposal/preview" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#92a4c9]">
          <span className="material-symbols-outlined">description</span>
        </Link>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 bg-primary size-12 rounded-full text-white shadow-lg shadow-primary/30" href="#">
          <span className="material-symbols-outlined fill-icon">add</span>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#92a4c9]" href="#">
          <span className="material-symbols-outlined">account_circle</span>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#92a4c9]" href="#">
          <span className="material-symbols-outlined">more_horiz</span>
        </a>
      </div>
    </div>
  );
}

export default WhatsappConfirmation;