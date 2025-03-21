import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../model/message.js";
import User from "../model/user.js";
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    if (!userToChatId)
      return res.status(400).json({ message: "User id is required" });

    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: req.user.id },
      ],
    })
      .populate("senderId", "name email picture") // Populate sender details
      .populate("recieverId", "name email picture"); // Populate receiver details

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  console.log("sendern id", req.user.id);
  try {
    const { id: userToChatId } = req.params;
    console.log("userToChatId", userToChatId);
    const { text, image } = req.body;
    if (!userToChatId)
      return res.status(400).json({ message: "User id is required" });
    if (!text && !image)
      return res.status(400).json({ message: "Text or image is required" });
    const message = new Message({
      senderId: req.user.id,
      recieverId: userToChatId,
      text,
      image,
    });
    await message.save();
    const recieverSocketId = getRecieverSocketId(userToChatId);
    console.log("recieverSocketId", recieverSocketId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", message);
      console.log("message sent", message);
    }
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: req.user.id },
      ],
    })
      .populate("senderId", "name email picture") // Populate sender details
      .populate("recieverId", "name email picture"); // Populate receiver details

    res.status(201).json(messages);
  } catch (error) {
    console.log("error in sendmessage controller", error);
    res.status(500).json({ message: error.message });
  }
};