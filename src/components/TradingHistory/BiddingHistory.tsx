import "./TradingHistory.css";

const BiddingHistory = ({ loginStatus, item, account }: any) => {
  return (
    <div className="what-so-ever">
      <div className="trading-history bidding-history">
        <div className="history-titles">
          <span className="span__item">Price</span>
          <span className="span__unit-price">Expiration</span>
          <span className="span__quantity">From</span>
        </div>
        <div className="trading-values">
          {item?.auction.bids?.length > 0 ? (
            <div>
              {item?.auction.bids.map((bid: any, key: any) => {
                return (
                  <div key={key} className="each-traded-item">
                    <span className="span__item">{bid.bidPrice}</span>
                    <span className="span__unit-price">
                      {Math.ceil(
                        // (parseFloat(item.auction.endTime) -
                        //   parseFloat(bid.timestamp)) /
                        (item?.auction.endTime - bid.timestamp) / (60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                    <span className="span__quantity">
                      {" "}
                      {String(bid.from).substring(2, 7).toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default BiddingHistory;
