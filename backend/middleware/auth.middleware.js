import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie["jwt-linkdin"];

    if (!token) {
      return res.status(401).json({ msg: "Unathorized - No Token Provided " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Unathorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("password");

    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute: middleware:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};