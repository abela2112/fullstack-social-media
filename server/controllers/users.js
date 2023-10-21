import User from "../model/user.js";
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const getUsersFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriend = friends.map(
      ({ _id, firstName, lastName, occuption, location, picture }) => {
        return { _id, firstName, lastName, occuption, location, picture };
      }
    );
    res.status(200).json(formatedFriend);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((userId) => userId !== friendId);
      friend.friends = friend.friends.filter((userId) => userId !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await friend.save();
    await user.save();
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formatedFriend = friends.map(
      ({ _id, firstName, lastName, occuption, location, picture }) => {
        return { _id, firstName, lastName, occuption, location, picture };
      }
    );

    res.status(200).json(formatedFriend);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
