import bcrypt from "bcryptjs";
import User from "../models/users.model.js";
import { generateJWT } from "../lib/utils.js";

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

    if (newUser) {
      generateJWT(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({
      message: "Server error in signup controller",
      error: error.message,
    });
  }
};

export const signin = () => {};
export const signout = () => {};
