import Message from "../models/messages.model.js";
import User from "../models/users.model.js";
import cloudinary from "../lib/cloudinary.js";

export const SidebarUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    const users = await User.find({ _id: { $ne: currentUser._id } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in SidebarUsers controller:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getDirectMessages = async (req, res) => {
  try {
    const { userId: dmUserId } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: dmUserId },
        { senderId: dmUserId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getDirectMessages controller:", error);
    res.status(500).json({ error: error.message });
  }
};

export const sendDirectMessage = async (req, res) => {
  try {
    const { userId: dmUserId } = req.params;
    const senderId = req.user._id;
    const { text, image } = req.body;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId: dmUserId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo: realtime message using socket.io(ws) here.
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendDirectMessage controller:", error);
    res.status(500).json({ error: error.message });
  }
};
