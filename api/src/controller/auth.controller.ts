import { Request, Response } from "express";
import * as AuthService from "../services/auth-service";

export const registerUser = async (
  req: Request,
  res: Response
) => {
  const result = await AuthService.registerUser(req.body);
  return res.send(result);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUser(email, password);
  return res.send(result);
};
