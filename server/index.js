import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
//configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();
// controllers
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
//routes
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import verifyToken from "./middleware/verifyToken.js";
//middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
//const upload = multer({ dest: "uploads/assets" });

app.post("/auth/register", upload.single("picture"), register);
app.post("/post/create", verifyToken, upload.single("picture"), createPost);
app.use("/post", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

const start = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(4000, () => {
    console.log("server is listening at port 4000");
  });
};
start();
