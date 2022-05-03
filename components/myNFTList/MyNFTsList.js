import React from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/collectionListStyle";
import MyNFTItem from "./MyNFTItem";
const useStyles = makeStyles(styles);

export default function MyNFTsList(props) {
	const classes = useStyles();

	const doCommand = (type, token) => {
		props.handleCommand(type, token);
	}

	return (
		<ul className={classes.items}>
			<MyNFTItem handleClickCommand={doCommand} info={{token: "1"}} isSelected={props.selectedList.includes('1')} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "2"}} isSelected={props.selectedList.includes('2')} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "3"}} isSelected={props.selectedList.includes("3")} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "4"}} isSelected={props.selectedList.includes("4")} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "5"}} isSelected={props.selectedList.includes("5")} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "6"}} isSelected={props.selectedList.includes("6")} handleClickItem={props.handleClickItem} />
			<MyNFTItem handleClickCommand={doCommand} info={{token: "7"}} isSelected={props.selectedList.includes("7")} handleClickItem={props.handleClickItem} />
		</ul>
	);
}

MyNFTsList.propTypes = {};
