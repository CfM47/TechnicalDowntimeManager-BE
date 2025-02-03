import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';
import { ReportData } from '../core/utils';
import { IPlugin } from '../core/IPlugin';

/**
 * The `PDFReportPlugin` class implements the `IPlugin` interface and provides functionality
 * to generate detailed PDF reports from structured report data.
 * It uses the PDFKit library for PDF generation and supports creating styled tables
 * and headers within the generated PDF.
 */
export default class PDFReportPlugin implements IPlugin {
  /** @inheritdoc */
  name = 'PDFReportPlugin';
  /** @inheritdoc */
  version = '1.0.0';

  /**
   * Generates a styled table in the PDF document
   * @private
   * @param {PDFKit.PDFDocument} doc - PDFKit document instance
   * @param {ReportData} data - Structured report data for table generation
   */
  private generateTable(doc: PDFKit.PDFDocument, data: ReportData) {
    const { headers, data: tableRows } = data; // Renamed to tableRows
    const margin = 20;
    const pageWidth = doc.page.width - margin * 2;
    const colWidth = pageWidth / headers.length;

    const headerY = doc.y;

    // Draw header backgrounds
    headers.forEach((header, i) => {
      doc.rect(margin + i * colWidth, headerY, colWidth, 40).fill('#22c55e');
    });

    // Draw header text
    headers.forEach((header, i) => {
      doc
        .fillColor('#FFFFFF')
        .font('Helvetica-Bold')
        .fontSize(10)
        .text(header.toUpperCase(), margin + i * colWidth + 5, headerY + 5, {
          width: colWidth - 10,
          align: 'left'
        });
    });

    doc.y = headerY + 20;
    doc.moveDown(0.5);

    // Use the renamed tableRows variable
    tableRows.forEach((row, rowIndex) => {
      const y = doc.y;

      if (rowIndex % 2 === 0) {
        doc.rect(margin, y, pageWidth, 40).fill('#F5F5F5');
      }

      headers.forEach((header, colIndex) => {
        const value = row[header]?.toString() || '';
        doc
          .fillColor(rowIndex % 2 === 0 ? '#333333' : '#666666')
          .text(value, margin + colIndex * colWidth + 5, y + 5, {
            width: colWidth - 10,
            align: 'left'
          });
      });

      doc.moveDown(2);
    });
  }

  /**
   * Generates a PDF from the given report data
   * @param {ReportData} reportData - Structured report data for PDF generation
   * @returns {Promise<Buffer>} - A promise that resolves to a buffer containing the PDF data
   */
  async generate(reportData: ReportData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          margin: 50,
          size: 'A4',
          font: 'Helvetica'
        });

        const buffers: Buffer[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
          const pdfData = Buffer.concat(buffers);
          resolve(pdfData);
        });

        // Header Section
        const startY = 50;
        doc
          .fillColor('#22c55e')
          .fontSize(18)
          .text(reportData.reportName, 50, startY, { align: 'left' });

        doc
          .fillColor('#666666')
          .fontSize(10)
          .text(`Report ID: ${uuidv4()}`, 50, startY + 30)
          .text(`Generated: ${new Date().toLocaleString()}`, 50, startY + 45);

        doc.moveDown(4);

        // Generate Table
        this.generateTable(doc, reportData);

        // Footer
        doc.on('pageAdded', () => {
          doc
            .fontSize(8)
            .fillColor('#666666')
            .text(`Page ${doc.bufferedPageRange().count}`, 50, doc.page.height - 40);
        });

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }
}
