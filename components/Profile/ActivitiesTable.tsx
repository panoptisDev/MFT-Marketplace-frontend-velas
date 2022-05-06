import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LocalOffer, ShoppingCart, KeyboardArrowDown, KeyboardArrowUp, Check} from '@material-ui/icons';
import styles from "styles/jss/nextjs-material-kit/components/profile/activitiesTableStyle";
const useStyles = makeStyles({...styles});
import Select from "react-select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import formatMoneyOptionLabel from "components/Profile/formatMoneyOptionLabel";

const LeftFilterBox = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.container + " " + "table-responsive"}>
			<table className="activity-table">
				<thead className="mobile-hidden">
				<tr>
					<th />
					<th width="30%">Item</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>From</th>
					<th>To</th>
					<th>Time</th>
				</tr>
				</thead>
				<tbody>
				<tr className="activity-row">
					<td className="mobile-hidden">
						<div style={{display: "inline-flex"}}>
							<ShoppingCart />
							<span style={{marginLeft: "10px"}}>Minted</span>
						</div>
					</td>
					<td>
						<div className="item-box">
							<div className="img-box">
								<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" />
							</div>
							<div className="detail-box">
								<span className="collection-label">Untitled Collection #231123123</span>
								<span className="name-label">Beach</span>
							</div>
						</div>
					</td>
					<td className="mobile-hidden">- - -</td>
					<td className="mobile-hidden">1</td>
					<td className="mobile-hidden">NullAddress</td>
					<td className="mobile-hidden">You</td>
					<td className="mobile-hidden">2 days ago</td>
					<td className="mobile-show" width="30%">
						<p>Minted</p>
						<p>- - -</p>
						<p>3 days ago</p>
					</td>
				</tr>
				<tr className="activity-row">
					<td className="mobile-hidden">
						<div style={{display: "inline-flex"}}>
							<ShoppingCart />
							<span style={{marginLeft: "10px"}}>Minted</span>
						</div>
					</td>
					<td>
						<div className="item-box">
							<div className="img-box">
								<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" />
							</div>
							<div className="detail-box">
								<span className="collection-label">Untitled Collection #231123123</span>
								<span className="name-label">Beach</span>
							</div>
						</div>
					</td>
					<td className="mobile-hidden">- - -</td>
					<td className="mobile-hidden">1</td>
					<td className="mobile-hidden">NullAddress</td>
					<td className="mobile-hidden">You</td>
					<td className="mobile-hidden">2 days ago</td>
					<td className="mobile-show" width="30%">
						<p>Minted</p>
						<p>- - -</p>
						<p>3 days ago</p>
					</td>
				</tr>
				<tr className="activity-row">
					<td className="mobile-hidden">
						<div style={{display: "inline-flex"}}>
							<ShoppingCart />
							<span style={{marginLeft: "10px"}}>Minted</span>
						</div>
					</td>
					<td>
						<div className="item-box">
							<div className="img-box">
								<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" />
							</div>
							<div className="detail-box">
								<span className="collection-label">Untitled Collection #231123123</span>
								<span className="name-label">Beach</span>
							</div>
						</div>
					</td>
					<td className="mobile-hidden">- - -</td>
					<td className="mobile-hidden">1</td>
					<td className="mobile-hidden">NullAddress</td>
					<td className="mobile-hidden">You</td>
					<td className="mobile-hidden">2 days ago</td>
					<td className="mobile-show" width="30%">
						<p>Minted</p>
						<p>- - -</p>
						<p>3 days ago</p>
					</td>
				</tr>
				<tr className="activity-row">
					<td className="mobile-hidden">
						<div style={{display: "inline-flex"}}>
							<ShoppingCart />
							<span style={{marginLeft: "10px"}}>Minted</span>
						</div>
					</td>
					<td>
						<div className="item-box">
							<div className="img-box">
								<img src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400" />
							</div>
							<div className="detail-box">
								<span className="collection-label">Untitled Collection #231123123</span>
								<span className="name-label">Beach</span>
							</div>
						</div>
					</td>
					<td className="mobile-hidden">- - -</td>
					<td className="mobile-hidden">1</td>
					<td className="mobile-hidden">NullAddress</td>
					<td className="mobile-hidden">You</td>
					<td className="mobile-hidden">2 days ago</td>
					<td className="mobile-show" width="30%">
						<p>Minted</p>
						<p>- - -</p>
						<p>3 days ago</p>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
	);
}

export default LeftFilterBox;
