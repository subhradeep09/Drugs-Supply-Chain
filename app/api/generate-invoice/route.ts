import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  const order = await req.json();

  const html = generateInvoiceHTML(order);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=Invoice_${order.orderId}.pdf`,
    },
  });
}

function generateInvoiceHTML(order: any): string {
  const date = new Date().toLocaleDateString();

  // ⚠ Make sure your order object contains 'price' and 'quantity'
  const pricePerUnit = order.price;  // price from order data
  const quantity = order.quantity;

  const productValue = pricePerUnit * quantity;
  const cgst = productValue * 0.09;
  const sgst = productValue * 0.09;
  const grandTotal = productValue + cgst + sgst;

  return `
  <html>
  <head>
    <style>
      body { font-family: 'Arial', sans-serif; margin: 0; padding: 40px; background: #f7f7f7; }
      .invoice-box { background: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.15); }
      .header { display: flex; justify-content: space-between; align-items: center; }
      .header img { height: 80px; }
      h1 { font-size: 28px; margin: 0; }
      .info { margin-top: 20px; }
      .info p { margin: 4px 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 30px; }
      table, th, td { border: 1px solid #ddd; }
      th, td { padding: 12px; text-align: center; }
      th { background: #f2f2f2; }
      .totals { margin-top: 20px; float: right; width: 400px; }
      .totals table { border: none; width: 100%; }
      .totals td { text-align: right; padding: 8px 0; }
      .footer { margin-top: 100px; text-align: center; color: #777; font-size: 12px; }
      .signature { margin-top: 80px; text-align: right; }
      .signature-line { margin-top: 50px; border-top: 1px solid #000; width: 200px; float: right; text-align: center; }
    </style>
  </head>
  <body>
    <div class="invoice-box">
      <div class="header">
        <div>
          <h1>INVOICE</h1>
          <p><strong>Invoice ID:</strong> ${order.orderId}</p>
          <p><strong>Date:</strong> ${date}</p>
        </div>
        <div>
          <img src="http://localhost:3000/logo.png" alt="Company Logo" style="height: 300px;" />

        </div>
      </div>

      <div class="info">
        <p><strong>Bill To:</strong> ${order.hospitalName || order.pharmacyName}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${order.medicineName}</td>
            <td>₹${pricePerUnit.toFixed(2)}</td>
            <td>${quantity}</td>
            <td>₹${productValue.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div class="totals">
        <table>
          <tr><td>Description</td><td>Amount</td></tr>
          <tr><td>Product Value</td><td>₹${productValue.toFixed(2)}</td></tr>
          <tr><td>CGST @9%</td><td>₹${cgst.toFixed(2)}</td></tr>
          <tr><td>SGST @9%</td><td>₹${sgst.toFixed(2)}</td></tr>
          <tr><td><strong>Grand Total</strong></td><td><strong>₹${grandTotal.toFixed(2)}</strong></td></tr>
        </table>
      </div>

      <div style="clear: both;"></div>

      <div class="signature">
        <p>Authorized Signature</p>
        <div class="signature-line">Signature</div>
      </div>

      <div class="footer">
        <p>Thank you for your business!</p>
        <p>Contact: support@hospital.com | +91 99999 99999</p>
      </div>
    </div>
  </body>
  </html>`;
}
