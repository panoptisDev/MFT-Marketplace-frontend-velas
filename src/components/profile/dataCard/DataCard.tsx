import { ErrorOutline, ArrowDownward } from "@material-ui/icons";
import "./dataCard.scss";

const DataCard = () => {
  return (
    <div className="container">
      <div className="card-box">
        <div className="card-header">
          <div className="card-title-box">
            <ArrowDownward
              style={{ transform: "rotate(45deg)", marginRight: "10px" }}
            />
            Offers Received
          </div>
          <div className="card-detail-box">
            Cancel All Listings and Offers
            <ErrorOutline style={{ marginLeft: "10px" }} />
          </div>
        </div>
        <div className="card-body">
          <div className="empty-box">
            <img
              src="/assets/img/parts/empty-bids.svg"
              className="empty-img"
              alt=""
            />
            <span style={{ marginTop: "10px" }}>No offers yet.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
