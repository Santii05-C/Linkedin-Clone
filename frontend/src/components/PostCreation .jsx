import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const PostCreation = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation } = useMutation({
    mutationFn: async (postData) => {
      const res = await axiosInstance.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post created successfully");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Failes ro create post  ");
    },
  });

  const hanlePostCreation = async () => {
    try {
      const postData = { content };
      if (image) postData.image = image;

      createPostMutation(postData);
    } catch (error) {
      console.log("Error in hanlePostCreation", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const hanleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataURL(file).then(setImagePreview);
    } else {
      setImagePreview(null);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return <div>PostCreation </div>;
};

export default PostCreation;
