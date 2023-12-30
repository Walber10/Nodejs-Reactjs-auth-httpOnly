import express from "express";
import { Router } from "express";
import {
  deleteUserController,
  getUsersController,
} from "../controller/user.controller";
import { verifyAccessToken } from "../services/jwt/JwtService";

const userRoutes = Router();

userRoutes.get("/users", verifyAccessToken, getUsersController);
userRoutes.delete("user/:id", verifyAccessToken, deleteUserController);

export default userRoutes;
