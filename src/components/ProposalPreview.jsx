import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useProposal } from '../context/ProposalContext'; // Import useProposal
import { exportElementToPDF } from '../utils/pdfExport';

function ProposalPreview() {
  const { proposalData } = useProposal();
  const navigate = useNavigate();

  // Função de exportação protegida
  const handleExportPDF = () => {
    if (!proposalData?.clientCompany) return;
    const fileName = `Proposta_${proposalData.clientCompany.replace(/\s+/g, '_')}.pdf`;
    exportElementToPDF('proposal-sheet', fileName);
  };

  // Se não houver dados, exibe tela de "Nada Encontrado"
  if (!proposalData || (!proposalData.projectName && !proposalData.clientCompany)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 space-y-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(196,255,13,0.1)]">
          <span className="material-symbols-outlined text-4xl text-primary opacity-50">description_off</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">Proposta não gerada</h2>
          <p className="text-slate-500 max-w-xs mx-auto text-sm font-medium leading-relaxed">Você precisa preencher a calculadora primeiro para visualizar este documento.</p>
        </div>
        <Link to="/" className="px-8 py-3 bg-primary text-black font-black rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">calculate</span>
          Ir para Calculadora
        </Link>
      </div>
    );
  }

  // Se chegou aqui, os dados existem. Procedendo com a renderização.
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-[#0a0a0a] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-full transition-colors text-slate-400 hover:text-white hover:bg-white/5">
              <span className="material-symbols-outlined block">arrow_back</span>
            </Link>
            <h1 className="text-lg font-bold tracking-tight text-white">Pré-visualização da Proposta</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleExportPDF}
              className="px-6 py-2.5 bg-white/5 text-white border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Exportar PDF</span>
            </button>
            <Link to="/proposal/share" className="px-6 py-2.5 bg-primary text-black font-black rounded-lg hover:shadow-[0_0_20px_rgba(196,255,13,0.4)] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">share</span>
              <span>Compartilhar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area (Document Viewer) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050505] flex flex-col items-center">
        {/* Document Sheet (A4 Proportion Style) */}
        <div id="proposal-sheet" className="w-full max-w-[800px] bg-white text-slate-900 rounded-sm document-shadow min-h-[1100px] p-8 md:p-12 mb-10 overflow-hidden">
          {/* Proposal Header */}
          <div className="flex justify-between items-start border-b-2 border-primary/10 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <span className="text-xl font-bold tracking-tighter text-slate-800 uppercase">{proposalData.myCompany || 'GAMA CALC'}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-12">por: Gama Cal</p>
              <h2 className="text-3xl font-black uppercase text-slate-900 leading-tight">Proposta<br />Comercial</h2>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p className="font-bold text-slate-800">#{proposalData.proposalId}</p>
              <p>Emitido em: {proposalData.issueDate}</p>
              <p>Válido até: {proposalData.validUntilDate}</p>
            </div>
          </div>

          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Cliente</p>
              <p className="text-lg font-semibold text-slate-800">{proposalData.clientCompany || 'Empresa Indefinida'}</p>
              <p className="text-sm text-slate-500 leading-relaxed">Att: {proposalData.clientContact || 'Contato Indefinido'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Projeto</p>
              <p className="text-lg font-semibold text-slate-800">{proposalData.projectName || 'Projeto Indefinido'}</p>
              <p className="text-sm text-slate-500 leading-relaxed">Desenvolvimento de ecossistema web escalável com integração BI.</p> {/* Static description for now */}
            </div>
          </div>

          {/* Executive Summary */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-slate-800 border-l-4 border-primary pl-3">Resumo Executivo</h3>
            <p className="text-sm text-slate-600 leading-relaxed text-justify">
              {proposalData.summary}
            </p>
          </div>

          {/* Detailed Scope Table */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-800">Escopo Detalhado</h3>
            <div className="border rounded-lg overflow-hidden border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Funcionalidade / Serviço</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-center">Horas</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Investimento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(proposalData.features || []).map(feature => (
                    <tr key={feature.id}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{feature.title || 'Feature sem título'}</p>
                        <p className="text-xs text-slate-500">Complexidade: {proposalData.complexity}</p> {/* Can be more detailed */}
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600">{feature.hours}h</td>
                      <td className="px-4 py-3 text-right text-slate-800">{formatCurrency(feature.cost)}</td>
                    </tr>
                  ))}
                  {/* Static example rows removed, now dynamically rendered */}
                </tbody>
              </table>
            </div>
          </div>

          {/* Investment Summary Card */}
          <div className="flex justify-end mb-12">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-sm px-2">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-800">{formatCurrency(proposalData.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm px-2">
                <span className="text-slate-500">Impostos ({proposalData.taxesPercentage}%)</span>
                <span className="font-medium text-slate-800">{formatCurrency(proposalData.taxesAmount)}</span>
              </div>
              <div className="flex justify-between text-sm px-2 text-emerald-600">
                <span>Desconto Promocional ({proposalData.discountPercentage}%)</span>
                <span className="font-medium">- {formatCurrency(proposalData.discountAmount)}</span>
              </div>
              <div className="bg-primary p-4 rounded-xl flex justify-between items-center text-white shadow-lg shadow-primary/30">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Investimento Total</span>
                <span className="text-xl font-black">{formatCurrency(proposalData.totalInvestment)}</span>
              </div>
            </div>
          </div>

          {/* Signature & Footer */}
          <div className="mt-16 pt-12 border-t border-slate-100 grid grid-cols-2 gap-12">
            <div className="text-center">
              <div className="h-px bg-slate-300 mb-4 mx-auto w-3/4"></div>
              <p className="text-xs font-bold text-slate-800 uppercase">{proposalData.myCompany || 'GAMA CALCULADORA SOLUTIONS'}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Responsável Técnico</p>
            </div>
            <div className="text-center">
              <div className="h-px bg-slate-300 mb-4 mx-auto w-3/4"></div>
              <p className="text-xs font-bold text-slate-800">{proposalData.clientCompany || 'EMPRESA DO CLIENTE'}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">De acordo do Cliente</p>
            </div>
          </div>

          <div className="mt-12 text-center text-[10px] text-slate-400 uppercase tracking-[0.2em]">
            contato@gamacalc.com.br • www.gamacalc.com.br • WhatsApp: +55 (75) 9 8312-9198
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar (UI Overlay) */}
      <nav className="sticky bottom-0 bg-[#192233] border-t border-[#232f48] px-4 py-2 flex items-center justify-around md:hidden">
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span className="material-symbols-outlined filled">description</span>
          <span className="text-[10px] font-medium">Proposta</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#92a4c9] hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-medium">Análise</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#92a4c9] hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined">group</span>
          <span className="text-[10px] font-medium">Clientes</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-[#92a4c9] hover:text-white transition-colors" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-medium">Ajustes</span>
        </a>
      </nav>
    </div>
  );
}

export default ProposalPreview;