import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { getUserByEmail } from "./user.controller";
import { createToken } from "./jwt.controller";
import { User } from "../entities/User";
import AppDataSource from "../data-source";

export const register = async (req: Request, res: Response) => {
  const user = await getUserByEmail(req.body.email);
  if (user) {
    return res.status(400).json({ errors: { msg: "User already exists" } });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
    });

    const token = createToken({ email: newUser.email }, true);

    res.cookie("refresh_token", token.refresh_token, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string) *
            30 *
            24 *
            360000
      ),
      httpOnly: true,
    });

    await AppDataSource.manager.save(user);
    res.send({ user, access_token: token.access_token });
  }
};

export const login = async (req: Request, res: Response) => {
  const user = await getUserByEmail(req.body.email);
  if (!user) {
    return res
      .status(400)
      .json({ errors: { msg: "You have to register first." } });
  } else {
    const validatePassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (validatePassword) {
      const token = createToken({ email: user.email }, true);

      res.cookie("refresh_token", token.refresh_token, {
        expires: new Date(
          Date.now() +
            parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string) *
              30 *
              24 *
              360000
        ),
        httpOnly: true,
      });
      res.send({ user, access_token: token.access_token });
    } else {
      return res.status(400).json({ errors: { msg: "Wrong password." } });
    }
  }
};
