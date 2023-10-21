import verifyToken from "../middleware/verifyToken.js";
import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/user/:id", verifyToken, getUserPosts);
router.patch("/:id/like", verifyToken, likePost);
export default router;
