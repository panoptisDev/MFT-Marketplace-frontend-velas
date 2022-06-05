import React from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./styles.css";
import SelectMenu from "../../components/MoreComponents/SelectMenu";

import {
  allItems,
  allCategories,
  buyNow,
  allArtWork,
  sortBy,
} from "../../utils/options";
import data from "../../utils/data";
import AuctionCard from "../../components/AuctionCard/AuctionCard";

const Explore = () => {
  return (
    <div className="explore-page">
      <PageHeader pageHeader="Explore" />
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
          {data.map((item: any, index: number) => (
            <AuctionCard item={item} TodayPick={true} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
