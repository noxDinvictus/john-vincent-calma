import html2canvas from 'html2canvas';
import { jsPDF as JSPDF } from 'jspdf';

declare global {
  interface Array<T> {
    last(): T | -1;
  }

  interface String {
    fullName(): string;
  }
}

String.prototype.fullName = function () {
  return '';
};

Array.prototype.last = function () {
  return this.length > 0 ? this[this.length - 1] : -1;
};

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * single download page of pdf
 */
export async function downloadPDF(name: string, title: string) {
  const pdf = new JSPDF({
    orientation: 'p',
    unit: 'mm', // Using 'mm' as the unit for A4 dimensions
    format: 'a4', // Set page format to A4
  });

  await printToPdf(name, pdf);

  pdf.save(`${title}.pdf`);
}

export async function printToPdf(name: string, pdf: JSPDF) {
  const content = document.getElementById(`printable-name-${name}`);

  if (!content) return;

  try {
    // Ensure styles are properly applied before capturing
    const computedStyles = window.getComputedStyle(content);
    content.style.backgroundColor = computedStyles.backgroundColor; // Force background color

    const canvas = await html2canvas(content, {
      scale: 2, // Improve quality
      useCORS: true, // Fix cross-origin images if any
      backgroundColor: null, // Ensures transparency isn't replaced with white
    });

    const imgData = canvas.toDataURL('image/png');

    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgWidth,
      imgHeight > pageHeight ? pageHeight : imgHeight,
    );
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  }
}
