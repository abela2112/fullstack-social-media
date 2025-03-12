import Post from "../model/posts.js";
import User from "../model/user.js";
 import cloudinary from "../lib/cloudinary.js";
 import { upload } from "../lib/multer.js";
 export const createPost = async (req, res) => {
   try {
     const { userId, description, picture } = req.body;
     const user = await User.findById(userId);
     if (!user) throw new Error("No such user");
     console.log(req.file);
     let cloudinaryResponse;

     if (req.file) {
       cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
     } else {
       return res.status(400).json({ message: "Please upload a picture" });
     }

     const newPost = new Post({
       userId: user._id,
       firstName: user.firstName,
       lastName: user.lastName,
       location: user.location,
       picturePath: cloudinaryResponse?.secure_url,
       userPicturePath: user.picture,
       description,
       likes: {},
       comment: [],
     });
     await newPost.save();
     const post = await Post.find().sort({ createdAt: -1 });
     res.status(200).json(post);
   } catch (error) {
     res.status(404).json({ error: error.message });
   }
 };
 export const getFeedPosts = async (req, res) => {
   console.log(req.user);
   try {
     const posts = await Post.find().sort({ createdAt: -1 });
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
     const post = await Post.find({ userId: id }).sort({ createdAt: -1 });
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

 export const commentPost = async (req, res) => {
   const { id } = req.params;
   const { userId, cmt } = req.body;
   try {
     console.log("comment");
     const post = await Post.findById(id);
     if (!post) throw new Error("No such post");
     post.comment.push({ userId, cmt });
     const updatePost = await Post.findByIdAndUpdate(
       id,
       { comment: post.comment },
       { new: true }
     );
     res.status(200).json(updatePost);
   } catch (error) {
     res.status(404).json({ error: error.message });
   }
 };
