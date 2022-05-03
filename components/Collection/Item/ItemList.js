import React from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/itemListStyle";
import Item from "./Item";
const useStyles = makeStyles(styles);

export default function ItemList() {
	const classes = useStyles();
	return (
		<ul className={classes.items}>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
			<Item/>
		</ul>
	);
}

ItemList.propTypes = {};
