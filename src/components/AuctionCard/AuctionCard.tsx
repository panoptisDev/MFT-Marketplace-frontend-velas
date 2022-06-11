import "./styles.css";
import Timer from "../timer/Timer";
import { Link } from "react-router-dom";
import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";
import ReactPlayer from "react-player";

// import { AuctionDataType } from "../LiveAuctions/LiveAuctions";
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
          <img src={item.assetUrl ? item?.assetUrl : itemDetail} alt="" />
        )}
        {!TodayPick ? (
          <Button
            placeBid1={true}
            icon={<ShoppingBag />}
            className="place-bid"
            label="Place Bid"
            onClick={gotoDetail}
          />
        ) : undefined}
        <Likes likes={item.likeCount} popularCollection={false} />
      </div>
      {!TodayPick ? <Timer mintStartAt={item?.auction.endTime} /> : undefined}
      <div className="card-bottom">
        <div className="bottom-first">
          <Link to="/">{item?.name}</Link>
        </div>
        <div className={TodayPick ? "meta-info today-pick-meta" : "meta-info"}>
          <div className="meta-info-left">
            <div className="meta-info-left-img">
              <img src={item?.creatorUser?.logo_url || ""} alt=""></img>
            </div>
            <div>
              <span>Creator</span>
              <h6>
                <Link to="/">{item?.creatorUser?.name || "Rachelsons"}</Link>
              </h6>
            </div>
          </div>
          {!item?.pair && !item?.auction ? (
            <div className="meta-info-right">
              <h5>Not Listed</h5>
            </div>
          ) : (
            <div className="meta-info-right">
              {item?.auction ? (
                <span>Highest Bid Price</span>
              ) : (
                <span>Current Price</span>
              )}
              <br />
              <h5>{item?.pair ? item?.pair.price : item?.auction.price} VLX</h5>
            </div>
          )}
        </div>
      </div>
      {TodayPick ? (
        <div className="card-footer">
          <button
            onClick={gotoDetail}
            className={TodayPick ? "place-bid today-pick" : undefined}
          >
            <ShoppingBag />
            {item?.pair ? "Buy" : item?.auction ? "Place Bid" : "Go to Details"}
          </button>
        </div>
      ) : undefined}
    </div>
  );
};

export default AuctionCard;
