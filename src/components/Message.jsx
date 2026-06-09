function downloadPDF() {
  console.log("PDF Text:", text);
  const doc = new jsPDF();

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Hampi Heritage Guide", 10, 20);

  // Content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  // Convert text safely to string
  const cleanText = String(text || "");

  const lines = doc.splitTextToSize(
    cleanText,
    180
  );

  doc.text(lines, 10, 35);

  const pdfBlob = doc.output("blob");
const pdfUrl = URL.createObjectURL(pdfBlob);

window.open(pdfUrl, "_blank");
}