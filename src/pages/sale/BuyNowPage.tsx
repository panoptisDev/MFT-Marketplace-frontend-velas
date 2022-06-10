import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Modal } from "@material-ui/core";
import "./BuyNowPage.scss";
export default function BuyNowPage({
  balance,
  nftFee,
  onClose,
  onSubmit,
}: any) {
  const [bidPrice, setBidPrice] = useState<any>();

  const handleClose = () => {
    onClose();
  };

  const onBuyNow = () => {
    if (parseFloat(bidPrice) > balance) {
      toast.error("Your bid price is out of your balance");
      return;
    }
    handleClose();
    onSubmit();
  };
  return (
    <Modal
      className="cancelListPage"
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
        <div className="title">
          Are you sure you want to buy this Item?
        </div>
        <br />
        <div className="btns">
          <Button
            className=""
            onClick={handleClose}
            variant="contained"
            color="primary"
          >
            Never mind
          </Button>
          <Button
            className=""
            onClick={onBuyNow}
            variant="contained"
            color="primary"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Modal>
  );
}
