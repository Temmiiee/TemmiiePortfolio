import { NextRequest, NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { devisId, reason } = await request.json();
    if (!devisId) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }
    const devis = await get(`signedDevis:${devisId}`);
    if (!devis) {
      return NextResponse.json({ error: 'Devis introuvable' }, { status: 404 });
    }
    if (
      typeof devis === 'object' && devis !== null &&
      'clientInfo' in devis && typeof devis.clientInfo === 'object' && devis.clientInfo !== null &&
      'email' in devis.clientInfo && typeof devis.clientInfo.email === 'string' &&
      'name' in devis.clientInfo && typeof devis.clientInfo.name === 'string' &&
      'devisNumber' in devis && typeof devis.devisNumber === 'string'
    ) {
      devis.status = 'rejected';
      devis.rejectionReason = reason || '';
      await fetch(`https://edge-config.vercel.com/${process.env.VERCEL_EDGE_CONFIG_ID}/items`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_EDGE_CONFIG_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: { [`signedDevis:${devisId}`]: devis } })
      });

      // Notification email au client et copie à l'admin
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@mattheo-termine.fr',
        to: devis.clientInfo.email,
        cc: process.env.SMTP_FROM || 'mattheotermine104@gmail.com',
        subject: `Votre projet est refusé`,
        html: `<h2>Bonjour ${devis.clientInfo.name},</h2>
          <p>Votre devis <strong>#${devis.devisNumber}</strong> a été refusé.</p>
          <p>Raison : ${devis.rejectionReason || 'Non précisée'}</p>
          <p>Vous pouvez répondre à cet email pour toute question.</p>
          <p>Cordialement,<br>Matthéo Termine</p>`
      };
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error("Erreur lors de l'envoi de l'email:", mailError);
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du refus', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
