import express from "express";
const router = express.Router();
import {
  getUsersFriends,
  getUser,
  addRemoveFriends,
} from "../controllers/users.js";
import verifyToken from "../middleware/verifyToken.js";
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUsersFriends);
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);
export default router;
