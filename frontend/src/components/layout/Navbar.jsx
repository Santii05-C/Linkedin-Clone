import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

function Navbar() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    anabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    anabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notifications.read
  ).length;

  return (
    <div>
      Navbar
      <button>Logout</button>
    </div>
  );
}

export default Navbar;
//3:23
