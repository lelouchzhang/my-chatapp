import express from "express";
import {
  checkAuthInfo,
  signin,
  signout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", signin);

router.post("/logout", signout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuthInfo);

export default router;
