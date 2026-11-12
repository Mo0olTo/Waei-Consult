// email js configuration 
export const EMAILJS_CONFIG = {
  // TODO(EmailJS): Account → General → "Public Key".
  publicKey: 'ioTGZ2ysTkq2NKtAJ',

  // TODO(EmailJS): Email Services → the SMTP service → "Service ID".
  // SMTP settings to enter there: host mail.privateemail.com, port 465, SSL on,
  // user = full mailbox (e.g. info@your-domain.com), password = mailbox password.
  serviceId: 'service_p5ny4jj',

  // TODO(EmailJS): Email Templates → contact template → "Template ID".
  // Variables: {{name}} {{email}} {{phone}} {{company}} {{services}} {{message}}
  // Set "Reply To" to {{email}} and "To Email" to your inbox.
  contactTemplateId: 'template_zsg3k2g',

  // TODO(EmailJS): Email Templates → diagnosis template → "Template ID".
  // Variables: {{name}} {{company}} {{location}} {{business}} {{problem}}
  // {{duration}} {{attempted}} {{nextStep}} {{whatsapp}}
  diagnosisTemplateId: 'template_9xa8z6d',
} as const;
