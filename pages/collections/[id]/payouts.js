import React, {Component, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	Edit,
	ViewList,
	Add,
	MoreVert,
	Facebook,
	Twitter,
	Storefront,
	Send,
	VisibilityOff,
	ArrowDownward, ErrorOutline
} from '@material-ui/icons';

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/earnPageStyle.js";
import {useWeb3} from "@3rdweb/hooks";

const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Page({userInfo}) {
	const classes = useStyles();

	return (
		<div className={classes.container + " " + classes.earnContainer}>
			<h2 className="header-label">Creator Earnings</h2>
			<p className="desc-label">
				After you configure a fee on your collection, pending and completed creator
				earnings to you will appear here. On any given creator earnings round, you'll only receive creator
				earnings if you've accumulated more than ~$60.00 worth of fees.
			</p>
			<div className={classes.earnCardBox}>
				<div className="card-box">
					<div className="card-header">
						<div className="card-title-box">
							<ArrowDownward style={{transform: "rotate(45deg)", marginRight: "10px"}} />
							Creator Earning History
						</div>
					</div>
					<div className="card-sub-header">
						<span className="sub-item" style={{paddingLeft: "20px"}}>Item</span>
						<span className="sub-item">Unit Price</span>
						<span className="sub-item">Quantity</span>
						<span className="sub-item">Fee Earned</span>
						<span className="sub-item" style={{paddingRight: "20px"}}>Creator Earnings</span>
					</div>
					<div className="card-body">
						<div className="empty-box">
							<img src="/img/parts/empty-bids.svg" className="empty-img" />
							<span style={{marginTop: "10px"}}>No offers yet.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps({params}) {
	// TODO get items of collection from params.companyName, params.groupName
	const userInfo = {}
	return {
		props: {
			userInfo
		}
	}
}

export async function getStaticPaths() {
	// TODO get collection names from db.
	const paths =
		[
			{
				params: {
					id: "untitled-collection-316120299",
				}
			},
		]
	return {
		paths,
		fallback: false
	}
}
