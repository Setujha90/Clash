import {Router} from "express";
import authRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js"; 
import passwordRoutes from "./passwordRoutes.js";
import clashRoutes from "./clashRoutes.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/auth", passwordRoutes);
router.use("/", verifyRoutes);

router.use("/api/clash", AuthMiddleware, clashRoutes);


export default router; 