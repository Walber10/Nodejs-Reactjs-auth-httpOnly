import express from "express";
import user from "./user.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

router.use(user);
router.use(authRoutes);

export default router;
