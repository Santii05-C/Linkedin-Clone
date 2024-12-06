import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosIntance } from "../lib/axios";
import { toast } from "react-hot-toast";
import {
  ExternalLink,
  Eye,
  MessageSquare,
  ThumbsUp,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
const NotificationsPage = () => {
  const { data: authUser } = useQuery({ query: ["authUser"] });

  const queryClient = useQueryClient;

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axiosIntance.get("/notifications"),
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (id) => axiosIntance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id) => axiosIntance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notifications deleted");
    },
  });

  const renderNotificationIcos = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-500" />;

      case "comment":
        return <MessageSquare className="text-green-500" />;
      case "connectionAccepted":
        return <UserPlus className="text-purple-500" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong>{notification.relatedUser.name}</strong> liked your post
          </span>
        );
      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            commented on your post
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            accepted your connection request
          </span>
        );
      default:
        return null;
    }
  };

  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost._id}`}
        className="mt-2 p-2 bg-gray-50 rounded-md flex items-center space-x-2 hover:bg-gray-100 transition-colors"
      >
        {relatedPost.image && (
          <img
            src={relatedPost.image}
            alt="Post preview"
            className="w-10 h-10 object-cover rounded"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-600 truncate">
            {relatedPost.content}
          </p>
        </div>
        <ExternalLink size={14} className="text-gray-400" />
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <SideBar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <div className="bg-white rounded-lg shadow p-6"></div>
      </div>
    </div>
  );
};

export default NotificationsPage;
