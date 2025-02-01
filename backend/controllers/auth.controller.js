import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ message: "All fields should not be Empty." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must be Atleast 6 minimum Character" });
    }
    if (email === "") {
      return res
        .status(400)
        .json({ message: "Email Field should not be Empty." });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already Exists." });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      // res.status(201).json({message:"New User Created Successfully."})
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `There is no such a user with ${email}` });
    }

    const correctPass = await bcrypt.compareSync(password, user.password);

    if (!correctPass) {
      return res.status(201).json({ message: "Invalid Passwords." });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      ProfilePic: user.ProfilePic,
    });
  } catch (error) {
    console.log("Error in the Login Controller", error);
    res.status(500).json({ message: "The Internal Server Error." });
  }
};

export const Logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully." });
  } catch (error) {
    console.log("Errror in Logout Controller", error.message);
    res.status(500).json({ message: "The internal Server Error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { ProfilePic } = req.body;
    const userId = req.user._id;
    if (!ProfilePic) {
      return res.status(401).json({ message: "Profile Picture is Required." });
    }

    const cloudinaryUplaodResponse = await cloudinary.uploader.upload(
      ProfilePic
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ProfilePic: cloudinaryUplaodResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);

    // res
    //   .status(200)
    //   .json({ message: "Profile Picture is successfully Updated." });
  } catch (error) {
    console.log("Error in Update Profile Controller", error);
    res.status(500).json({ message: "The internal Server Error." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("The Error in the CheckAuth Controller.");
    res.status(500).json({ message: "The Server Internal Error." });
  }
};
