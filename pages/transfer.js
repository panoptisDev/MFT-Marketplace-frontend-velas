import { useRouter } from 'next/router'
import {useWeb3} from "@3rdweb/hooks";
import React, {useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/CustomButtons/Button";
import {Block, Send, ChevronRight} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/transferItem.js";
import item from "./create/item";
const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Transfer(props) {
	const classes = useStyles();
	const router = useRouter();
	const { assets } = router.query;
	let items = [];
	if (assets && !Array.isArray(assets)) {
		items.push(assets);
	} else {
		items = assets;
	}

	return (
		<>
			<div className={classes.container}>
				<GridContainer className={classes.transferStyle}>
					<GridItem xs={12} sm={12} md={8} lg={9}>
						<h1 className="top text-white" align="center">Transfer Items</h1>
						{
							items.map((item, key) =>
								<div className="item-list" key={key}>
									<div className="item">
										<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" alt="item img"
											 className="item-img" />
										<div className="item-content">
											<div className="item-collection">VelasApesClub #123123123</div>
											<div className="item-name">Hamsters Gang</div>
										</div>
									</div>
								</div>
							)
						}
						<p className="text-white text-label">Address</p>
						<input className="bordered-input" placeholder="e.g. 0x8eA3F... or destination.eth"/>
						<div className="send-box">
							<Button color="actionButton">Transfer</Button>
						</div>
					</GridItem>
				</GridContainer>
			</div>
		</>
	);
}
