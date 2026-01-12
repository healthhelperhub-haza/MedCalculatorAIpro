
import { jsPDF } from 'jspdf';

interface PDFReportData {
  patientRef: string;
  calculatorName: string;
  result: string;
  unit: string;
  interpretation?: string;
  aiBrief?: string;
  date: string;
}

export const generateClinicalPDF = async (data: PDFReportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header Branding
  doc.setFillColor(37, 99, 235); // Blue-600
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('MedCalc AI Pro', 15, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Professional Clinical Suite', 15, 32);
  
  const reportDate = new Date(data.date).toLocaleString();
  doc.text(`Report Generated: ${reportDate}`, pageWidth - 15, 25, { align: 'right' });

  // Patient Info Section
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('PATIENT IDENTIFICATION', 15, 55);
  
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.setFontSize(14);
  doc.text(data.patientRef || 'Unnamed Patient', 15, 65);
  doc.line(15, 68, pageWidth - 15, 68);

  // Results Section
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text('CALCULATION DETAILS', 15, 85);
  
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(`Tool: ${data.calculatorName}`, 15, 95);
  
  // Highlighted Result Box
  doc.setFillColor(248, 250, 252); // Slate-50
  doc.roundedRect(15, 105, pageWidth - 30, 35, 3, 3, 'F');
  
  doc.setFontSize(32);
  doc.setTextColor(37, 99, 235);
  doc.text(`${data.result} ${data.unit}`, pageWidth / 2, 125, { align: 'center' });
  
  if (data.interpretation) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(data.interpretation, pageWidth / 2, 135, { align: 'center' });
  }

  // AI Brief Section
  if (data.aiBrief) {
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.text('CLINICAL INTELLIGENCE (AI)', 15, 155);
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    const splitBrief = doc.splitTextToSize(`"${data.aiBrief}"`, pageWidth - 30);
    doc.text(splitBrief, 15, 165);
  }

  // Footer Disclaimer
  const footerY = 275;
  doc.setDrawColor(226, 232, 240); // Slate-200
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // Slate-400
  const disclaimer = 'DISCLAIMER: This report is a clinical decision support tool. It is not a substitute for professional medical judgment. All calculations and AI interpretations must be verified by a qualified healthcare professional before clinical application.';
  const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 30);
  doc.text(splitDisclaimer, 15, footerY);

  // Save the PDF
  const fileName = `MedCalc_${data.calculatorName.replace(/\s+/g, '_')}_${data.patientRef.replace(/\s+/g, '_') || 'Report'}.pdf`;
  doc.save(fileName);
};
