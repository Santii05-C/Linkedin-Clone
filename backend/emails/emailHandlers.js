import { mailtrapClient, sender } from "../lib/mailtrap.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
  const recipient = email[{ email }];

  try {
    const response = await mailtrapClient.send({
      form: sender,
      to: recipient,
      subject: "Welcome to Unlinked",
      html: createWelcomeEmailTemplate(name, profileUrl),
      category: "Welcome",
    });

    console.log("Welcome Email sent successfully", response);
  } catch (error) {
    throw error;
  }
};
