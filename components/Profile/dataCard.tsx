import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LocalOffer, ShoppingCart, ErrorOutline, KeyboardArrowUp, Check, ArrowDownward} from '@material-ui/icons';
import styles from "styles/jss/nextjs-material-kit/components/profile/dataCardStyle";
const useStyles = makeStyles({...styles});
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import formatMoneyOptionLabel from "components/Profile/formatMoneyOptionLabel";

const DataCard = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className="card-box">
				<div className="card-header">
					<div className="card-title-box">
						<ArrowDownward style={{transform: "rotate(45deg)", marginRight: "10px"}} />
						Offers Received
					</div>
					<div className="card-detail-box">
						Cancel All Listings and Offers
						<ErrorOutline style={{marginLeft: "10px"}} />
					</div>
				</div>
				<div className="card-body">
					<div className="empty-box">
						<img src="/img/parts/empty-bids.svg" className="empty-img" />
						<span style={{marginTop: "10px"}}>No offers yet.</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DataCard;
