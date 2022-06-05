import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import "./card.scss";

const Card3 = (props: any) => {
  const [anchorElTop, setAnchorElTop] = useState(null);
  const showMoreActions = (e: any) => {
    e.preventDefault();
    setAnchorElTop(e.currentTarget);
  };
  const gotToPage = () => {
    props.history.push("/collections/" + props.collection.name);
  };
  return (
    <div className="card">
      <div className="imgContainer" onClick={gotToPage}>
        <img src={props.collection.logo_uri} alt="" className="nft" />
      </div>
      <h4>{props.collection.name}</h4>
      <h3>{props.collection.description}</h3>

      <div className="moreActionBox" onClick={showMoreActions}>
        <MoreVert />
      </div>
    </div>
  );
};
export default Card3;
