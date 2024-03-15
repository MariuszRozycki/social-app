import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";
import Post from "../components/Post";
import Loader from "../components/Loader";
import AddPost from "../components/AddPost";
import FollowRecommendations from "../components/FollowRecommendations";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getLatestsPosts = () => {
    setIsLoading(true);
    const latestsPostsApi = baseApi + "post/latest";
    axios
      .post(latestsPostsApi)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getPrevPosts = () => {
    setIsLoading(true);
    const newerPostsApi = baseApi + "post/newer-then";
    axios
      .post(newerPostsApi, {
        date: posts[0].created_at,
      })
      .then((response) => {
        setPosts(response.data.concat(posts));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getNextPosts = () => {
    setIsLoading(true);
    const olderPostsApi = baseApi + "post/older-then";
    axios
      .post(olderPostsApi, {
        date: posts[posts.length - 1].created_at,
      })
      .then((response) => {
        setPosts(posts.concat(response.data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getLatestsPosts();
  }, [props.user]);

  const nextPostsBtn = (
    <button className="btn loadMore" onClick={getNextPosts}>
      Load more
    </button>
  );

  const userName = props.user?.username ?? "";
  const userNameWelcome = (
    <h1>Hi {userName.charAt(0).toUpperCase() + userName.slice(1)}!</h1>
  );

  const notLogged = (
    <h1 className="login-message">Log in to get full access</h1>
  );

  return (
    <div className="home">
      {props.user?.username ? userNameWelcome : notLogged}
      {props.user && <AddPost getPrevPosts={getPrevPosts} />}
      {props.user && (
        <FollowRecommendations
          user={props.user}
          getLatestsPosts={getLatestsPosts}
          posts={posts}
        />
      )}
      <div className="postList">
        {isLoading && <Loader />}
        {posts.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              user={props.user}
              setPosts={setPosts}
              getLatestsPosts={getLatestsPosts}
            />
          );
        })}
        {!isLoading && nextPostsBtn}
      </div>
    </div>
  );
};

export default Home;
