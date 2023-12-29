import express from "express";
import { Router } from "express";
import authenticateUser from "../middleware/authenticate-user";
import { deleteUser, getUsers } from "../controller/user.controller";

const userRoutes = Router();

userRoutes.get("/users", getUsers);
userRoutes.delete("user/:id", authenticateUser, deleteUser);

export default userRoutes;
