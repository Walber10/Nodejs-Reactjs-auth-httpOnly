import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../data-source";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.send(users);
  return res.status(200).json({
    users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findBy({ id: parseInt(req.params.id) });
  if (!user) {
    return res.status(404).send({ errors: { message: "User not found" } });
  }
  return res.status(200).json({
    user,
  });
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.update(req.params.id, req.body);
  return res.status(200).json({
    user,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findBy({ id: parseInt(req.params.id) });
  if (!user) {
    return res.status(404).send({ errors: { message: "User not found" } });
  }
  await AppDataSource.manager.delete(User, req.params.id);
  return res.status(200).json({
    message: "User deleted successfully",
  });
};
