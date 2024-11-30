import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({ querykey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setcomments] = useState(post.comments || []);
  const isOwner = authUser._id === post.authUser._id;
  const isLiked = post.likes.includes(authUser._id);

  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comments`, {
        content: newComment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ querykey: ["posts"] });
      toast.success("Comments added successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return <div>Post</div>;
};

export default Post;
