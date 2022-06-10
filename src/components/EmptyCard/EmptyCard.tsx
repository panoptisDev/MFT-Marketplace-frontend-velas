// import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import author from "../../assets/images/author.jpg";

const EmptyCard = ({
  item,
  popularCollection,
  collection,
  collectionList,
  myNftsPage,
}: any) => {
  const history = useHistory();

  const gotToPage = (collection: any) => {
    history.push("/collections/" + collection.name);
  };

  return (
    <div
      className={
        popularCollection
          ? "empty-card popularCollection"
          : collectionList
          ? "empty-card collectionListPage"
          : "empty-card"
      }
    >
      <div onClick={() => gotToPage(collection)} className="emptty-card-top">
        <img
          src={
            collectionList
              ? collection?.logo_uri
              : popularCollection
              ? collection?.featured_uri
              : author
          }
          alt=""
        />
      </div>
      <div className="emptty-card-middle">
        <img src={collection?.logo_uri || author} alt="" />
      </div>
      <div className="emptty-card-bottom">
        <h2>
          {popularCollection || collectionList
            ? collection?.name
            : "Living Vase 01 By Lanz..."}
        </h2>
        <div>
          {popularCollection ? (
            <div>
              <span>Creator:</span>
              <h6>
                <Link to="/">{item?.creatorUser?.name || "Rachelsons"}</Link>
              </h6>
            </div>
          ) : collectionList ? undefined : (
            <div>
              <span>Creator:</span>
              <h6>
                <Link to="/">
                  {collection?.creatorUser?.name || "Rachelsons"}
                </Link>
              </h6>
            </div>
          )}
          {/* <div>
            <span>Creator:</span>
            <h6>
              <h6>
                {popularCollection ? (
                  <Link to="/">
                    {collection?.creatorUser?.name || "Rachelsons"}
                  </Link>
                ) : (
                  <Link to="/">{item?.creatorUser?.name || "Rachelsons"}</Link>
                )}
              </h6>
            </h6>
          </div> */}
          {collectionList && (
            <div style={{ textAlign: "center" }}>
              <h4>{collection?.description}</h4>
            </div>
          )}
          {!popularCollection && !collectionList ? (
            <div>
              <span>Current Bid:</span>
              <h5>{"4.89 ETH"}</h5>
            </div>
          ) : collectionList ? (
            <div className="collectioList-item-footer">
              <div>
                <span>1030</span>
                <h5>tokens</h5>
              </div>
              <div>
                <span>124</span>
                <h5>offers</h5>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
