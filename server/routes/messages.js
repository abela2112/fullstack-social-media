import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {
  getMessages,
  sendMessage,
  getContacts,
} from "../controllers/messages.js";

const router = express.Router();

router.get("/:id", verifyToken, getMessages);
router.get("/:id/contacts", verifyToken, getContacts);

// Moved down

router.post("/send/:id", verifyToken, sendMessage);

export default router;