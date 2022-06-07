import { useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "@material-ui/core";
import Button from "../../components/MoreComponents/Button";
import "./makeOffer.scss";
import Select from "react-select";
import FormatsortOptionLabel from "../../components/itemDetail/FormatsortOptionLabel";
import FormatMoneyOptionLabel from "../../components/itemDetail/FormatsortOptionLabel";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function MakeOffer({ balance, nftFee, onClose, onSubmit }: any) {
  const [open, setOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [offerPrice, setOfferPrice] = useState(0);
  const options = [
    { value: "usd", label: "USD", customAbbreviation: "" },
    { value: "eth", label: "ETH", customAbbreviation: "" },
    { value: "sol", label: "SOL", customAbbreviation: "" },
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

  const makeOffer = () => {
    handleClose();
    onSubmit(offerPrice);
  };
  const onChangePrice = (value: any) => {
    console.log(parseFloat(value.target.value));
    setOfferPrice(parseFloat(value.target.value));
  };

  return (
    <Modal
      className="place-offer"
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
        <div className="place_bid_title">Make an offer</div>
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
        <p className="flex-start">Offer Expiration</p>
        <div className="row-div">
          <Select
            defaultValue={options1[0]}
            formatOptionLabel={FormatsortOptionLabel}
            options={options1}
            instanceId="chainSelect"
            className="select-gray flex-1 m-r-5"
          />
          <span className="time">
            <AccessTimeIcon />{" "}
            {new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(Date.now())}
          </span>
        </div>

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
            className={`explore  make-offer ${!isChecked ? "is-disabled" : ""}`}
            onClick={makeOffer}
            label="Make Offer"
          />
          {/* <Button
            className=""
            onClick={makeOffer}
            variant="contained"
            color="primary"
            disabled={!isChecked}
          >
            Make Offer
          </Button> */}
          <Button
            className="explore  make-offer"
            onClick={handleClose}
            label="Add Funds"
            disabled={!isChecked}
          />
          {/* <Button
            className="addFund"
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Add Funds
          </Button> */}
        </div>
      </div>
    </Modal>
  );
}
