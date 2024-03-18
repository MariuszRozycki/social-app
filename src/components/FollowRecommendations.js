import "./FollowRecommendations.css";
import axios from "axios";
import { baseApi } from "../api/baseApi";
import { useEffect, useState } from "react";

const FollowRecommendations = (props) => {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = () => {
    const recommendationsApi = baseApi + "follows/recommendations";
    axios
      .post(recommendationsApi)
      .then((res) => {
        setRecommendations(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [props.posts]);

  const follow = (id) => {
    const followApi = baseApi + "follows/follow";
    axios
      .post(followApi, {
        leader_id: id,
      })
      .then(() => {
        props.getLatestsPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="followRecommendations">
      {recommendations.map((recommendation) => {
        const followBtn = (
          <button
            className="btn"
            onClick={() => {
              follow(recommendation.id);
            }}
          >
            Follow
          </button>
        );
        return (
          <div className="followRecommendation" key={recommendation.id}>
            <img
              src={recommendation.avatar_url}
              alt={recommendation.username}
            />
            <h3>{recommendation.username}</h3>
            {followBtn}
          </div>
        );
      })}
    </div>
  );
};

export default FollowRecommendations;
