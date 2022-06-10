import React from "react";
import "./TradingHistory.css";
import { VscLinkExternal } from "react-icons/vsc";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { data1 } from "./TradingData";

const TradingHistory = ({ loginStatus, item, account }: any) => {
  return (
    <div className="what-so-ever">
      <div className="trading-history">
        <div className="history-titles">
          {/* <span
            className="span__event"
            style={{
              marginLeft: "15px",
            }}
          >
            Event
          </span> */}
          {/* <th>Event</th>
          <th>Price</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th> */}
          <span className="span__item">Event</span>
          <span className="span__unit-price">Price</span>
          <span className="span__quantity">From</span>
          <span className="span__from">To</span>
          <span className="span__to">Date</span>
        </div>
        <div className="trading-values">
          {
            item.events.length > 0 ? (
              <div>
                {/* <div>Event</div>
              <div>Price</div>
              <div>From</div>
              <div>To</div>
            <div>Date</div> */}
                {item.events.map((event: any, key: any) => {
                  return (
                    <div key={key} className="each-traded-item">
                      <span className="span__item">{event.name}</span>
                      <span className="span__unit-price">
                        {event.price} ETH
                      </span>
                      <span className="span__from">
                        {event.from === account && loginStatus
                          ? "You"
                          : String(event.from).substring(2, 7).toUpperCase()}
                      </span>
                      <span className="span__to">
                        {event.to === account && loginStatus
                          ? "You"
                          : String(event.to).substring(2, 7).toUpperCase()}
                      </span>
                      <span className="span__date">
                        {Math.floor(new Date().getTime() / 1000) -
                          parseFloat(event.timestamp)}{" "}
                        days ago
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : undefined
            // <div className="col-div aic jcc">
            //   <img src="/assets/no-chart-data.svg" alt="" />
            //   <p className="billy-desc">No item activity yet</p>
            // </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TradingHistory;
