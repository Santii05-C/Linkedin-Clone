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
  //4:53
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

  return <div>NotificationsPage</div>;
};

export default NotificationsPage;
