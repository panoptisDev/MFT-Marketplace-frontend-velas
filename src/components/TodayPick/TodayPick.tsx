import { useEffect, useState } from "react";
import AuctionCard from "../AuctionCard/AuctionCard";
import Title from "../Title/Title";
import "./styles.css";

import axios from "axios";

const TodayPick = () => {
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

  const getDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = newDate.getMonth() - 1;
    const d = newDate.getDate();
    const date = new Date(year, month, d);
    return Math.floor(date.getTime() / 1000);
  };

  return (
    <div className="today-pick-component">
      <Title title="Today's Pick" />
      <div className="picks-container">
        {items &&
          items
            .filter((item: any) => {
              return item?.timestamp > getDate();
            })
            .map((item: any, index: number) => (
              <AuctionCard item={item} TodayPick={true} key={index} />
            ))}
      </div>
    </div>
  );
};

export default TodayPick;
