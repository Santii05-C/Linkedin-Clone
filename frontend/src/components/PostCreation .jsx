import { useState } from "react";

const PostCreation = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  return <div>PostCreation </div>;
};

export default PostCreation;
