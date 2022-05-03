import React from "react";
``
// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/tradeListStyle";
import TradeItem from "./TradeItem";
const useStyles = makeStyles(styles);

export default function TradeList() {
	const classes = useStyles();
	return (
		<ul className={classes.items + ' items'}>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
			<TradeItem/>
		</ul>
	);
}

TradeList.propTypes = {};
