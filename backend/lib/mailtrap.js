import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MAILTRAP_TOKEN);
console.log(process.env.EMAIL_FROM);

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_FROM_NAME,
};
