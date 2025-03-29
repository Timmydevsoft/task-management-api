import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import handleError from "../middleware/error.middleware.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No such user or invalid email" });
    }

    let isAvalidUser = bcrypt.compareSync(password, user.password);
    if (!isAvalidUser) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_KEY);

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, token: accessToken, userName: user.userName });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.id);
    const payLoad = { id: user._id, role: user.role };
    const newAccessToken = jwt.sign(payLoad, process.env.ACCESS_KEY);
    return res
      .status(200)
      .json({ sucessful: true, accessToken: newAccessToken });
  } catch (err) {
    next(err);
  }
};

export { signIn, refreshToken };
