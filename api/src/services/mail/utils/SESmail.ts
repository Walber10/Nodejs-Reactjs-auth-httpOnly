import nodemailer from "nodemailer";
import aws from "aws-sdk";
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";
import mailConfig from "./mail";

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    try {
      const transporter = nodemailer.createTransport({
        SES: new aws.SES({
          apiVersion: "2010-12-01",
          accessKeyId: process.env.AWS_ACCESS_KEY,
          region: process.env.AWS_REGION,
          secretAccessKey: process.env.AWS_SECRET,
        }),
      });
      const { email, name } = mailConfig.defaults.from;
      await transporter.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
      });
    } catch (error: any) {
      throw new Error("Failed to send mail: " + error.message);
    }
  }
}
