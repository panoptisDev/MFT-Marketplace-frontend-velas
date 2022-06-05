//components
import Button from "../../MoreComponents/Button";
import { ErrorOutline } from "@material-ui/icons";

// style
import Tooltip from "@material-ui/core/Tooltip";
import "./offers.scss";

export default function Offer() {
  return (
    <div className="settingContainer">
      <div className="header">
        <h2>Offer Settings</h2>
        <Button className="outLineBtn">
          <strong>View my offers</strong>
        </Button>
      </div>
      <p style={{ display: "flex", margin: "25px 0 25px 0" }}>
        <span>This is the collection where your item will appear.</span>
        <Tooltip
          id="tooltip-top"
          title="Moving items to a different collection may take up to 30 minutes."
          placement="top"
          classes={{ tooltip: "tooltip" }}
        >
          <ErrorOutline className="tooltip-icon" />
        </Tooltip>
      </p>
      <div className="noOffers">
        <img
          width={110}
          height={126}
          loading={"lazy"}
          src={"/assets/img/account/offer-settings-illustration.svg"}
          alt=""
        />
        <h4 style={{ fontWeight: "bold", margin: "20ox 0 30ox 0" }}>
          No collections to manage offers
        </h4>
        <p style={{ maxWidth: "333px" }}>
          You currently don’t have any collections and items to manage offers.
        </p>
      </div>
    </div>
  );
}

Offer.propTypes = {};
