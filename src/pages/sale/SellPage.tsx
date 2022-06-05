import { useState } from "react";
import { Button, Modal, Tooltip } from "@material-ui/core";
import "./sellPage.scss";
import Select from "react-select";
import FormatsortOptionLabel from "../../components/itemDetail/FormatsortOptionLabel";
import FormatMoneyOptionLabel from "../../components/profile/FormatMoneyOptionLabel";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SaleType from "./SaleType";
import { ErrorOutline } from "@material-ui/icons";

export default function SellPage({ balance, nftFee, onClose, onSubmit }: any) {
  const [open, setOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);

  const options = [
    { value: "usd", label: "USD", customAbbreviation: "" },
    { value: "eth", label: "ETH", customAbbreviation: "" },
    { value: "sol", label: "SOL", customAbbreviation: "" },
  ];

  const methodOptions = [
    {
      value: "highest_bidder",
      label: "Sell to highest bidder",
      customAbbreviation: "",
    },
    {
      value: "lowest_bidder",
      label: "Sell to lowest bidder",
      customAbbreviation: "",
    },
  ];

  const options1 = [
    { value: "1d", label: "1 day", customAbbreviation: "1d" },
    { value: "2d", label: "2 days", customAbbreviation: "2d" },
    { value: "3d", label: "3 days", customAbbreviation: "3d" },
    { value: "7d", label: "7 days", customAbbreviation: "7d" },
    { value: "1m", label: "Bundles", customAbbreviation: "1m" },
  ];

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const completeListing = () => {
    handleClose();
    onSubmit(offerPrice);
  };
  const onChangePrice = (value: any) => {
    console.log(parseFloat(value.target.value));
    setOfferPrice(parseFloat(value.target.value));
  };
  const [sellType, setSellType] = useState("FixedPrice");
  return (
    <Modal
      className="sellPage"
      open={true}
      onClose={(event, reason) => {
        if (reason === "backdropClick") {
          return false;
        }
        if (reason === "escapeKeyDown") {
          return false;
        }
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content">
        <div className="place_bid_title">List item for sale</div>
        <p className="flex-start">Type</p>
        <SaleType setSaleType={setSellType} />

        <p className="space-between mb-1 mt-1">
          Method
          <Tooltip
            id="tooltip-top"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum fuga unde laboriosam molestias deleniti tempora obcaecati harum aperiam iusto quae quo quisquam,"
            placement="top"
            classes={{ tooltip: "tooltip" }}
            className="myTooltip"
          >
            <ErrorOutline className="tooltip-icon" />
          </Tooltip>
        </p>
        <div className="row-div">
          <Select
            defaultValue={methodOptions[0]}
            formatOptionLabel={FormatsortOptionLabel}
            options={methodOptions}
            instanceId="chainSelect"
            className="select-gray flex-1 radius1"
          />
        </div>
        <p className="flex-start">Price</p>
        <div className="placeContainer">
          <Select
            defaultValue={options[0]}
            formatOptionLabel={FormatMoneyOptionLabel}
            options={options}
            instanceId="chainSelect"
            className="select-gray flex-1 m-r-5"
          />
          <input
            className="price"
            name="price"
            onChange={onChangePrice}
            placeholder="Amount"
          />
          <span className="usd">$0.00</span>
        </div>

        <div className="balance">
          <p> Available: {balance.toFixed(3)} ETH</p>
        </div>
        <p className="flex-start">Duration</p>
        <div className="row-div">
          <Select
            defaultValue={options1[0]}
            formatOptionLabel={FormatsortOptionLabel}
            options={options1}
            instanceId="chainSelect"
            className="select-gray radius2 flex-1"
          />
        </div>
        <p className="space-between mb-1 mt-1">
          Fees
          <Tooltip
            id="tooltip-top"
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores earum fuga unde laboriosam molestias deleniti tempora obcaecati harum aperiam iusto quae quo quisquam,"
            placement="top"
            classes={{ tooltip: "tooltip" }}
            className="myTooltip"
          >
            <ErrorOutline className="tooltip-icon" />
          </Tooltip>
        </p>
        <p className="space-between">
          <span> Service Fee</span>
          <span>2.5%</span>
        </p>
        <div className="check-content">
          <input
            type="checkbox"
            className="check"
            defaultChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p>
            I agree to{" "}
            <a href="/" target={"_blank"}>
              Terms of Service.
            </a>
          </p>
        </div>
        <br />
        <div className="btns">
          <Button
            className=""
            onClick={completeListing}
            variant="contained"
            color="primary"
            disabled={!isChecked}
          >
            Complete listing
          </Button>
          <Button
            className="addFund"
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
