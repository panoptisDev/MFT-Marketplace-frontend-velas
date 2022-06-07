import React, { useState } from "react";
import "./styles.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Timer from "../timer/Timer";
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";
import { FiRefreshCw } from "react-icons/fi";
import ReactPlayer from "react-player";

// import { AuctionDataType } from "../LiveAuctions/LiveAuctions";
import cardItem from "../../assets/images/card-item.jpg";
import itemDetail from "../../assets/images/item-detail.jpg";
import Likes from "../Likes/Likes";
import Button from "../MoreComponents/Button";
import { useHistory } from "react-router-dom";

const AuctionCard = ({ TodayPick, item }: any) => {
  const history = useHistory();
  const gotoDetail = () => {
    history.push(`/item/${item.itemCollection}/${item.tokenId}`);
  };
  return (
    <div
      className={TodayPick ? "auction-card today-pick-card" : "auction-card"}
    >
      <div className="card-top">
        {item && (item.assetType === "video" || item.assetType === "audio") ? (
          <ReactPlayer
            width="100%"
            height="300px"
            url={item.assetUrl}
            playing={true}
            controls
          />
        ) : (
          <img
            onClick={gotoDetail}
            src={item.assetUrl ? item?.assetUrl : itemDetail}
            alt=""
          />
        )}
        {!TodayPick ? (
          <Button
            placeBid1={true}
            icon={<ShoppingBag />}
            className="place-bid"
            label="Place Bid"
          />
        ) : undefined}
        <Likes likes={item.likeCount} popularCollection={false} />
      </div>
      {!TodayPick ? <Timer mintStartAt={item.timeStamp} /> : undefined}
      <div className="card-bottom">
        <div className="bottom-first">
          <Link to="/">{item.name || "Garraya Richard"}</Link>
        </div>
        <div className={TodayPick ? "meta-info today-pick-meta" : "meta-info"}>
          <div className="meta-info-left">
            <div className="meta-info-left-img">
              <img src={item.creatorUser.logo_url || ""}></img>
            </div>
            <div>
              <span>Creator</span>
              <h6>
                <Link to="/">{item.creatorUser.name || "Rachelsons"}</Link>
              </h6>
            </div>
          </div>
          <div className="meta-info-right">
            <span>Current Bid</span>
            <br />
            <h5>{"4.89 ETH"}</h5>
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
