import React, { useState } from "react";

// material-ui components
import TokenDropdown from "components/Dropdown/TokenDropdown";
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/createCollection/paymentTokensStyle";
import Select from "react-select";
import formatOptionLabel from "./FormatOptionLabelTioken";

const useStyles = makeStyles(styles);

const options = [
	{ value: "dai", label: "DAI", customAbbreviation: "Ethereum" },
	{ value: "ash", label: "ASH", customAbbreviation: "Ethereum" },
	{ value: "bat", label: "BAT", customAbbreviation: "Ethereum" },
];

const tokenItemStyle = {
	display: "flex",
	alignItems: "center",
	background: "transparent",
	border: '1px solid',
	margin: '1px 6px 6px 1px',
	borderRadius: '5px',
	padding: '8px 15px 8px 13px'
}

const removeIconStyle = {
	display: 'flex',
	alignItems: 'center',
	marginLeft: '15px',
	background: 'none',
	fontSize: 'xx-large',
	border: 'none',
	cursor: 'pointer'
}

const tokenGroupStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	margin: '10px 0'
}

export default function CreateCollection() {
	const classes = useStyles();
	return (
		<div className={'formControl'}>
			<h4><strong>Payment tokens</strong></h4>
			<p>These tokens can be used to buy and sell your items.</p>
			<div style={ tokenGroupStyle } >
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
							<div style={{fontWeight: "bold"}}>ETH</div>
							<div>
								Ethereum
							</div>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
							<div style={{fontWeight: "bold"}}>ETH</div>
							<div>
								Ethereum
							</div>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
							<div style={{fontWeight: "bold"}}>ETH</div>
							<div>
								Ethereum
							</div>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
							<div style={{fontWeight: "bold"}}>ETH</div>
							<div>
								Ethereum
							</div>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
			</div>

			<Select
				defaultValue={options[0]}
				formatOptionLabel={formatOptionLabel}
				options={options}
				className={classes.mySelect}
				instanceId='tokenSelect'
			/>
		</div>
	);
}

CreateCollection.propTypes = {};
