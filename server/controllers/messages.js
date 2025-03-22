import { io } from "../lib/socket.js";
import Message from "../model/message.js";
import User from "../model/user.js";
export const getContacts = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId)
      return res.status(400).json({ message: "User id is required" });
    // Find the user's friends list
    const user = await User.findById(userId);
    console.log("first user", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const friendIds = user.friends; // Array of friend user IDs
    console.log("friendIds", friendIds);
    // Fetch friends' details along with last message
    const contacts = await Promise.all(
      friendIds.map(async (friendId) => {
        const friend = await User.findById(friendId);
        if (!friend) return null; // Skip if friend not found

        // Get last message between the user and this friend
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: userId, recieverId: friendId },
            { senderId: friendId, recieverId: userId },
          ],
        })
          .sort({ createdAt: -1 }) // Get the latest message
          .limit(1);
        console.log("lastMessage", lastMessage);
        return {
          _id: friend._id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          picture: friend.picture,
          lastMessage: lastMessage
            ? lastMessage.text || (lastMessage.image && "Image")
            : "No messages yet",
          time: lastMessage ? lastMessage.createdAt : null,
        };
      })
    );
    console.log("contacts", contacts);
    // Remove any null values from the list
    res.status(200).json(contacts.filter((contact) => contact !== null));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
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
    // const recieverSocketId = getRecieverSocketId(userToChatId);
    // console.log("recieverSocketId", recieverSocketId);
    // const room = generateRoomId(req.user.id, userToChatId);

    // Emit the message to the appropriate room
    if (userToChatId) {
      // Emit to both users in the room
      io.to(userToChatId).emit("newMessage", message);
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
