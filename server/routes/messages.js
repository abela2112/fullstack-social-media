import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { getMessages ,sendMessage} from '../controllers/messages.js';
import { getUsersFriends } from '../controllers/users.js';
const router = express.Router();

router.get('/:id', verifyToken, getMessages);
router.get("/:id/friends", verifyToken, getUsersFriends);

// Moved down

router.post("/send/:id", verifyToken, sendMessage);

export default router;