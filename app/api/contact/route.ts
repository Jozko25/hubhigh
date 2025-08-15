import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, website, investment, goals, openness } = body;

    // Validate required fields
    if (!name || !phone || !email || !website || !investment || !goals || !openness) {
      return NextResponse.json(
        { error: 'Všetky polia sú povinné' },
        { status: 400 }
      );
    }

    // Debug log environment variables (without passwords)
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      from: process.env.SMTP_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      userEmail: email
    });

    // Create transporter with Hostinger/TitanMail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      requireTLS: true, // Force TLS
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      // Additional options for better compatibility
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Slovak professional email template
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="sk">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nová správa z kontaktného formulára - HubHigh</title>
      <style>
        * { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: #f5f5f5;
          padding: 20px;
          line-height: 1.6;
          color: #333333;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }
        
        .email-header {
          background: #4a148c;
          color: white;
          padding: 30px;
          text-align: center;
        }
        
        .email-header h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }
        
        .email-header p {
          font-size: 16px;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }
        
        .priority-info {
          background: #6a1b9a;
          color: white;
          padding: 15px 30px;
          font-size: 15px;
          font-weight: 500;
          text-align: center;
        }
        
        .email-content {
          background: #ffffff;
        }
        
        .section {
          padding: 30px;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .section:last-child {
          border-bottom: none;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #4a148c;
          margin: 0 0 20px 0;
        }
        
        .field-grid {
          display: grid;
          gap: 15px;
        }
        
        .field {
          background: #f8f9fa;
          padding: 18px;
          border-radius: 6px;
          border-left: 3px solid #4a148c;
        }
        
        .field-label {
          font-size: 13px;
          font-weight: 600;
          color: #4a148c;
          margin-bottom: 5px;
        }
        
        .field-value {
          font-size: 16px;
          font-weight: 500;
          color: #333333;
          word-break: break-word;
        }
        
        .field-value.highlight {
          color: #6a1b9a;
          font-weight: 600;
        }
        
        .field-value.investment {
          color: #4a148c;
          font-weight: 700;
          font-size: 18px;
        }
        
        .goals-text {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 6px;
          border-left: 3px solid #4a148c;
          font-size: 15px;
          line-height: 1.6;
          color: #333333;
          margin-bottom: 15px;
        }
        
        .status-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }
        
        .status-positive {
          background: #4a148c;
          color: white;
        }
        
        .status-negative {
          background: #757575;
          color: white;
        }
        
        .action-section {
          background: #f8f9fa;
          text-align: center;
          padding: 35px 30px;
        }
        
        .action-title {
          font-size: 20px;
          font-weight: 600;
          color: #333333;
          margin: 0 0 10px 0;
        }
        
        .action-subtitle {
          font-size: 15px;
          color: #666666;
          margin: 0 0 25px 0;
        }
        
        .call-button {
          display: inline-block;
          background: #4a148c;
          color: white;
          padding: 12px 30px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
        }
        
        .email-footer {
          background: #f8f9fa;
          color: #666666;
          padding: 25px 30px;
          text-align: center;
          font-size: 13px;
          line-height: 1.5;
          border-top: 1px solid #e0e0e0;
        }
        
        .timestamp {
          margin-top: 10px;
          color: #999999;
          font-weight: 500;
        }
        
        @media (max-width: 600px) {
          .email-header, .section, .action-section, .email-footer {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Nová správa z webu</h1>
          <p>Kontaktný formulár - HubHigh.com</p>
        </div>
        
        <div class="priority-info">
          Rozpočet: ${getInvestmentLabel(investment)} • Telefón: ${phone}
        </div>
        
        <div class="email-content">
          <div class="section">
            <h2 class="section-title">Kontaktné údaje</h2>
            <div class="field-grid">
              <div class="field">
                <div class="field-label">Meno</div>
                <div class="field-value">${name}</div>
              </div>
              <div class="field">
                <div class="field-label">Telefón</div>
                <div class="field-value highlight">${phone}</div>
              </div>
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value highlight">${email}</div>
              </div>
              <div class="field">
                <div class="field-label">Web stránka</div>
                <div class="field-value">${website}</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Rozpočet na reklamu</h2>
            <div class="field">
              <div class="field-label">Mesačný rozpočet</div>
              <div class="field-value investment">${getInvestmentLabel(investment)}</div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Ciele a potreby</h2>
            <div class="goals-text">${goals}</div>
            <div>
              <span class="status-badge ${openness === 'yes' ? 'status-positive' : 'status-negative'}">
                ${openness === 'yes' ? 'Otvorený novým možnostiam' : 'Zatiaľ nie je presvedčený'}
              </span>
            </div>
          </div>
          
          <div class="section action-section">
            <h3 class="action-title">Odporučené kroky</h3>
            <p class="action-subtitle">Kontaktujte zákazníka čo najskôr</p>
            <a href="tel:${phone}" class="call-button">Zavolať: ${phone}</a>
          </div>
          
          <div class="email-footer">
            <p><strong>HubHigh</strong><br>
            Digitálny marketing pre rast vášho biznisu</p>
            <div class="timestamp">Prijaté: ${new Date().toLocaleString('sk-SK')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send main notification email
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Lead: ${name} | ${getInvestmentLabel(investment)} | ${phone}`,
      html: htmlContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email bol úspešne odoslaný!' });
  } catch (error) {
    console.error('An error occurred during the email sending process:', error);
    
    // Determine if the error is from the main email or something else
    let errorMessage = 'Vyskytla sa chyba pri odosielaní emailu';
    if (error instanceof Error && error.message.includes('main notification')) {
        errorMessage = "Chyba pri odosielaní hlavného upozornenia."
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// Helper functions
function getInvestmentLabel(value: string) {
  const labels = {
    "under-500": "< 500€",
    "500-2000": "500 - 2 000€", 
    "2000-5000": "2 000 - 5 000€",
    "5000-20000": "5 000 - 20 000€",
    "over-20000": "20 000€ <"
  };
  return labels[value as keyof typeof labels] || value;
}

