import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProposal } from '../context/ProposalContext'; // Import useProposal

function ShareProposal() {
  const { proposalData } = useProposal();
  const navigate = useNavigate();

  // Redirect if no proposal data is available
  if (!proposalData) {
    navigate('/');
    return null;
  }

  const handleCopyLink = () => {
    // In a real application, this would generate a unique shareable link from a backend
    // For now, we'll use a placeholder or the current URL
    const proposalLink = `${window.location.origin}/proposal/preview?id=${proposalData.proposalId}`;
    navigator.clipboard.writeText(proposalLink);
    alert('Link da proposta copiado para a área de transferência!'); // Simple feedback
  };

  return (
    <div className="w-full max-w-md min-h-screen bg-background-light dark:bg-background-dark shadow-2xl flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 border-b border-primary/10 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <Link to="/proposal/preview" className="flex items-center gap-2 text-primary hover:bg-white/5 px-2 py-1 rounded transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-medium">Voltar</span>
        </Link>
        <h1 className="text-lg font-bold tracking-tight">Compartilhar Proposta</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>

      <main className="flex-1 p-6 space-y-8">
        {/* Proposal Preview Card */}
        <section className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-primary/70 px-1">Resumo da Proposta</p>
          <div className="bg-white dark:bg-primary/5 border border-primary/10 rounded-xl overflow-hidden shadow-sm">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20" data-alt="Abstract business data dashboard background" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIBWFRlt6itXFJWCIAwGah2VK6lGxSNQnmHICSI0Ixf93RGzV-Z8dUlrvhr-FRZfFn9wW9OBv77GtTGTFd6bRmbyIpgBHlZD3NuV6kZTIk0yZlzz_HMdPsr2JAFtQZwed_9LsSQctuTHk7YkSjtJVAd5jm2UNBsC5-b1StI1S-cU7kapMjzOZ4bLW_GjhbgW3Fej5BXuTDnax8q_IfvhgbkNPbAGnjp7vp6_f2uZg_H4wyfqIyU4QVJ5QbOCwpdwiJGSZ1FFAP2g")', backgroundSize: 'cover' }}></div>
              <span className="material-symbols-outlined text-5xl text-primary opacity-60">description</span>
            </div>
            <div className="p-5">
              <h2 className="text-xl font-bold leading-tight mb-1">{proposalData.projectName || 'Projeto Indefinido'}</h2>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-sm">business</span>
                <span className="text-sm">{proposalData.clientName || 'Cliente Indefinido'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sharing Options */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 px-1">Escolha como compartilhar</h3>
          <div className="grid gap-3">
            {/* WhatsApp Button */}
            <Link to="/proposal/whatsapp-confirm" className="flex items-center justify-between w-full px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/10">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                  </svg>
                </div>
                <span className="font-semibold">Compartilhar via WhatsApp</span>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
            {/* Email Button */}
            <button className="flex items-center justify-between w-full px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(136,206,17,0.4)] transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-white">mail</span>
                </div>
                <span className="font-semibold">Enviar por E-mail</span>
              </div>
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
            {/* Copy Link Button */}
            <button onClick={handleCopyLink} className="flex items-center justify-between w-full px-6 py-2.5 border-2 border-primary/40 text-primary font-bold rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-slate-300 dark:bg-primary/20 p-2 rounded-lg">
                  <span className="material-symbols-outlined">link</span>
                </div>
                <span className="font-semibold">Copiar Link da Proposta</span>
              </div>
              <span className="material-symbols-outlined">content_copy</span>
            </button>
          </div>
        </section>

        {/* Security Tip */}
        <div className="p-4 bg-primary/5 rounded-lg flex gap-3 border border-primary/10">
          <span className="material-symbols-outlined text-primary">info</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Ao compartilhar o link, qualquer pessoa com acesso poderá visualizar os valores e detalhes técnicos desta proposta comercial.
          </p>
        </div>
      </main>

      {/* Footer / Toast Notification Area (Visual only) */}
      <footer className="p-4 bg-background-light dark:bg-background-dark text-center">
        <p className="text-xs text-slate-500 font-medium">Gama Calculadora Pro © 2024</p>
      </footer>
    </div>
  );
}

export default ShareProposal;