import PlaceBid from "../../components/PlaceBid/PlaceBid";
import "./styles.css";
import itemDetail from "../../assets/images/item-detail.jpg";
import LiveAuctions from "../../components/LiveAuctions/LiveAuctions";

const ItemDetails = (itemDetailsPage: any) => {
  return (
    <div className="item-details">
      {/* <PageHeader pageHeader="Item Details" /> */}
      <div className="sc-item-details">
        <img src={itemDetail} alt="" />
        <PlaceBid />
      </div>
      {itemDetailsPage && <LiveAuctions />}
    </div>
  );
};

export default ItemDetails;
