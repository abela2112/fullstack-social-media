import Post from "../model/posts.js";
import User from "../model/user.js";
export const createPost = async (req, res) => {
  try {
    console.log(req.user);
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      picturePath: picturePath,
      userPicturePath: user.picture,
      description,
      likes: {},
      comment: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getFeedPosts = async (req, res) => {
  console.log(req.user);
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  console.log(req.user);
  try {
    const { id } = req.params;
    console.log(id);
    const post = await Post.find({ userId: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    console.log("likes");

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    console.log(post.likes);
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
