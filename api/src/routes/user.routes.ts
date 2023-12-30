import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
} from "../controller/user.controller";
import { isAuth } from "../middleware/JwtService";

const userRoutes = Router();

userRoutes.get("/users", isAuth, getUsersController);
userRoutes.delete("user/:id", isAuth, deleteUserController);

export default userRoutes;

