import React from 'react';
import { Link } from 'react-router-dom';
import { useValueReport } from '../context/ValueReportContext';
import { formatCurrency } from '../logic/calculosDeValor';
import ImpactChart from './ImpactChart';

function ValueReportPreview() {
  const { reportData } = useValueReport();
  
  const handleExportPDF = async () => {
    try {
      const { exportElementToPDF } = await import('../utils/pdfExport');
      const fileName = `Diagnostico_${reportData.empresa.nomeCliente.replace(/\s+/g, '_')}.pdf`;
      await exportElementToPDF('value-report-sheet', fileName);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  if (!reportData || (!reportData.empresa.nomeCliente && !reportData.empresa.nichoMercado)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 space-y-6 text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(196,255,13,0.1)]">
          <span className="material-symbols-outlined text-4xl text-primary opacity-50">analytics</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Nenhum diagnóstico encontrado</h2>
          <p className="text-slate-400 max-w-xs mx-auto text-sm">Realize um diagnóstico para gerar o relatório de impacto financeiro.</p>
        </div>
        <Link to="/diagnostico" className="px-8 py-3 bg-primary text-black font-black rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          Fazer Diagnóstico
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-slate-900 min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/diagnostico-de-valor" className="p-2 rounded-full transition-colors text-slate-400 hover:text-white hover:bg-white/5">
              <span className="material-symbols-outlined block">arrow_back</span>
            </Link>
            <h1 className="text-lg font-bold tracking-tight text-white">Relatório de Impacto Financeiro</h1>
          </div>
          <button 
            onClick={handleExportPDF}
            className="px-6 py-2.5 bg-primary text-black font-bold rounded-lg hover:shadow-[0_0_20px_rgba(196,255,13,0.4)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Exportar PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050505] flex flex-col items-center">
        <div id="value-report-sheet" className="w-full max-w-[800px] bg-white text-slate-900 rounded-sm shadow-2xl min-h-[1100px] p-8 md:p-12 mb-10 overflow-hidden relative">
          
          {/* Header do Relatório */}
          <div className="flex justify-between items-start border-b-2 border-primary/10 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <span className="text-xl font-bold tracking-tighter text-slate-800 uppercase">GAMA <span className="text-primary">DIAG</span></span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-12">por: Gama Cal</p>
              <h2 className="text-3xl font-black uppercase text-slate-900 leading-tight">Diagnóstico de<br />Impacto Financeiro</h2>
            </div>
            <div className="text-right text-sm text-slate-500">
              <p className="font-bold text-slate-800">REF: {new Date().getFullYear()}-{Math.floor(Math.random() * 1000)}</p>
              <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>

          {/* Perfil do Cliente */}
          <div className="grid grid-cols-2 gap-8 mb-10 bg-slate-50 p-6 rounded-xl border border-slate-100">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Empresa Diagnosticada</p>
              <p className="text-lg font-bold text-slate-800">{reportData.empresa.nomeCliente}</p>
              <p className="text-sm text-slate-500">{reportData.empresa.nichoMercado}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Valor Hora Operacional</p>
              <p className="text-2xl font-black text-slate-800">{formatCurrency(reportData.empresa.valorHoraEmpresa)}</p>
            </div>
          </div>

          {/* Resumo das Ineficiências */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-800 border-l-4 border-red-500 pl-3">Mapeamento de GAPs e Perdas</h3>
            <div className="border rounded-lg overflow-hidden border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-slate-700">Ineficiência</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-center">Frequência</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Mensal</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Anual (Impacto)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reportData.cenariosPerda.map((scenario, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3">
                        <p className="font-bold text-slate-800 uppercase text-xs tracking-tight">{scenario.descricao}</p>
                        <p className="text-[10px] text-slate-500">{scenario.papelCargo} • {scenario.tempoPerdidoOcorrencia}{scenario.unidadeTempo === 'minutos' ? 'min' : 'h'} x {scenario.numeroPessoasOcorrencias} pessoa(s)</p>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-600 uppercase text-[9px] font-black">
                        Por {scenario.frequencia}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 font-medium">
                        {formatCurrency(scenario.perdaCalculada.mensal)}
                      </td>
                      <td className="px-4 py-3 text-right font-black text-red-600">
                        {formatCurrency(scenario.perdaCalculada.anual)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-red-50 font-black text-red-700 border-t-2 border-red-100">
                  <tr>
                    <td colSpan="3" className="px-4 py-4 uppercase tracking-wider text-[10px]">Impacto Financeiro Total Estimado (12 meses)</td>
                    <td className="px-4 py-4 text-right text-lg">
                      {formatCurrency(reportData.resumoPerdas.custoTotalAnualPerdas)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Gráfico de Distribuição de Perdas */}
          <div className="mb-10 page-break-inside-avoid">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-slate-800 border-l-4 border-primary pl-3">Visualização de Impacto</h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/2">
                <ImpactChart data={reportData.cenariosPerda} />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  O gráfico ao lado ilustra a proporção financeira de cada ineficiência identificada. 
                  Focar nos GAPs de maior fatia (representados pelas cores mais vibrantes) trará o retorno mais rápido sobre o investimento.
                </p>
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Dica Estratégica</p>
                  <p className="text-xs text-slate-700 font-medium">Priorize a solução dos 20% dos problemas que causam 80% das perdas financeiras (Princípio de Pareto).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Oportunidade de Melhoria */}
          <div className="mb-12 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-l-4 border-emerald-500 pl-3">Solução Estratégica e ROI</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 md:col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Solução Recomendada</p>
                <p className="text-sm font-medium text-slate-700">{reportData.solucaoProposta.descricaoSolucao || 'Nenhuma solução descrita.'}</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">Payback em</p>
                <p className="text-xl font-black text-emerald-700">{reportData.solucaoProposta.roiMeses.toFixed(1)} meses</p>
              </div>
            </div>
          </div>

          {/* Gráfico/Visual de Impacto (Placeholder Simples) */}
          <div className="p-8 bg-slate-900 rounded-2xl text-white flex flex-col items-center justify-center space-y-4">
            <div className="text-center">
              <p className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">Potencial de Recuperação</p>
              <p className="text-4xl font-black">{formatCurrency(reportData.solucaoProposta.economiaMensalFinanceira * 12)}</p>
              <p className="text-slate-400 text-xs mt-1">Economia projetada nos primeiros 12 meses</p>
            </div>
          </div>

          {/* Footer Legal */}
          <div className="absolute bottom-12 left-12 right-12 text-center border-t border-slate-100 pt-8">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Relatório Gerado por GAMA CALCULADORA SOLUTIONS • www.gamacalc.com.br
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ValueReportPreview;
