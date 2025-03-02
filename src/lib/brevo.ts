import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

const smtpEmail = new brevo.SendSmtpEmail();

export const sendEmail = async ({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: string;
}) => {
  smtpEmail.subject = subject;
  smtpEmail.htmlContent = content;
  smtpEmail.sender = {
    email: "sakibhassan.webdev@gmail.com",
    name: "Furnito",
  };
  smtpEmail.to = [{ email: to }];

  return await apiInstance.sendTransacEmail(smtpEmail);
};
