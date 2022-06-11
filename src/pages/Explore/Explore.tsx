import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import SelectMenu from "../../components/MoreComponents/SelectMenu";

import {
  allItems,
  allCategories,
  buyNow,
  allArtWork,
  sortBy,
} from "../../utils/options";

import AuctionCard from "../../components/AuctionCard/AuctionCard";

const Explore = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`/item`)
      .then((res) => {
        setItems(res.data.items);
      })
      .catch((err) => {
        console.log("Err : ", err.message);
        setItems([]);
      });
  }, [items]);

  return (
    <div className="explore-page">
      {/* <PageHeader /> */}
      <div className="explore-page-container">
        <div className="select-menu">
          <div>
            <SelectMenu data={allCategories} initialState="All categories" />
            <SelectMenu data={buyNow} initialState="Buy now" />
            <SelectMenu data={allItems} initialState="All Items" />
          </div>
          <div>
            <SelectMenu data={allArtWork} initialState="All Artwork" />
            <SelectMenu data={sortBy} initialState="Sort by" />
          </div>
        </div>
        <div className="picks-container">
          {items.map((item: any, index: number) => (
            <AuctionCard item={item} TodayPick={true} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
