import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../data-source";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.send(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findBy({ id: parseInt(req.params.id) });
  if (!user) {
    res.status(404).send({ errors: { message: "User not found" } });
  } else {
    res.send(user);
  }
};

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } });
  return user;
};


export const updateUser = async (req: Request, res: Response) => {
  const user = await User.update(req.params.id, req.body);
  res.send({ message: "User updated successfully", user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findBy({ id: parseInt(req.params.id) });
  if (!user) {
    res.status(404).send({ errors: { message: "User not found" } });
  } else {
    await AppDataSource.manager.delete(User, req.params.id);
    res.send({ message: "User deleted successfully", user });
  }
};
