import React, { useState } from "react";

//components
import Button from "components/CustomButtons/Button.js";
import {KeyboardArrowDown, KeyboardArrowUp, LooksOne, LooksTwo, MonetizationOn} from '@material-ui/icons';

// style
import {makeStyles} from "@material-ui/core/styles";
import javascriptStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
import styles from "styles/jss/nextjs-material-kit/components/account/settings/supportStyle";

const useStyles = makeStyles({...styles, ...javascriptStyles});

export default function Offer() {
	const classes = useStyles();
	const [activated, setActivated] = useState([]);
	const clickHandle = (value) => {
		const currentIndex = activated.indexOf(value);
		const newActivated = [...activated];

		if (currentIndex === -1) {
			newActivated.push(value);
		} else {
			newActivated.splice(currentIndex, 1);
		}
		setActivated(newActivated);
	}
	return (
		<div className={ classes.support }>
			<h2>
				Account Support
			</h2>
			<div>
				If you need help related to your account, we can help you.
			</div>
			<div style={{ marginTop: '50px' }}>
				<div className={ classes.helpItem }>
					<Button
						aria-label="Notifications"
						aria-haspopup="true"
						onClick={()=>clickHandle(1)}
					>
						<span className="buttonText">General Help</span>
						{
							(activated.indexOf(1) === -1) ?
								<KeyboardArrowDown /> :
								<KeyboardArrowUp />
						}

					</Button>
					{
						(activated.indexOf(1) === -1) ? '' :
						<div className={'itemDesc'}>
							Visit our help center to learn how to get started with buying, selling, and creating.
						</div>
					}
				</div>
				<div className={ classes.helpItem }>
					<Button
						aria-label="Notifications"
						aria-haspopup="true"
						onClick={()=>clickHandle(2)}
					>
						<span className="buttonText">Contact OpenSea Support</span>
						{
							(activated.indexOf(2) === -1) ?
								<KeyboardArrowDown /> :
								<KeyboardArrowUp />
						}
					</Button>
					{
						(activated.indexOf(2) === -1) ? '' :
							<div className={'itemDesc'}>
								Can't find the answers you’re looking for?
								You can submit a request here.
							</div>
					}
				</div>
				<div className={ classes.helpItem }>
					<Button
						aria-label="Notifications"
						aria-haspopup="true"
						onClick={()=>clickHandle(3)}
					>
						<span className="buttonText">Help with a compromised account</span>
						{
							(activated.indexOf(3) === -1) ?
								<KeyboardArrowDown /> :
								<KeyboardArrowUp />
						}
					</Button>
					{
						(activated.indexOf(3) === -1) ? '' :
							<div className={'itemDesc'}>
								If you believe your account has been compromised, let us know and we can lock your account.
								This will disable items in your wallet from being bought, sold, or transferred using OpenSea.
								Learn more.
							</div>
					}
				</div>
				<div className={ classes.helpItem } style={{ borderBottomWidth: '1px' }}>
					<Button
						aria-label="Notifications"
						aria-haspopup="true"
						onClick={()=>clickHandle(4)}
					>
						<span className="buttonText">Cancel all Ethereum listings and offers</span>
						{
							(activated.indexOf(4) === -1) ?
								<KeyboardArrowDown /> :
								<KeyboardArrowUp />
						}
					</Button>
					{
						(activated.indexOf(4) === -1) ? '' :
							<>
								<div className={'itemDesc'}>
									You currently do not have any listings or offers to cancel.
								</div>
								<div className={ classes.textBox }>
									<MonetizationOn />
									<div>
										This wallet address does not have any creator earnings from sales using OpenSea in 2021.
									</div>
								</div>
							</>
					}
				</div>
			</div>
		</div>
	);
}

Offer.propTypes = {};
