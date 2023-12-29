import { createToken } from "../../jwt/JwtService";
import { AppError } from "../../../middleware/error-handler";
import EtherealMail from "../../mail/utils/EtherealMail";
import SESMail from "../../mail/utils/SESmail";
import mailConfig from "../../mail/utils/mail";
import path from "path";
import { getUserByEmail, updateUser } from "../../user/user-service";
import { User } from "../../../entities/User";

export const SendForgotPasswordEmail = async (email: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  try {
    const resetToken = createToken({ email: user.email }, true);
    await updateUser(user.id, resetToken.access_token);
    await sendEmail(user, resetToken.access_token);
  } catch (error) {
    console.error("Error in SendForgotPasswordEmail:", error);
    throw new AppError("Failed to send forgot password email");
  }
};

const sendEmail = async (user: User, resetToken: string) => {
  try {
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "../../mail/",
      "views",
      "forgot_password.hbs"
    );
    const userName = `${user.firstName} ${user.lastName}`;
    const mailService = getMailService();

    await mailService.sendMail({
      to: { name: userName, email: user.email },
      subject: "Recovery Password",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: userName,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${resetToken}`,
        },
      },
    });
  } catch (error) {
    throw new AppError("Failed to send the email");
  }
};

const getMailService = () => {
  return mailConfig.driver === "ses" ? SESMail : EtherealMail;
};
