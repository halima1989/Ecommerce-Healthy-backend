import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { Order, User } from '@prisma/client';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get('SMTP_HOST'),
      port: Number(this.config.get('SMTP_PORT')),
      secure: process.env.MAILER_SECURE === 'false',
      auth: {
        user: this.config.get('SMTP_EMAIL'),
        pass: this.config.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendUserConfirmation(user: User, token: string) {
    const url = `${this.config.get('SERVER_URL')}/auth/activate/${token}`;

    const emailHtml = `<p>Hey ${user.name},</p>
        <p>You requested an account creation on Healthy</p>
        <a href='${url}'>Click here to activate your account</a>
        <p>If you did not request this email you can safely ignore it.</p>`;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! Confirm your Email',
      html: emailHtml,
    });
  }

  async sendUserOrderInprocess(user: User, order: Order) {
    const url = 'https://google.com';
    const emailBody = `
        <p>Hey ${user.name}</p>
        <p>You have order in our web site:</p>
            <a href='${url}'>Number:${order.id}</a>
        <p>Total amout : ${order.totalAmount} euros</p>
        <p>status: ${order.status}</p>
        <p>Thank you for using our service!
        Best regards,
       </p>
    `;

    await this.transporter.sendMail({
      from: this.config.get('SMTP_EMAIL'),
      to: user.email,
      subject: 'Welcome user! notification new order',
      html: emailBody,
    });
  }
}
