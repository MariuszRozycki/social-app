import { useEffect, useState } from "react";
import axios from "axios";
import { baseApi } from "../api/baseApi";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const getLatestsPosts = () => {
    const latestsPostsApi = baseApi + "post/latest";
    axios
      .post(latestsPostsApi)
      .then((request) => {
        setPosts(request.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getLatestsPosts();
  }, []);

  return <h2>Home</h2>;
};

export default Home;
