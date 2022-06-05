import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "../MoreComponents/Button";
import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";
import "./styles.scss";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 350,
      height: 470,
      backgroundColor: "#343444",
      border: "none",
      outline: "none",
      boxShadow: theme.shadows[5],
      left: "50%",
      padding: "20px",
      top: "50%",
      color: "white",
      transform: "translate(-50%,-50%)",
      display: "flex",
      justifyContent: "space-center",
      alignItems: "center",
      flexDirection: "column",
      borderRadius: "15px",
    },
  })
);

export default function BidModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 style={{ fontSize: "24px" }} id="simple-modal-title">
        Place a Bid
      </h2>
      <p id="simple-modal-description"></p>
      <div className="modal-bid-input">
        <div>
          <label htmlFor="">
            You must bid at least <strong>4.89 ETH</strong>
          </label>
          <input placeholder="00.00 ETH" type="number" />
        </div>
        <div>
          <label htmlFor="">
            Enter quantity. <strong>5 available</strong>
          </label>
          <input placeholder="" type="number" />
        </div>
      </div>
      <div className="modal-bid-details">
        <p>You must bid at least:</p>
        <span>
          <strong>4.89 ETH</strong>
        </span>
      </div>
      <div className="modal-bid-details">
        <p>Service free:</p>
        <span>
          <strong>0,89 ETH</strong>
        </span>
      </div>

      <div className="modal-bid-details">
        <p>Total bid amount:</p>
        <span>
          <strong>4 ETH</strong>
        </span>
      </div>
      <Button
        itemDetails={true}
        label="Place a bid"
        onClick={handleClose}
        className="explore bid-modal"
      />
    </div>
  );

  return (
    <div>
      <Button
        onClick={handleOpen}
        itemDetails={true}
        icon={<ShoppingBag />}
        label="Place a bid"
        className="send-message item-detail"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
