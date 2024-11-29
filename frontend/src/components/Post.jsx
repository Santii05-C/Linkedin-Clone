import { useQuery } from "@tanstack/react-query";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({ querykey: ["authUser"] });
  return <div>Post</div>;
};

export default Post;
