import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../model/message.js";

export const getMessages = async (req, res) => {
    try {
        const { id:userToChatId } = req.params;
        if(!userToChatId) return res.status(400).json({ message: "User id is required" });
        const messages = await Message.find({ 
            $or: [
                { senderId: req.user.id, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: req.user.id }
            ]
         });
      return  res.status(200).json(messages);
    } catch (error) {
        console.log("error in getmessage controller", error);
        return res.status(500).json({ message: error.message });
    }
}

export const sendMessage = async (req, res) => {
    console.log("sendern id",req.user.id)
    try {
        const { id:userToChatId } = req.params;
        const {text,image} = req.body;
        const message = new Message({
            senderId: req.user.id,
            recieverId: userToChatId,
            text,
            image,
        });
        await message.save();
        const recieverSocketId = getRecieverSocketId(userToChatId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", message);
        }
        res.status(201).json(message);
    } catch (error) {
        console.log("error in sendmessage controller", error);
        res.status(500).json({ message: error.message });
    }
}