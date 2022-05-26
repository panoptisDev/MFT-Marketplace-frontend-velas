import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button, Modal } from '@material-ui/core';
import './cancelListPage.scss'
export default function CancelListPage({ balance, nftFee, onClose, onSubmit }) {
  const [bidPrice, setBidPrice] = useState();

  const handleClose = () => {
    onClose();
  };

  const onCancelListing = () => {
    if (parseFloat(bidPrice) > balance) {
      toast.error('Your bid price is out of your balance');
      return;
    }
    handleClose();
    onSubmit(bidPrice);
  };
  return (
    <Modal
      className='cancelListPage'
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
        <div className='modal-content'>
          <div className="title">Are you sure you want to cancel your listing?</div>
            <div className="row-div">
              <p>Canceling your listing will unpublish this sale from this site and requires a transaction to make sure it will never be fulfillable.</p>

            </div>
            <br />
            <div className="btns">
            <Button className="" onClick={handleClose} variant="contained" color="primary">Never mind</Button>            
            <Button className="" onClick={onCancelListing} variant="contained" color="primary">Cancel Listing</Button>      
          </div>
                
        </div>
      </Modal>
  );
}
