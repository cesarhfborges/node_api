import * as brevo from "@getbrevo/brevo";
import * as dotenv from "dotenv";

dotenv.config();

class BrevoMail {

  private client = new brevo.TransactionalEmailsApi();
  private apiKey: string = process.env.BREVO_API_KEY ?? "";

  constructor() {
    this.client.setApiKey(0, this.apiKey);
  }

  async sendMail(data: { mailData: any; template?: string; attachments?: any[] }): Promise<boolean> {
    try {
      const { mailData, template, attachments } = data
      const { receivers, subject, params, sender } = mailData
      // const emailTemplateSource = fs.readFileSync(`src/mailer/templates/${template}.html`, 'utf8')

      await this.client.sendTransacEmail({
        sender: sender,
        to: receivers,
        subject: subject,
        templateId: 1,
        params: {
          ...params
        },
        attachment: attachments && attachments.length > 0 ? attachments : null!
      })

      return true
    } catch (error) {
      console.log('ERROR SENDING EMAIL: ', error)
      return false
    }
  }
}

export default BrevoMail;