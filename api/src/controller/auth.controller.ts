import { isAuth } from './../middleware/JwtService';
import { hash } from "bcrypt";
import { LoginRequest, LoginResponse } from "./../schema/auth.schema";
import { Request, Response } from "express";
import * as AuthService from "../services/auth/auth-service";
import { ForgotPasswordService } from "../services/auth/forgot-password/ForgotPasswordService";
import { AppError, getErrorMessage } from "../middleware/error-handler";
import { User } from "../entities/User";
import { verifyUserByEmailToken } from "../services/auth/email-verification/VerifyUserService";

export const authController = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "success", isAuth: true });
  } catch (error) {
    throw new AppError(getErrorMessage(error));
  }
};

export const loginController = async (
  req: Request,
  res: Response<LoginResponse>
) => {
  try {
    const { email, password }: LoginRequest = req.body;
    const token = await AuthService.loginUserService(email, password, res);
    return res.status(200).json({
      userName: token.user.firstName + " " + token.user.lastName,
      token: token.access_token,
    });
  } catch (error) {
    throw new AppError("Invalid credentials", 400);
  }
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await ForgotPasswordService(email);
    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    throw new AppError(getErrorMessage(error));
  }
};

export const getResetPasswordController = async (
  req: Request,
  res: Response
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

export const emailVerificationController = async (
  req: Request,
  res: Response
) => {
  try {
    const { token } = req.params;
    const result = await verifyUserByEmailToken(token);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: getErrorMessage(error) });
  }
};
