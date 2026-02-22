import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Captura um elemento HTML e gera um PDF para download.
 * @param {string} elementId ID do elemento que contém o documento (folha A4)
 * @param {string} fileName Nome do arquivo final
 */
export const exportElementToPDF = async (elementId, fileName = 'documento.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Elemento não encontrado para exportação:', elementId);
    return;
  }

  try {
    // Pequena espera para garantir renderização de fontes e ícones
    await new Promise(resolve => setTimeout(resolve, 500));

    // Captura o elemento como canvas com alta fidelidade
    const canvas = await html2canvas(element, {
      scale: 3, // Qualidade ultra-alta para fontes nítidas
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      letterRendering: true, // Melhora a renderização de fontes
      onclone: (clonedDoc) => {
        // Garante que o elemento clonado para o print seja visível e com layout estável
        const el = clonedDoc.getElementById(elementId);
        el.style.padding = '40px'; // Padroniza o respiro interno no print
      }
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Configura o PDF (A4)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calcula proporções para preencher a página mantendo o aspect ratio
    const imgProps = pdf.getImageProperties(imgData);
    const ratio = imgProps.width / imgProps.height;
    const renderWidth = pdfWidth;
    const renderHeight = renderWidth / ratio;

    // Centraliza ou ajusta se a altura for maior que a folha
    pdf.addImage(imgData, 'PNG', 0, 0, renderWidth, renderHeight, undefined, 'FAST');
    pdf.save(fileName);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar o arquivo PDF. Por favor, tente novamente.');
  }
};
