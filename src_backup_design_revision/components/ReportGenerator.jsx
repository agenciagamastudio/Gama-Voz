// src/components/ReportGenerator.jsx
import React, { useState, useRef } from 'react';
import { generateFinancialReport, formatCurrency } from '../logic/reportLogic';
import { exportReportToPdf, exportReportToCsv } from '../utils/reportExport'; // Import export utilities
import Button from './ds/Button'; // Import the new Button component
import Input from './ds/Input'; // Import the new Input component (for generic input, or Textarea later)


function ReportGenerator({ pricingResults, gapResults }) {
    const [reportType, setReportType] = useState(''); // 'pricing' or 'gap'
    const [customMessage, setCustomMessage] = useState('');
    const [report, setReport] = useState(null);
    const reportRef = useRef(); // Ref for the report output section

    const handleGenerateReport = () => {
        let generatedReport = null;
        if (reportType === 'pricing' && pricingResults) {
            generatedReport = generateFinancialReport(
                'pricing',
                {
                    basePrice: pricingResults.basePrice,
                    finalPrice: pricingResults.finalPrice
                },
                customMessage
            );
        } else if (reportType === 'gap' && gapResults) {
            generatedReport = generateFinancialReport(
                'gap',
                {
                    annualLoss: gapResults.annualLoss,
                    annualSavings: gapResults.annualSavings
                },
                customMessage
            );
        }
        setReport(generatedReport);
    };

    return (
        <div className="report-container"> {/* Using a class instead of inline style */}
            <h2>Gerador de Relatórios de Oferta de Valor</h2>
            <div className="input-group"> {/* Using a class instead of inline style */}
                <label className="ds-label">Selecionar Tipo de Relatório:</label>
                <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="ds-input"> {/* Using ds-input for select */}
                    <option value="">-- Selecione --</option>
                    <option value="pricing" disabled={!pricingResults}>Precificação Inteligente</option>
                    <option value="gap" disabled={!gapResults}>Cálculo de Prejuízo de GAPs</option>
                </select>
            </div>
            <div className="input-group"> {/* Using a class instead of inline style */}
                <label className="ds-label">Mensagem Personalizada:</label>
                <textarea
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows="4"
                    className="ds-input" // Using ds-input class
                />
            </div>
            <Button onClick={handleGenerateReport} disabled={!reportType}>Gerar Relatório</Button>

            {report && (
                <div> {/* This div will hold the export buttons and the report itself */}
                    <div className="export-buttons-container"> {/* Using a class instead of inline style */}
                        <Button onClick={() => exportReportToPdf('reportOutput', `relatorio_${report.type}.pdf`)} size="medium" className="export-pdf-button">Exportar PDF</Button>
                        <Button onClick={() => exportReportToCsv(report, `relatorio_${report.type}.csv`)} size="medium">Exportar CSV</Button>
                    </div>
                    <div id="reportOutput" ref={reportRef} className="report-output-container"> {/* Using a class instead of inline style */}
                        <h3>Relatório Financeiro Gerado</h3>
                        <p><strong>Tipo:</strong> {report.type === 'pricing' ? 'Precificação' : 'Prejuízo de GAP'}</p>
                        <p>{report.message}</p>
                        {report.summary && report.type === 'pricing' && (
                            <div>
                                <p>Preço Base: <strong>{formatCurrency(report.summary.basePrice)}</strong></p>
                                <p>Preço Final Sugerido: <strong>{formatCurrency(report.summary.finalPrice)}</strong></p>
                            </div>
                        )}
                        {report.summary && report.type === 'gap' && (
                            <div>
                                <p>Prejuízo Anual Estimado: <strong>{formatCurrency(report.summary.annualLoss)}</strong></p>
                                <p>Potencial de Economia Anual: <strong>{formatCurrency(report.summary.annualSavings)}</strong></p>
                                <p>Impacto Líquido: <strong>{formatCurrency(report.summary.netImpact)}</strong></p>
                                <h4>Projeções:</h4>
                                <ul>
                                    <li>Prejuízo Diário: {formatCurrency(report.projections.dailyLoss)}</li>
                                    <li>Prejuízo Semanal: {formatCurrency(report.projections.weeklyLoss)}</li>
                                    <li>Prejuízo Mensal: {formatCurrency(report.projections.monthlyLoss)}</li>
                                    <li>Economia Diária: {formatCurrency(report.projections.dailySavings)}</li>
                                    <li>Economia Semanal: {formatCurrency(report.projections.weeklySavings)}</li>
                                    <li>Economia Mensal: {formatCurrency(report.projections.monthlySavings)}</li>
                                </ul>
                            </div>
                        )}
                        <p className="disclaimer-text">{report.disclaimer}</p> {/* Using a class */}
                    </div>
                </div>
            )}
        </div>
    );
}

// Inline styles are removed from here and will be moved to CSS classes or global styles

export default ReportGenerator;
