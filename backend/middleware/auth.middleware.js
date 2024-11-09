import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const protectRoute = async (req, res) => {
  try {
    const token = req.cookie["jwt-linkdin"];

    if (!token) {
      return res.status(401).json({ msg: "Unathorized - No Token Provided " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ msg: "Unathorized - Invalid Token" });
    }
  } catch (error) {}
};
