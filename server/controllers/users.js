import User from "../model/user.js";
import cloudinary from "../lib/cloudinary.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const editProfile = async (req, res) => {
  const { id } = req.params;
  let uploadResponse;
  console.log("req.body", id);
  const {
    firstName,
    lastName,
    email,
    password,
    location,
    occupation,
    picture,
    twitterLink,
    linkedInLink,
  } = req.body;
  console.log("req.body", req.body);

  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    if (!user.picture && !req.file)
      return res.status(400).json({ message: "Please upload a picture" });
    if (req.file) {
      uploadResponse = await cloudinary.uploader.upload(req.file.path);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        password,
        location,
        occupation,
        picture: uploadResponse?.secure_url,
        twitterLink,
        linkedInLink,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
export const getUsersFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends =
      user?.friends &&
      (await Promise.all(user?.friends.map((id) => User.findById(id))));
    if (!friends) return res.status(400).json([]);
    const formatedFriend = friends.map(
      ({ _id, firstName, lastName, occuption, location, picture }) => {
        return { _id, firstName, lastName, occuption, location, picture };
      }
    );
    res.status(200).json(formatedFriend);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFriend = user.friends.includes(friendId);

    // Update both users
    await User.findByIdAndUpdate(
      id,
      {
        [isFriend ? "$pull" : "$addToSet"]: { friends: friendId },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(
      friendId,
      {
        [isFriend ? "$pull" : "$addToSet"]: { friends: id },
      },
      { new: true }
    );

    // Fetch updated friend list
    const updatedUser = await User.findById(id).populate(
      "friends",
      "_id firstName lastName occupation location picture"
    );
    console.log("friends", updatedUser.friends);
    res.status(200).json(updatedUser.friends);
  } catch (error) {
    console.error("Edit error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

