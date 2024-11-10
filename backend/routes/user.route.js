import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/seggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);

export default router;
