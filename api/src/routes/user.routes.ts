import express from "express";
import authenticateUser from "../middleware/authenticate-user";
import { deleteUser, getUsers } from "../controller/user.controller";

const userRoutes = express.Router();

userRoutes.get("/user", authenticateUser, getUsers);
userRoutes.delete("/:id", authenticateUser, deleteUser);

export default userRoutes;
