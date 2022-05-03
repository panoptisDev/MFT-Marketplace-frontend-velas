import React, { useState } from "react";

//components
import Button from "components/CustomButtons/Button.js";
import {Check, ErrorOutline} from '@material-ui/icons';

// style
import {makeStyles} from "@material-ui/core/styles";
import tooltipsStyle from "styles/jss/nextjs-material-kit/tooltipsStyle.js";
import styles from "styles/jss/nextjs-material-kit/components/account/settings/offerStyle";
import Tooltip from "@material-ui/core/Tooltip";
import Image from "next/image";

const useStyles = makeStyles({...styles, ...tooltipsStyle});

export default function Offer() {
	const classes = useStyles();

	return (
		<div style={{ color: '#ffffff' }}>
			<div className={classes.header}>
				<h2>Offer Settings</h2>
				<Button color="actionButton" type={'button'}><strong>View my offers</strong></Button>
			</div>
			<p style={{ display: 'flex', margin: '25px 0 25px 0' }}>
				<span>This is the collection where your item will appear.</span>
				<Tooltip
					id="tooltip-top"
					title="Moving items to a different collection may take up to 30 minutes."
					placement="top"
					classes={{ tooltip: classes.tooltip }}
				>
					<ErrorOutline className="tooltip-icon" />
				</Tooltip>
			</p>
			<div className={ classes.noOffers }>
				<Image width={110} height={126} loading={'lazy'}  src={'/img/account/offer-settings-illustration.svg'}/>
				<h4 style={{ fontWeight: 'bold', margin: "20ox 0 30ox 0" }}>No collections to manage offers</h4>
				<p style={{ maxWidth: '333px' }}>You currently don’t have any collections and items to manage offers.</p>
			</div>
		</div>
	);
}

Offer.propTypes = {};
