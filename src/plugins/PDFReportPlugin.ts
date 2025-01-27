import { Router, Request, Response } from 'express';
import { IPlugin } from '../core/IPlugin';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface defining the structure of report data required for PDF generation
 * @interface ReportData
 * @property {string} reportName - The display name of the report
 * @property {string[]} headers - Array of column headers for the table
 * @property {Array<{[key: string]: any}>} data - Array of objects representing table rows
 */
interface ReportData {
  reportName: string;
  headers: string[];
  data: Array<{ [key: string]: any }>;
}

/**
 * PDF Report Generation Plugin implementing IPlugin interface
 * @class PDFReportPlugin
 * @implements {IPlugin}
 */
export class PDFReportPlugin implements IPlugin {
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
    const margin = 50;
    const pageWidth = doc.page.width - margin * 2;
    const colWidth = pageWidth / headers.length;

    const headerY = doc.y;

    // Draw header backgrounds
    headers.forEach((header, i) => {
      doc.rect(margin + i * colWidth, headerY, colWidth, 20).fill('#22c55e');
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
        doc.rect(margin, y, pageWidth, 20).fill('#F5F5F5');
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

      doc
        .strokeColor('#DDDDDD')
        .lineWidth(0.5)
        .moveTo(margin, y + 20)
        .lineTo(margin + pageWidth, y + 20)
        .stroke();

      doc.moveDown(2);
    });
  }

  /** @inheritdoc */
  initialize(router: Router): void {
    /**
     * POST endpoint handler for report generation
     * @route POST /generate-report
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     * @returns {Promise<any>} PDF file or error response
     * @throws {400} If invalid report format is provided
     * @throws {500} If report generation fails
     */
    router.post('/generate-report', async (req: Request, res: Response): Promise<any> => {
      try {
        const reportData: ReportData = req.body;
        const reportId = uuidv4();
        const generationDate = new Date().toLocaleString();

        // Validate input
        if (!reportData?.reportName || !reportData?.headers || !reportData?.data) {
          return res.status(400).send('Invalid report format');
        }

        const doc = new PDFDocument({
          margin: 50,
          size: 'A4',
          font: 'Helvetica'
        });

        // Create filename
        const safeName = reportData.reportName.replace(/[^a-z0-9]/gi, '_');
        const filename = `${safeName}_${Date.now()}_${reportId.slice(0, 8)}.pdf`;
        const filePath = path.join(__dirname, `../../reports/${filename}`);

        // Ensure directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        // Pipe output
        const fileStream = fs.createWriteStream(filePath);
        doc.pipe(fileStream);
        doc.pipe(res);

        // Header Section
        const startY = 50;
        doc
          .fillColor('#22c55e')
          .fontSize(18)
          .text(reportData.reportName, 50, startY, { align: 'left' });

        doc
          .fillColor('#666666')
          .fontSize(10)
          .text(`Report ID: ${reportId}`, 50, startY + 30)
          .text(`Generated: ${generationDate}`, 50, startY + 45);

        doc.moveDown(4);

        // Generate Table
        this.generateTable(doc, reportData);

        // Fixed: Proper footer implementation
        doc.on('pageAdded', () => {
          doc
            .fontSize(8)
            .fillColor('#666666')
            .text(
              `Page ${doc.bufferedPageRange().count}`,
              50,
              doc.page.height - 40 // Fixed: Calculate position properly
            );
        });

        doc.end();
      } catch (error) {
        console.error('Report generation failed:', error);
        res.status(500).send('Error generating report');
      }
    });
  }
}

/**
 * Module for generating PDF reports from structured JSON data
 * @module PDFReportPlugin
 * @requires express
 * @requires pdfkit
 * @requires uuid
 * @see {@link IPlugin} for base interface
 */
