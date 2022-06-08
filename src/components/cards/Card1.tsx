import "./card.scss";
import author from "../../assets/images/author.jpg";

const Card1 = (props: any) => {
  const { collection } = props;
  const gotToPage = () => {
    props.history.push("/collections/" + collection.name);
  };

  return (
    <div className="card" onClick={gotToPage}>
      <div className="imgContainer">
        <img src={collection?.logo_uri || author} alt="" className="nft" />
      </div>
      <h4>
        {" "}
        <img src={collection?.logo_uri || author} alt="" />
        {collection?.name || "NFT"}
      </h4>
      <h3>{collection?.description || "this is to show card"}</h3>
      <div className="stateVals">
        <p>
          1030 <span>tokens</span>
        </p>
        <p>
          124 <span>offers</span>
        </p>
      </div>
    </div>
  );
};

export default Card1;
