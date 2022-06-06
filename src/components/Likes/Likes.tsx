import React, { useState } from "react";
import "./styles.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Likes = ({ popularCollection, likes }: any) => {
  const [increase, setIncrease] = useState(true);

  const handleIncrease = () => {};

  const handleLikes = () => {
    setIncrease(!increase);
    if (increase) {
      //setLikes(likes + 1);
    } else {
      //setLikes(likes - 1);
    }
  };
  return (
    <div
      onClick={() => {
        handleLikes();
        handleIncrease();
      }}
      className={
        popularCollection ? "card-likes popular-collection-likes" : "card-likes"
      }
    >
      {increase ? (
        <FaRegHeart size="15" color="white" />
      ) : (
        <FaHeart size="15" color="red" />
      )}
      <span>{likes}</span>
    </div>
  );
};

export default Likes;
