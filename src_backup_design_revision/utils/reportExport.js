// src/utils/reportExport.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Exporta um elemento HTML como PDF.
 * @param {string} elementId O ID do elemento HTML a ser exportado.
 * @param {string} filename O nome do arquivo PDF.
 */
export const exportReportToPdf = async (elementId, filename = 'relatorio.pdf') => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Elemento com ID "${elementId}" não encontrado.`);
    return;
  }

  // Use html2canvas para renderizar o HTML em um canvas
  const canvas = await html2canvas(input, {
    scale: 2, // Aumenta a escala para melhor qualidade
    useCORS: true // Permite carregar imagens de outras origens
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const imgHeight = canvas.height * imgWidth / canvas.width;
  let heightLeft = imgHeight;

  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
};

/**
 * Exporta dados de relatório como CSV.
 * @param {Object} reportData O objeto de relatório contendo summary e projections.
 * @param {string} filename O nome do arquivo CSV.
 */
export const exportReportToCsv = (reportData, filename = 'relatorio.csv') => {
  let csvContent = "data:text/csv;charset=utf-8,";
  const rows = [];

  // Add summary data
  if (reportData.summary) {
    for (const key in reportData.summary) {
      if (Object.hasOwnProperty.call(reportData.summary, key)) {
        rows.push(`${key},${reportData.summary[key]}`);
      }
    }
  }

  // Add projections data
  if (reportData.projections) {
    for (const key in reportData.projections) {
      if (Object.hasOwnProperty.call(reportData.projections, key)) {
        rows.push(`${key},${reportData.projections[key]}`);
      }
    }
  }

  csvContent += rows.map(e => e.join(",")).join("\n"); // Each row is already joined by comma, just join rows by newline

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
};
