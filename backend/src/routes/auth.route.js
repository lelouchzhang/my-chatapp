import express from "express";
import {
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

export default router;
