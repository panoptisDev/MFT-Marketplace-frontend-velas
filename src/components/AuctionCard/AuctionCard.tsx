import React, { useState } from "react";
import "./styles.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Timer from "../Timer/Timer";
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";
import { FiRefreshCw } from "react-icons/fi";
// import { AuctionDataType } from "../LiveAuctions/LiveAuctions";
import cardItem from "../../assets/images/card-item.jpg";
import Likes from "../Likes/Likes";
import Button from "../MoreComponents/Button";

interface CardType {
  TodayPick: boolean;
}
// item: AuctionDataType

const AuctionCard = ({ TodayPick, item }: any) => {
  const { name, currency, price, creator, time } = item;

  const [likes, setLikes] = useState(230);
  const [increase, setIncrease] = useState(true);

  const handleIncrease = () => {};

  const handleLikes = () => {
    setIncrease(!increase);
    if (increase) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  };

  return (
    <div
      className={TodayPick ? "auction-card today-pick-card" : "auction-card"}
    >
      <div className="card-top">
        <img src={cardItem} alt="" />
        {!TodayPick ? (
          <Button
            placeBid1={true}
            icon={<ShoppingBag />}
            className="place-bid"
            label="Place Bid"
          />
        ) : undefined}
        <Likes popularCollection={false} />
      </div>
      {!TodayPick ? <Timer mintStartAt={time} /> : undefined}
      <div className="card-bottom">
        <div className="bottom-first">
          <Link to="/">{name || "Garraya Richard"}</Link>
          <p>{currency || "BBC"}</p>
        </div>
        <div className={TodayPick ? "meta-info today-pick-meta" : "meta-info"}>
          <div className="meta-info-left">
            <div></div>
            <div>
              <span>Creator</span>
              <h6>
                <Link to="/">{creator || "Rachelsons"}</Link>
              </h6>
            </div>
          </div>
          <div className="meta-info-right">
            <span>Current Bid</span>
            <br />
            <h5>{price || "4.89 ETH"}</h5>
          </div>
        </div>
      </div>
      {TodayPick ? (
        <div className="card-footer">
          <button className={TodayPick ? "place-bid today-pick" : undefined}>
            <ShoppingBag />
            Place Bid
          </button>
          <div className="footer-history">
            <FiRefreshCw />
            View History
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default AuctionCard;
