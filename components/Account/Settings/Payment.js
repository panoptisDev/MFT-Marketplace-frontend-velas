import React, { useState } from "react";
import Image from "next/image";

//components
import Button from "components/CustomButtons/Button.js";
import {LooksOne, LooksTwo} from '@material-ui/icons';

// style
import {makeStyles} from "@material-ui/core/styles";
import javascriptStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
import styles from "styles/jss/nextjs-material-kit/components/account/settings/paymentStyle";

const useStyles = makeStyles({...styles, ...javascriptStyles});

export default function Offer() {
	const classes = useStyles();

	return (
		<div className={ classes.payment }>
			<h2>
				Payment Settings
			</h2>

			<div className={ classes.smallHead }>
				<h4>Accept card payments</h4>
				<div style={{ display: 'flex' }}>
					<span>Verification by &nbsp;</span>
					<Image  src={'/img/account/MoonpayLogo.svg'} width={96} height={17}/>
				</div>
			</div>
			<p>Complete the verification steps below to accept card payments for your listings, using Moonpay.</p>
			<p>Moonpay is required to collect certain information to use their services. This information is not stored by OpenSea.</p>
			<div style={{ border: '1px solid', borderRadius: '6px' }}>
				<div className={ classes.verify }>
					<div className={'main'}>
						<LooksOne />
						<div>
							<h4>Basic verification</h4>
							<span>Buy or sell up to $7,500 worth of NFTs through card payments with Moonpay.</span>
						</div>
						<Button color={'info'} round>Begin</Button>
					</div>
					<ul>
						<li>Name</li>
						<li>Date of birth</li>
						<li>residence</li>
					</ul>
				</div>
				<div className={ classes.verify } style={{ borderTop: '1px solid' }} >
					<div className={'main'}>
						<LooksTwo />
						<div>
							<h4>Advanced verification</h4>
							<span>Buy or sell NFTs with no lifetime limits</span>
						</div>
						<Button color={'info'} round>Begin</Button>
					</div>
					<ul>
						<li>Advanced customer verification</li>
						<li>ID Verification</li>
					</ul>
				</div>
			</div>

		</div>
	);
}

Offer.propTypes = {};
