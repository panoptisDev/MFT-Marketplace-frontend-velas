import "./card.scss";

const Card2 = (props: any) => {
  const { collection } = props;
  const goToPage = () => {
    props.history.push("/collections/" + collection.name);
  };

  return (
    <div className="collectionItem">
      <div onClick={goToPage}>
        {collection}
        <img src={collection && collection.banner_uri} alt="" />
        <div className="collectionInfo">
          <img src={collection && collection.logo_uri} alt="" />
          <br />
          <strong>{collection.name}</strong>
          <div></div>
          <div style={{ margin: "10px 0" }}>{collection.description}</div>
          <div style={{ marginBottom: "10px" }}>
            {collection.itemCount} items
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card2;
