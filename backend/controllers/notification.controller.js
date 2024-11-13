import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profilePicture")
      .populate("relatedPost", "content image");

    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in getUserNotifications controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
