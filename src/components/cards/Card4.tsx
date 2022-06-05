import Button from "../MoreComponents/Button";
import ReactPlayer from "react-player";
// import { useNavigate } from "react-router-dom";
import "./card.scss";

const Card4 = (props: any) => {
  const { item } = props;
  const gotoDetail = () => {
    props.history.push(`/item/${item.itemCollection}/${item.tokenId}`);
  };
  return (
    <div className="card" onClick={gotoDetail}>
      <div className="imgContainer">
        {item && (item.assetType === "video" || item.assetType === "audio") && (
          <ReactPlayer
            width="100%"
            height="calc(100%)"
            url={item.assetUrl}
            playing={true}
            controls
          />
        )}
        {item.assetType === "image" && (
          <img src={item && item.assetUrl} alt="" className="nft" />
        )}
      </div>

      <h3>{item.name}</h3>
      <p className="socre">{item.description}</p>
    </div>
  );
};
export default Card4;
