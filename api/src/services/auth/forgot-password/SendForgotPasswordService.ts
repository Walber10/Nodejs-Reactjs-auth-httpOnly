import { getUserByEmail } from "../../../controller/user.controller";
import { createToken } from "../../../controller/jwt.controller";
import { AppError } from "../../../middleware/error-handler";
import EtherealMail from "../../mail/utils/EtherealMail";
import SESMail from "../../mail/utils/SESmail";
import mailConfig from "../../mail/utils/mail";
import path from "path";

export const SendForgotPasswordEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const token = createToken({ email: user.email }, true);
  const forgotPasswordTemplate = path.resolve(
    __dirname,
    "..",
    "views",
    "forgot_password.hbs"
  );
  const userName = user.firstName + " " + user.lastName;
  const mailService = mailConfig.driver === "ses" ? SESMail : EtherealMail;
  await mailService.sendMail({
    to: {
      name: userName,
      email: user.email,
    },
    subject: "Recovery Password",
    templateData: {
      file: forgotPasswordTemplate,
      variables: {
        name: userName,
        link: `${process.env.APP_WEB_URL}/reset_password?token=${token.access_token}`,
      },
    },
  });
};
