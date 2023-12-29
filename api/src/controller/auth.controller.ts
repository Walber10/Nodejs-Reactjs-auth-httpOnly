import { Request, Response } from "express";
import * as AuthService from "../services/auth/auth-service";
import { SendForgotPasswordEmail } from "../services/auth/forgot-password/SendForgotPasswordService";
import { ResetPassword } from "../services/auth/reset-password/ResetPasswordService";

export const registerUser = async (req: Request, res: Response) => {
  const token = await AuthService.registerUser(req.body);
  return res.status(200).json({
    message: "User created successfully",
    token,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await AuthService.loginUser(email, password);
  return res.status(200).json({
    message: "User created successfully",
    token,
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  await SendForgotPasswordEmail(email);
  return res.status(200).json({
    message: "Email sent successfully",
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  await ResetPassword({ token, password });
  return res.status(200).json({
    message: "Password reset successfully",
  });
};
