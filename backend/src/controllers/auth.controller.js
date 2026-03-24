import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import { generateJWT } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ message: "Email, full name, and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // check
    const userHasBeenRegistered = await User.findOne({ email: email });
    if (userHasBeenRegistered) {
      return res.status(400).json({ message: "Email has been registered" });
    }
    // register
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
    });

    await newUser.save();
    generateJWT(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({
      message: "Server error in signup controller",
    });
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // 登陆时更新jwt
    generateJWT(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in signin controller:", error);
    res.status(500).json({
      message: "Server error in signin controller",
    });
  }
};

export const signout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Successfully signed out" });
  } catch (error) {
    console.log("Error in signout controller:", error);
    res.status(500).json({
      message: "Server error in signout controller",
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const { secure_url } = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: secure_url },
      { new: true }
    );
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.log("Error in updateProfile controller:", error);
    res.status(500).json({
      message: "Server error in updateProfile controller",
    });
  }
};

export const checkAuthInfos = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuthStatus controller:", error);
    res.status(500).json({
      message: "Server error in checkAuthStatus controller",
    });
  }
};
