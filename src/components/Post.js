import "./Post.css";
import { useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";

const Post = (props) => {
  const localDate = new Date(props.post.created_at);
  const [likesCount, setLikesCount] = useState(props.post.likes.length);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [doesUserLiked, setDoesUserLiked] = useState(
    props.post.likes.filter((like) => like.username === props.user?.username)
      .length !== 0
  );

  const deletePost = (id) => {
    const deletePostApi = baseApi + "post/delete";

    axios
      .post(deletePostApi, {
        post_id: id,
      })
      .then((res) => {
        props.setPosts((posts) => {
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
    <button
      onClick={() => setDeleteModalVisible(true)}
      className="btn deletePostBtn"
    >
      Delete
    </button>
  );

  const likeBtn = (
    <button
      className="btn"
      onClick={() => likePost(props.post.id, doesUserLiked)}
    >
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

  const unFollow = (id) => {
    const disfollowApi = baseApi + "follows/disfollow";

    axios
      .post(disfollowApi, {
        leader_id: id,
      })
      .then(() => {
        props.getLatestsPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const unfollowBtn = (
    <button className="btn" onClick={() => unFollow(props.post.user.id)}>
      Unfollow
    </button>
  );

  return (
    <div className="post">
      <div className="avatar">
        <img src={props.post.user.avatar_url} alt={props.post.user.username} />
      </div>
      <div className="postData">
        <div className="postMeta">
          <div className="author">{props.post.user.username}</div>
          <div className="date">{localDate.toLocaleString()}</div>
        </div>
        <div className="postContent">{props.post.content}</div>

        <div className="likes">
          {props.user?.username === props.post.user.username && deletePostBtn}
          {props.user &&
            props.user.username !== props.post.user.username &&
            unfollowBtn}
          {props.user && likeBtn}
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
                deletePost(props.post.id);
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
