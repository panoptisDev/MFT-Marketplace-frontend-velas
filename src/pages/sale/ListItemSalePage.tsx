import "./ListItemSalePage.scss";

import { useEffect, useState } from "react";
import Button from "../../components/MoreComponents/Button";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createAuction, listItem } from "../../utils/contracts";
import axios from "axios";
import moment from "moment";
import FixedPrice from "./FixedPrice";
import TimedAuction from "./TimedAuction";
import SaleType from "./SaleType";
import { Modal } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const ListItemSalePage = ({
  item,
  balance,
  nftFee,
  onClose,
  onSubmit,
}: any) => {
  const { register, handleSubmit }: any = useForm();

  const { account, active, chainId, library } = useWeb3React();
  const [saleType, setSaleType] = useState("FixedPrice");

  const [listing, setListing] = useState(false);
  const onCancelListing: any = async (updatedData: any) => {
    let startTimeStamp = 0;
    let endTimeStamp = 0;
    if (!account || !library) {
      toast.error("Please connect your wallet correctly!");
      return;
    }

    if (saleType === "FixedPrice") {
      if (!updatedData.price) {
        toast.error("NFT Price is required!");
        return;
      }

      if (parseFloat(updatedData.price) <= 0) {
        toast.error("NFT price should be more than 0!");
        return;
      }
    } else if (saleType === "TimedAuction") {
      if (!updatedData.price) {
        toast.error("NFT Price is required!");
        return;
      }

      if (parseFloat(updatedData.price) <= 0) {
        toast.error("NFT price should be more than 0!");
        return;
      }
      if (!updatedData.startTime) {
        toast.error("Starting Date is required!");
        return;
      }

      if (!updatedData.endTime) {
        toast.error("End Date is required!");
        return;
      }
      startTimeStamp = Math.floor(
        moment(updatedData.startTime).valueOf() / 1000
      );
      endTimeStamp = Math.floor(moment(updatedData.endTime).valueOf() / 1000);
      const curTimeStamp = Math.floor(new Date().getTime() / 1000);
      if (startTimeStamp < curTimeStamp) {
        toast.error("The start time must be after the current time.");
        return;
      }
      if (startTimeStamp >= endTimeStamp) {
        toast.error("End time should be late than start time!");
        return;
      }
    }
    setListing(true);
    const load_toast_id = toast.loading("Please wait...");
    const tokenId =
      saleType === "FixedPrice"
        ? await listItem(
            item.itemCollection,
            account,
            item.tokenId,
            updatedData.price,
            chainId,
            library.getSigner()
          )
        : await createAuction(
            item.itemCollection,
            account,
            item.tokenId,
            updatedData.price,
            startTimeStamp,
            endTimeStamp,
            chainId,
            library.getSigner()
          );
    if (tokenId) {
      axios
        .get("/sync_block")
        .then((res) => {
          toast.dismiss(load_toast_id);
          toast.success("Listed Successfully");
          setListing(false);
          onClose(true);
        })
        .catch((err) => {
          console.log(err);
          toast.dismiss(load_toast_id);
          toast.error("Listing failed.");
        });
    } else {
      toast.dismiss(load_toast_id);
      toast.error("Listing failed.");
    }
  };
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal
      className="listingPage"
      open={true}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown")
          return false;
      }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="modal-content">
        <div className="row-div">
          <Button onClick={handleClose} className="closeBtn">
            <ArrowBackIcon />
          </Button>
        </div>
        <form className="saleContainer" onSubmit={handleSubmit()}>
          <div className="row-div">
            <SaleType setSaleType={setSaleType}></SaleType>
            {saleType === "FixedPrice" ? (
              <FixedPrice register={register} balance={balance} />
            ) : (
              <></>
            )}
            {saleType === "TimedAuction" ? (
              <TimedAuction register={register} />
            ) : (
              <></>
            )}
          </div>
          <Button className="listBtn outLineBtn" disabled={listing}>
            <strong>Complete Listing</strong>
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ListItemSalePage;
