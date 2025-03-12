import mongoose from "mongoose";
const messageSchema = mongoose.Schema(
    {
      senderId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true},
      recieverId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true},
      text:{ type: String },
      video: { type: String, default: "" },
      image: { type: String, default: "" },
      
    },
    { timestamps: true }
  );

  const Message = mongoose.model("Message", messageSchema);
  export default Message;
  