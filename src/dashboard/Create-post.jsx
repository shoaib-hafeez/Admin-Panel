 import React, { useState ,useRef} from "react";
import axiosClient from "../lib/axios";
// import { createPostApi } from "../services/post.service";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tags, setTags] = useState([""]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Disable button
    setMessage("");
    setErrors({}); // Clear previous errors

    // Create FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    tags
    .split(",")
    .map((tag) => tag.trim())
    .forEach((tag) => formData.append("tags", tag));

    if (imageFile) {
      formData.append("images", imageFile); // Append the file
    }

    axiosClient
      .post("/social-media/posts", formData, {
        //  createPostApi( formData, {         createpost ki Api post.service m bana k yaha call ki h 
        headers: {
          "Content-Type": "multipart/form-data", // Set the proper content type
        },
      })
      .then((response) => {
        setMessage("Post created successfully!");
        setTitle("");
        setContent("");
        setTags("");
         if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset file input
        }
      })
      .catch((error) => {
        setErrors(error.response?.data?.errors || {});
        setMessage(error.response?.data?.message || "Error creating post");
      })
      .finally(() => {
        setLoading(false); // Re-enable button

      });
  };

  return (
   <div className="createPost_container">
     <div className="create_post">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*" // Allow only image files
            onChange={(e) => setImageFile(e.target.files[0])} // Capture file object
            ref={fileInputRef} // Attach ref
            required
          />
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g., technology, programming, reactjs"
            required
          />
          {errors.tags && <p style={{ color: "red" }}>{errors.tags}</p>} {/* Display tag-specific error */}
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ?  " Submitting..." : "Create Post"}
        </button>
      </form>
      {message && (
        <p style={{ color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
   </div>
  );
};

export default CreatePost;
