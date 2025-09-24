export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const calculateProgress = (section) => {
  if (!section) return 0;

  const completedFields = Object.values(section).filter(val =>
    val !== null && val !== '' && val !== undefined
  ).length;

  const totalFields = Object.keys(section).length;
  return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
};

export const downloadPDF = async (elementId, fileName) => {
  const { default: html2canvas } = await import('html2canvas');
  const { default: jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element);
  const pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
  pdf.save(`${fileName}.pdf`);
};
