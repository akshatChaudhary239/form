import puppeteer from 'puppeteer';
import { NextRequest } from 'next/server';

type FormData = {
  fullName: string;
  fatherName: string;
  propertySize: string;
  saleAmount: string;
  date: string;
};

export async function POST(req: NextRequest) {
  const data = (await req.json()) as FormData;

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; margin-bottom: 40px; }
          p { font-size: 18px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>Sale Deed</h1>
        <p>This Sale Deed is made on <strong>${data.date}</strong> between 
        <strong>${data.fullName}</strong>, S/o <strong>${data.fatherName}</strong>, 
        for a property of <strong>${data.propertySize} sq.ft.</strong>, 
        sold for ₹<strong>${data.saleAmount}</strong>.</p>
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="sale-deed.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return new Response(
      JSON.stringify({ error: 'PDF generation failed.' }),
      { status: 500 }
    );
  }
}
