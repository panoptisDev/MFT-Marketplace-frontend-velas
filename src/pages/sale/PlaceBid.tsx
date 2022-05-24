import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from '@material-ui/core';

export default function PlaceBid({ balance, nftFee, onClose, onSubmit }) {
  const [open, setOpen] = useState(true);
  const [currencyValue, setCurrencyValue] = useState('ETH');
  const [bidPrice, setBidPrice] = useState();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const placeBid = () => {
    if (parseFloat(bidPrice) > balance) {
      toast.error('Your bid price is out of your balance');
      return;
    }
    handleClose();
    onSubmit(bidPrice);
  };
  const onChangePrice = value => {
    setBidPrice(value);
  };

  return (
    <Modal
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
        <div>
        <div className="place_bid_title">Place a Bid</div>
           <div className="placeContainer">
             <input name="price" onChange={onChangePrice} placeholder="Your Bid Price:" />
             <div>The price should be higer than 0.111ETH</div>
             <select>
               <option value="eth">ETH</option>
             </select>
           </div>
           <br />
          <Button className="" onClick={handleClose} variant="contained" color="primary">Close</Button>            
          <Button className="" onClick={placeBid} variant="contained" color="primary">Place a Bid</Button>            
        </div>
      </Modal>
  );
}
