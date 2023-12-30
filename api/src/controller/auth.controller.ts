import { hash } from "bcrypt";
import { CreateSessionInput } from "./../schema/auth.schema";
import { Request, Response } from "express";
import * as AuthService from "../services/auth/auth-service";
import { SendForgotPasswordEmail } from "../services/auth/forgot-password/SendForgotPasswordService";
import { AppError, getErrorMessage } from "../middleware/error-handler";
import { User } from "../entities/User";

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: CreateSessionInput = req.body;
    const token = await AuthService.loginUserService(email, password);
    return res.status(200).send({ token });
  } catch (error) {
    throw new AppError(getErrorMessage(error));
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await SendForgotPasswordEmail(email);
    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    throw new AppError(getErrorMessage(error));
  }
};

export const getResetPasswordController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
      return res
        .status(404)
        .send({ message: `We were unable to find a user for this token.` });
    }

    if (user.resetPasswordToken !== token)
      return res.status(400).send({
        message:
          "User token and your token didn't match. You may have a more recent token in your mail list.",
      });

    const hashedPassword = await hash(password, 10);

    await User.update(user.id, { password: hashedPassword });

    return res
      .status(200)
      .send({ message: "The account has been verified. Please log in." });
  } catch (error) {
    throw new AppError(getErrorMessage(error));
  }
};
