import React, { useState } from "react";

//components
import Button from "components/CustomButtons/Button";
import {Check} from '@material-ui/icons';
import Checkbox from "@material-ui/core/Checkbox";

// style
import {makeStyles} from "@material-ui/core/styles";
import javascriptStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles";
import styles from "styles/jss/nextjs-material-kit/components/account/settings/notificationStyle";
import basicsStyle from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle";

const useStyles = makeStyles({...styles, ...javascriptStyles, ...basicsStyle});

export default function Profile() {
	const classes = useStyles();
	const [itemSold, setItemSold] = useState(true);
	const [threshold, setThreshold] = useState('0.005');
	// const itemSoldHandle = () => {
	// 	itemSold ? setItemSold(false) : setItemSold(true)
	// }
	const [checked, setChecked] = useState([1, 2]);
	const thresholdHandle = (e) => {
		setThreshold(e.target.value);
	};
	const checkHandle = (value) => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	return (
		<div>
			<div className={classes.header}>
				<h2>Notification Settings</h2>
			</div>
			<form className={ classes.form }>
				<div className={ classes.formControl }>
					<p>Select which notifications you would like to receive for 0x2c7a...bfba</p>
				</div>
				<div className={ classes.formControl + " " + classes.checkGroup }>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(1)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Item Sold</h4>
							<p>When someone purchased one of your items</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(2)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Bid Activity</h4>
							<p>When someone bids on one of your items</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(3)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Price Change</h4>
							<p>When an item you made an offer on changes in price</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(4)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Auction Expiration</h4>
							<p>When a timed auction you created ends</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(5)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Outbid</h4>
							<p>When an offer you placed is exceeded by another user</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(6)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Owned Item Updates</h4>
							<p>When a significant update occurs for one of the items you have purchased on OpenSea</p>
						</div>
					</div>
					<div className={ classes.checkItem }>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(7)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>Successful Purchase</h4>
							<p>When you successfully buy an item</p>
						</div>
					</div>
					<div className={ classes.checkItem } style={{ borderRadius: '0 0 6px 6px' }}>
						<Checkbox
							tabIndex={-1}
							onClick={() => checkHandle(8)}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
							style={{ margin: '10px' }}
						/>
						<div>
							<h4>OpenSea Newsletter</h4>
							<p>Occasional updates from the OpenSea team</p>
						</div>
					</div>
				</div>
				<div className={ classes.formControl }>
					<h4>Minimum Bid Threshold</h4>
					<p>Receive notifications only when you receive offers with a value greater than or equal to this amount of ETH.</p>
				</div>
				<div style={{
					display: 'flex',
					background: "transparent",
					border: '1px solid',
					borderRadius: '5px',
				}} className={ classes.formControl } >
					<div className={classes.tokenItemStyle}>
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
					</div>
					<input style={{ border: 'none', background: 'none', fontSize: '20px', overflow: 'hidden' }} value={threshold} onChange={thresholdHandle} />
				</div>
				<Button color="actionButton" type={'submit'} className={ classes.saveBtn }><strong>Save</strong></Button>
			</form>
		</div>
	);
}

Profile.propTypes = {};
