import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config";
import User from "../models/userModel";

console.log(JWT_SECRET);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ error: "All fields are required for registration." });
      return;
    }

    const userExistsByUsername = await User.findOne({ username });
    const userExistsByEmail = await User.findOne({ email });

    if (userExistsByUsername || userExistsByEmail) {
      res.status(400).json({ error: "User already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // const jwtToken = jwt.sign(
    //   { userId: user._id, username: user.username, email: user.email },
    //   JWT_SECRET,
    //   {
    //     expiresIn: "24h",
    //   }
    // );

    // res.json({ jwtToken });

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }

    const jwtToken = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({ jwtToken });
  } catch (error) {
    res.status(500).json({
      error: "Oops. There was a problem logging in with the given credentials.",
    });
  }
};

export const signout = (req: Request, res: Response) => {
  try {
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "User signed out successfully." });
  } catch (error) {
    res.status(500).json({ error: "Oops. There was an error signing out." });
  }
};
