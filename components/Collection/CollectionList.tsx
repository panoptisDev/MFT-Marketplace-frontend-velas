import React from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/collectionListStyle";
import CollectionItem from "./CollectionItem";
const useStyles = makeStyles(styles);

export default function CollectionList() {
	const classes = useStyles();
	return (
		<ul className={classes.items + ' items'}>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
			<CollectionItem/>
		</ul>
	);
}

CollectionList.propTypes = {};
