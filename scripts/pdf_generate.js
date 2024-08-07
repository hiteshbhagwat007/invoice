document.getElementById('generate-pdf').addEventListener('click', function() {
  console.log("Generate PDF button clicked");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(12);
  doc.text('INVOICE', 20, 20);

  // Company details
  doc.setFontSize(18);
  doc.setTextColor(27, 62, 152);
  doc.text('Iconicpages IT Solution', 20, 40);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text('Plot 21 Chikhali Rd, Amar Nagar, Manewada, Nagpur, MH 440031', 20, 45);
  doc.line(10, 10, 10, 10);

  // Client details
  const clientName = $('#client-name').val();
  const clientEmail = $('#client-email').val();
  const invoiceNumber = $('#invoice-number').val();
  const invoiceDate = $('#invoice-date').val();

  if (!invoiceDate) {
    alert("Please enter the invoice date.");
    return;
  }

  const dueDate = new Date(invoiceDate);
  dueDate.setDate(dueDate.getDate() + 14);

  doc.text('BILL TO', 20, 60);
  doc.text(clientName, 20, 65);
  doc.text(clientEmail, 20, 70);

  // Invoice details
  doc.text('Invoice No.: ' + invoiceNumber, 150, 40);
  doc.text('Issue date: ' + invoiceDate, 150, 45);
  doc.text('Due date: ' + dueDate.toISOString().split('T')[0], 150, 50);

  // Services table
  const services = [];
  $('.service').each(function() {
    const description = $(this).find('.service-description').val();
    const rate = parseFloat($(this).find('.service-rate').val());
    const quantity = parseFloat($(this).find('.service-quantity').val());
    services.push({ description, rate, quantity });
  });

  const tableBody = services.map(service => [
    service.description,
    service.quantity.toString(),
    service.rate.toFixed(2),
    (service.rate * service.quantity).toFixed(2)
  ]);

  doc.autoTable({
    startY: 80,
    head: [['DESCRIPTION', 'QUANTITY', 'UNIT PRICE (Rs)', 'AMOUNT (Rs)']],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [27, 62, 152],
      textColor: [255, 255, 255]
    }
  });

  // Calculate total
  const totalAmount = services.reduce((acc, service) => acc + (service.rate * service.quantity), 0);

  // Total amount
  doc.text('TOTAL (Rs):', 20, doc.autoTable.previous.finalY + 10);
  doc.text(totalAmount.toFixed(2) + ' Rs', 150, doc.autoTable.previous.finalY + 10);

  doc.save('invoice.pdf');
});
