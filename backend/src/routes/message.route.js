import express from "express";
import {
  getDirectMessages,
  sendDirectMessage,
  SidebarUsers,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, SidebarUsers);

router.get("/:userId", protectRoute, getDirectMessages);

router.post("/send/:userId", protectRoute, sendDirectMessage);

export default router;
