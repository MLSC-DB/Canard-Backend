import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import ejs from 'ejs';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

export default async function sendRegistrationMail(response) {
  const template = fs.readFileSync(path.join(__dirname, './emailTemplate/email.ejs'), 'utf-8');
  const emailHtml = ejs.render(template, { response });
  const info = await transporter.sendMail({
    from: `"MLSC DB" <${process.env.email}>`,
    to: response.email,
    subject: `${response.username} registered for Canard`,
    html: emailHtml,
  });
  console.log(info);
}

// sendRegistrationMail({ email: 'sample', username: 'sample', teamName: 'sample', });