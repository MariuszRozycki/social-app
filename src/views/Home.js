import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";
import Post from "../components/Post";
import Loader from "../components/Loader";

const Home = () => {
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
  }, []);

  const nextPostsBtn = (
    <button className="btn loadMore" onClick={getNextPosts}>
      Load more
    </button>
  );

  return (
    <div className="home">
      <div className="postList">
        {isLoading && <Loader />}
        {posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
        {!isLoading && nextPostsBtn}
      </div>
    </div>
  );
};

export default Home;
