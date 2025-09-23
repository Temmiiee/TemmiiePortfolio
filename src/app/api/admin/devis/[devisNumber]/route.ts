import { NextRequest, NextResponse } from 'next/server';
import { getDevisByNumber, updateDevisStatus } from '@/lib/devis-storage';
import { createEmailTransporter, sendEmailWithRetry } from '@/lib/email-utils';
import { createStatusNotificationTemplate } from '@/lib/devis-email-templates';
import { config, shouldLog } from '@/lib/config';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ devisNumber: string }> }
) {
  const { devisNumber } = await params;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    // Trouver le devis
    const devis = await getDevisByNumber(devisNumber);
    if (!devis) {
      const baseUrl = new URL(request.url).origin;
      return NextResponse.redirect(new URL('/admin/devis?error=not-found', baseUrl));
    }

    // Si pas d'action, juste afficher le devis
    if (!action) {
      return NextResponse.json(devis);
    }

    // Vérifier si le devis n'est pas déjà traité
    if (devis.status !== 'pending') {
      const baseUrl = new URL(request.url).origin;
      return NextResponse.redirect(
        new URL(`/admin/devis?error=already-processed&status=${devis.status}`, baseUrl)
      );
    }

    // Traiter l'action
    if (action === 'approve' || action === 'reject') {
      const newStatus = action === 'approve' ? 'approved' : 'rejected';
      const updatedDevis = await updateDevisStatus(devisNumber, newStatus);

      if (!updatedDevis) {
        const baseUrl = new URL(request.url).origin;
        return NextResponse.redirect(new URL('/admin/devis?error=update-failed', baseUrl));
      }

      // Envoyer un email de notification au client
      try {
        await sendStatusNotification(updatedDevis, newStatus);
      } catch (emailError) {
        if (shouldLog()) {
          if (shouldLog()) {
            console.error('Erreur envoi email de notification:', emailError);
          }
        }
        // On continue même si l'email échoue
      }

      // Rediriger vers l'admin avec succès
      const baseUrl = new URL(request.url).origin;
      return NextResponse.redirect(
        new URL(`/admin/devis?success=${action}&devis=${devisNumber}`, baseUrl)
      );
    }

    const baseUrl = new URL(request.url).origin;
    return NextResponse.redirect(new URL('/admin/devis?error=invalid-action', baseUrl));

  } catch (error) {
    if (shouldLog()) {
      if (shouldLog()) {
        console.error('Erreur dans l\'API admin devis:', error);
      }
    }
    const baseUrl = new URL(request.url).origin;
    return NextResponse.redirect(new URL('/admin/devis?error=server-error', baseUrl));
  }
}

// Fonction pour envoyer la notification de statut
async function sendStatusNotification(devis: { clientInfo: { name: string; email: string }; devisNumber: string; siteType: string; total: string; createdAt: string }, status: 'approved' | 'rejected') {
  let transporter;
  try {
    transporter = createEmailTransporter();
  } catch (transporterError) {
    if (shouldLog()) {
      console.error('Erreur de configuration SMTP pour notification:', transporterError);
    }
    throw transporterError; // Re-throw pour que l'appelant puisse gérer l'erreur
  }
  
  const statusText = status === 'approved' ? 'Approuvé' : 'Refusé';
  const statusEmoji = status === 'approved' ? '✅' : '❌';
  
  const htmlTemplate = createStatusNotificationTemplate(devis, status);

  const mailOptions = {
    from: config.email.from,
    to: devis.clientInfo.email,
    cc: config.email.admin,
    subject: `${statusEmoji} Votre devis #${devis.devisNumber} a été ${statusText.toLowerCase()}`,
    html: htmlTemplate,
  };

  await sendEmailWithRetry(transporter, mailOptions);
  if (shouldLog()) {
    console.log(`Email de notification ${status} envoyé à ${devis.clientInfo.email}`);
  }
}
