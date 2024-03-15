import "./AddPost.css";
import { useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";

const AddPost = (props) => {
  const [postContent, setPostContent] = useState("");
  const addPost = (e) => {
    e.preventDefault();

    if (!postContent) {
      return;
    }

    const postAddApi = baseApi + "post/add";
    axios
      .post(postAddApi, {
        content: postContent,
      })
      .then(() => {
        props.getPrevPosts();
        setPostContent("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="addPostForm" onSubmit={addPost}>
      <textarea
        placeholder="Add post..."
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent}
      ></textarea>
      <button className="btn">Add post</button>
    </form>
  );
};

export default AddPost;
