import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";
import Post from "../components/Post";
import Loader from "../components/Loader";
import AddPost from "../components/AddPost";

const Home = (props) => {
  const { user } = props;
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
  }, [user]);

  const nextPostsBtn = (
    <button className="btn loadMore" onClick={getNextPosts}>
      Load more
    </button>
  );

  return (
    <div className="home">
      {user && <AddPost getPrevPosts={getPrevPosts} />}
      <div className="postList">
        {isLoading && <Loader />}
        {posts.map((post) => {
          return (
            <Post post={post} key={post.id} user={user} setPosts={setPosts} />
          );
        })}
        {!isLoading && nextPostsBtn}
      </div>
    </div>
  );
};

export default Home;
