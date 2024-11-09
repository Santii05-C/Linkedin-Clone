import User from "../models/user.model.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.dindById(req.user._id).select("connections");

    //find users who are not already connected, and also recommend our own profile right?
    const suggestedUsers = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
    })
      .select("name, username, profilePicture headline")
      .limit(3);

    res.json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedConnections controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
