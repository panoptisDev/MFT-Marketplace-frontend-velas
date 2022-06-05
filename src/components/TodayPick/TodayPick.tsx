import React from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import data from "../../utils/data";
import Title from "../Title/Title";
import "./styles.css";

const TodayPick = () => {
  return (
    <div className="today-pick-component">
      <Title title="Today's Pick" />
      <div className="picks-container">
        {data.map((item: any, index: number) => (
          <AuctionCard item={item} TodayPick={true} />
        ))}
      </div>
    </div>
  );
};

export default TodayPick;
