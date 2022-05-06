import React from "react";
``
// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/offerListStyle";
import OfferItem from "./OfferItem";
const useStyles = makeStyles(styles);

export default function OfferList() {
	const classes = useStyles();
	return (
		<ul className={classes.items + ' items'}>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
			<OfferItem/>
		</ul>
	);
}

OfferList.propTypes = {};
