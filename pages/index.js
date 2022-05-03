import React, {Component} from "react";
import Router from "next/router";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/CustomButtons/Button";
import Parallax from "../components/Parallax/Parallax";
import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";
const useStyles = makeStyles(styles);

export default function Index(props) {
	const classes = useStyles();

	return (
		<Parallax filter responsive image="/img/bg8.jpg" style={{height: '100vh'}}>
			<div className={classes.container}>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12} className={classes.textCenter}>
						<h1 className={classes.title} style={{marginTop: '20px'}}>NFT Marketplace</h1>
						<h4>Unit of data stored on a digital ledger, called a blockchain,
							that certifies a digital asset to be unique and therefore not interchangeable</h4>
						<Button
							color="actionButton"
							size="lg"
							href="/collections"
							rel="noopener noreferrer"
						>
							Browse All Collections
						</Button>
						<div className={classes.homeLogoBox}>
							<img src={'/img/logos/velas.svg'} />
							<img src={'/img/logos/celo.svg'} />
							<img src={'/img/logos/moonbeam.svg'} />
						</div>
					</GridItem>
				</GridContainer>
			</div>
		</Parallax>
	);
}
