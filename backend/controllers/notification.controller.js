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

export const markNotificationAsRead = async (req, res) => {
  const notificatiionId = req.params.id;
  try {
    const notificatiion = await Notification.findByIdAndUpdate(
      { _id: notificatiionId, recipient: req.user._id },
      { read: true },
      { new: true }
    );

    res.json(notificatiion);
  } catch (error) {
    console.error("Error in markNotificationAsRead controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const notificatiionId = req.params.id;
  try {
    const notificatiion = await Notification.findByIdAndDelete({
      _id: notificatiionId,
      recipient: req.user._id,
    });

    res.json({ message: "Notificatiion deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNotification controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
