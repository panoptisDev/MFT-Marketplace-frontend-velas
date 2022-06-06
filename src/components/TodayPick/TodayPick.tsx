import React, { useEffect, useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import Title from "../Title/Title";
import "./styles.css";

import { useWeb3React } from "@web3-react/core";
import axios from 'axios';


const TodayPick = () => {

  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get(`/item`)
    .then((res) => {
      setItems(res.data.items);
    }).catch((err) => {
      console.log("Err : ", err.message);
      setItems([]);
    })
  }, [items])
  
  return (
    <div className="today-pick-component">
      <Title title="Today's Pick" />
      <div className="picks-container">
        {items && items.map((item: any, index: number) => (
          <AuctionCard item={item} TodayPick={true} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodayPick;
