import React from "react";
import "./styles.css";
import avt from "../../assets/images/avt-8.jpg";
import CustomLink from "./Link";
import { AiOutlineCheck } from "react-icons/ai";

const BidHistory = ({ name, history, price, bidHistory }: any) => {
  return (
    <div className="bid-history">
      <div className="bid-history-left">
        <div>
          <div className="bid-history-popular">
            <img src={avt} alt="" />
            <div>
              <AiOutlineCheck />
            </div>
          </div>
        </div>
        <div className="bid-history-left-block">
          <div>
            <CustomLink title="Mason Woodward" navgitor="/" />
            <span>place a bid</span>
          </div>
          <span>8 hours ago</span>
        </div>
      </div>
      {bidHistory && (
        <div className="bid-history-right">
          <h5>4.89 ETH</h5>
          <span>= $12.246</span>
        </div>
      )}
    </div>
  );
};

export default BidHistory;
