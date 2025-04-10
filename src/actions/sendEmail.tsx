'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!email || !subject || !message) {
    return { success: false, error: 'All fields are required' };
  }

  try {
    await resend.emails.send({
      from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: "ketsebaot_ertumo@phoenixopia.com",
      subject: subject,
      html: `<p>Email:${email} <br/> Subject:${subject} <br/> Message:${message}</p>`
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}