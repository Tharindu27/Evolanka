import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export type AdminCredentialsMail = {
  to: string;
  roleLabel: string;
  password: string;
  invitedBy: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter?: Transporter;

  constructor() {
    const host = process.env.SMTP_HOST;
    if (!host) return;

    const port = Number(process.env.SMTP_PORT ?? 587);
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }

  async sendAdminCredentials({ to, roleLabel, password, invitedBy }: AdminCredentialsMail) {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/admin-login`;
    const subject = 'Your EVOLANKA admin account';
    const text = [
      `You have been added as ${roleLabel} on the EVOLANKA admin portal by ${invitedBy}.`,
      '',
      `Sign in at: ${loginUrl}`,
      `Username: ${to}`,
      `Password: ${password}`,
      '',
      'You can change this password from Admins & Settings after signing in.',
    ].join('\n');
    const html = `
      <p>You have been added as <strong>${escapeHtml(roleLabel)}</strong> on the EVOLANKA admin portal by ${escapeHtml(invitedBy)}.</p>
      <p><a href="${escapeHtml(loginUrl)}">Sign in to the admin portal</a></p>
      <p>Username: <strong>${escapeHtml(to)}</strong><br />Password: <strong>${escapeHtml(password)}</strong></p>
      <p>You can change this password from Admins &amp; Settings after signing in.</p>`;

    if (!this.transporter) {
      if (process.env.NODE_ENV === 'production') {
        throw new ServiceUnavailableException('Email service is not configured');
      }
      // Development fallback so the flow can be tried without an SMTP account.
      this.logger.warn(`SMTP_HOST is not set, so no email was sent. Message for ${to}:\n${text}`);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM || process.env.SMTP_USER || 'EVOLANKA <no-reply@evolanka.com>',
        to,
        subject,
        text,
        html,
      });
    } catch (error) {
      this.logger.error(`Failed to send admin credentials email to ${to}`, error instanceof Error ? error.stack : undefined);
      throw new ServiceUnavailableException('Could not send the credentials email, so the admin was not created. Please try again.');
    }
  }
}
