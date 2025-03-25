import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const { genSaltSync } = bcryptjs;
import jsonwebtoken from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 50 },
    lastName: { type: String, required: true, min: 3, max: 50 },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: { type: String, required: true, min: 8, max: 50 },
    picture: { type: String, default: "" },
    friends: [{ type: Schema.Types.ObjectId, ref: "user", default: [] }],
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    twitterLink: String,
    linkedInLink: String,
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  const hash = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, hash);
});
userSchema.methods.comparePassword = async function (candidate) {
  const isMatch = await bcryptjs.compare(candidate, this.password);
  return isMatch;
};
userSchema.methods.createToken = function () {
  const token = jsonwebtoken.sign(
    { id: this._id, name: this.firstName },
    process.env.JWT_SECRET_KEY
  );
  return token;
};
const User = model("user", userSchema);
export default User;
