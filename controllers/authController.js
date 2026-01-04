import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import Users from "../models/Users.js";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --------- SIGNUP ----------
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------- LOGIN ----------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.provider !== "local")
      return res
        .status(400)
        .json({ success: false, message: "Use Google login" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const userObj = user.toObject();
    delete userObj.password;
    res
      .cookie("token", token, {  httpOnly: true,
  sameSite: "none", 
  secure: true })
      .json({ success: true, user: userObj });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------- GOOGLE LOGIN ----------
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await Users.findOne({ email });
    if (!user) {
      user = await Users.create({
        name,
        email,
        avatar: picture,
        provider: "google",
      });
    }

    const myToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("token", myToken, { httpOnly: true,sameSite: "none", 
  secure: true })
      .json({ success: true, user });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Invalid Google token" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "none", 
  secure: true });
    res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --------- AUTH CHECK ----------
const authenticate = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticate: false });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findOne({ _id: decode.userId });
    const userObj = user.toObject();
    delete userObj.password;
    res.json({ authenticate: true , user: userObj });
  } catch {
    res.json({ authenticate: false });
  }
};

export default {
  authenticate,
  logout,
  googleAuth,
  login,
  signup
};
