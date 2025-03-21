import cloudinary from "./cloudinary.js";

export const uploader = async (req, res) => {
    const file= req.file
    console.log("file",file)
    if (!file) {
      return res.status(400).json({ message: "Please upload a picture" });
    }
    let uploadResponse;
    try {
      uploadResponse = await cloudinary.uploader.upload(file.path);
    } catch (error) {
      console.log("error in upload", error);
      res.status(500).json({ message: error.message });
    }
    res.status(200).json({image:uploadResponse?.secure_url});
}