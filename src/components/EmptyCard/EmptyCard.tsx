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
          src={collection?.featured_uri || author} alt=""
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
          <div>
            <span>Creator:</span>
            <h6>
              <Link rel='noopener noreferrer' target="_blank" to={{
                        pathname: "/account/" + collection?.user.address,
                        search: "?tab=collections",
                      }}>
                {collection?.user?.name || "Rachelsons"}
              </Link>
            </h6>
          </div>


          <div style={{ textAlign: "center" }}>
            <p>{collection?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
