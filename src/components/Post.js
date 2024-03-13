import "./Post.css";
import { useState } from "react";

const Post = (props) => {
  console.log(props);
  const {
    post: {
      user: { avatar_url, username },
      created_at,
      content,
      likes,
    },
  } = props;

  const localDate = new Date(created_at);
  const [likesCount, setLikesCount] = useState(likes.length);

  return (
    <div className="post">
      <div className="avatar">
        <img src={avatar_url} alt={username} />
      </div>
      <div className="postData">
        <div className="postMeta">
          <div className="author">{username}</div>
          <div className="date">{localDate.toLocaleString()}</div>
        </div>
        <div className="postContent">{content}</div>
        <div className="likes">{likesCount}</div>
      </div>
    </div>
  );
};

export default Post;
