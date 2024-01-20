import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { cookieParser } from "../utils/utils";
import { getUserByEmail, getUserById } from "../services/user/user-service";
dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createTokenService = (
  payload: any,
  refresh = false,
  res?: Response
) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: 24 * 60 * 60, // 24 hours
    }
  );
  // Set JWT as an HTTP-Only Cookie
  if (res) {
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
  }
  return {
    access_token: accessToken,
    refresh_token: refresh
      ? jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
          expiresIn: 24 * 60 * 60,
        })
      : null,
  };
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authCookie = req.cookies.jwt;
  if (!authCookie) {
    return res.status(405).json({ errors: { msg: "No token provided" } });
  }

  const decoded = verifyToken(authCookie);
  if (!decoded || typeof decoded == "string")
    return res.status(401).json({ errors: { msg: "Unauthorized" } });

  const user = await getUserByEmail(decoded.email);
  if (!user?.verified) {
    return res.status(401).json({ errors: { msg: "Unauthorized" } });
  }

  next();
};

export const grantNewAccessToken = (req: Request, res: Response) => {
  const token = cookieParser("refresh_token", req.headers.cookie as string);
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded == "string")
    res.status(405).json({ errors: { msg: "invalid token" } });
  else {
    const newAccessToken = createTokenService(
      { email: decoded.email },
      false,
      res
    );
    res.send({
      message: "New access token granted",
      access_token: newAccessToken.access_token,
    });
  }
};
