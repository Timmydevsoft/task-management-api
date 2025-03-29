import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import handleError from "./error.middleware.js";
import userModel from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    let accessToken;
    const auth = req.headers.authorization || req.headers.authorization;
    if (!auth) {
      return res.status(401).json({ mesage: "No credentials" });
    }
    accessToken = auth.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "You are not a valid user" });
      }
      const user = await userModel.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(404).json({ message: "Not authorized" });
      }
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (err) {
    next(err);
  }
};

const verifyCookie = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(400).json("No credentials");
    jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, decoded) => {
      if (err) return res.status(400).json("Incorrect credentials");
      const user = await User.findById(decoded.id);
      if (!user) return next(handleError(401, "You are not a valiid user"));
      req.id = user._id;
      next();
    });
  } catch (err) {
    next(err);
  }
};
const verifyRole = async (req, res, next) => {
  try {
    let role = process.env.ADMINCODE;
    const isAnAdmin = bcrypt.compareSync(role, req.role);
    if (!isAnAdmin) {
      return res.status(403).json({ message: "Forbidden action" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { verifyToken, verifyCookie, verifyRole };
