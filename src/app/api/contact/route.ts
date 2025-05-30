const nodemailer = require('nodemailer');

export async function POST(request: Request) {
  const data = await request.json();
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Your Personal Website" <asterb96@gmail.com>',
    to: 'asterb@me.com',
    subject: `${data.firstName} ${data.lastName} New Contact Form Filled✔`,
    text: `${data.message}`, // plain‑text body
    html: `<p>email: ${data.email} <p>${data.message}</p>`, // HTML body
  });

  return new Response('success', { status: info.messageId ? 200 : 500 });
}
