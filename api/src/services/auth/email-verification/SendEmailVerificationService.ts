import path from "path";
import { User } from "../../../entities/User";
import { AppError, getErrorMessage } from "../../../middleware/error-handler";
import { createTokenService } from "../../../middleware/JwtService";
import EtherealMail from "../../mail/utils/EtherealMail";
import SESMail from "../../mail/utils/SESmail";
import { getUserByEmail } from "../../user/user-service";
import mailConfig from "../../mail/utils/mail";


export const SendEmailVerificationService = async (email: string) => {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    try {
      const resetToken = createTokenService({ email: user.email }, true);
      await User.update(user.id, { resetPasswordToken: resetToken.access_token });
      await sendEmailVerification(user, resetToken.access_token);
    } catch (error) {
      throw new AppError(getErrorMessage(error), 500);
    }
  };
  
  export const sendEmailVerification = async (user: User, token: string) => {
    try {
      const emailVerificationTemplate = path.resolve(
        __dirname,
        "../../mail/",
        "views",
        "verify_email.hbs",
      );
      const userName = `${user.firstName} ${user.lastName}`;
      const mailService = getMailService();
  
      await mailService.sendMail({
        to: { name: userName, email: user.email },
        subject: "Email Verification",
        templateData: {
          file: emailVerificationTemplate,
          variables: {
            name: userName,
            link: `${process.env.APP_WEB_URL}/emailverification?token=${token}`,
          },
        },
      });
    } catch (error) {
      throw new AppError(getErrorMessage(error), 500);
    }
  };
  
  const getMailService = () => {
    return mailConfig.driver === "ses" ? SESMail : EtherealMail;
  };
  