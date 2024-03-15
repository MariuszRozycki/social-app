import "./Post.css";
import { useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";

const Post = (props) => {
  const {
    user: { username },
    post: {
      user: { avatar_url, username: postUsername },
      created_at,
      content,
      likes,
      id,
    },
    setPosts,
  } = props;

  const localDate = new Date(created_at);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const likesArray =
    likes.filter((like) => like.username === username).length !== 0;
  const [doesUserLiked, setDoesUserLiked] = useState(likesArray);

  const deletePost = (id) => {
    const deletePostApi = baseApi + "post/delete";
    console.log(deletePostApi);
    axios
      .post(deletePostApi, {
        post_id: id,
      })
      .then((res) => {
        console.log(res.data);
        setPosts((posts) => {
          const updatedPostsList = posts.filter(
            (post) => post.id !== res.data.post_id
          );
          return updatedPostsList;
        });
        setDeleteModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePostBtn = (
    <button onClick={() => setDeleteModalVisible(true)} className="btn">
      Delete
    </button>
  );

  const likeBtn = (
    <button className="btn" onClick={() => likePost(id, doesUserLiked)}>
      {doesUserLiked ? "dislike" : "Like"}
    </button>
  );

  const likePost = (id, isLiked) => {
    axios
      .post(baseApi + (isLiked ? "post/dislike" : "post/like"), {
        post_id: id,
      })
      .then(() => {
        setLikesCount(likesCount + (isLiked ? -1 : 1));
        setDoesUserLiked(!isLiked);
      });
  };

  return (
    <div className="post">
      <div className="avatar">
        <img src={avatar_url} alt={postUsername} />
      </div>
      <div className="postData">
        <div className="postMeta">
          <div className="author">{postUsername}</div>
          <div className="date">{localDate.toLocaleString()}</div>
        </div>
        <div className="postContent">{content}</div>

        <div className="likes">
          {postUsername === username && deletePostBtn}
          {username && likeBtn}
          {likesCount}
        </div>
      </div>
      {deleteModalVisible && (
        <div className="deleteModal">
          <h3>Are you sure you want to delete post?</h3>
          <div className="modalBtnWrapper">
            <button
              className="btn yes"
              onClick={() => {
                deletePost(id);
              }}
            >
              Yes
            </button>
            <button
              className="btn no"
              onClick={() => setDeleteModalVisible(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
