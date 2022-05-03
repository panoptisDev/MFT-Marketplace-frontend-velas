import { useRouter } from 'next/router'
import {useWeb3} from "@3rdweb/hooks";
import React, {useState} from "react";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import Button from "../components/CustomButtons/Button";
import {AttachMoney, Timelapse, LocationOn, ErrorOutline} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import Datetime from "react-datetime";
import Carousel from "react-slick";
import FormControl from "@material-ui/core/FormControl";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import tooltipsStyle from "styles/jss/nextjs-material-kit/tooltipsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/sellItem.js";

import Tooltip from "@material-ui/core/Tooltip";
import formatMoneyOptionLabel from "../components/Sell/formatMoneyOptionLabel";
import formatMethodOptionLabel from "../components/Sell/formatMethodOptionLabel";
import Select from "react-select";
import Switch from "@material-ui/core/Switch";
const useStyles = makeStyles({...basicsStyles, ...styles, ...tooltipsStyle, ...pageStyles});

export default function Sell(props) {
	const classes = useStyles();
	const router = useRouter();
	const { assets } = router.query;
	let items = [];
	if (assets && !Array.isArray(assets)) {
		items.push(assets);
	} else {
		items = assets;
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
	};

	const [isBundle, setIsBundle] = React.useState(true);
	const [isFixed, setIsFixed] = React.useState(true);
	const [isReserved, setIsReserved] = React.useState(false);

	const options = [
		{ value: "eth", label: "ETH", customAbbreviation: "Eth" },
	];
	const methodOptions = [
		{ value: "declining", label: "Sell with declining price", customAbbreviation: "declining" },
	];

	return (
		<>
			<div className={classes.container}>
				<GridContainer className={classes.sellStyle}>
					<GridItem xs={0} sm={0} md={6} lg={6} className="preview-box">
						<h3 className="header" style={{padding: 0}}>Preview</h3>
						<div style={{width: "100%", display: "flex", justifyContent: "center"}}>
							<Carousel {...settings} className="carousel-box">
								<div style={{margin: "0px 10px"}}>
									<img
										src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
										alt="First slide"
										className="slick-image detail-img"
									/>
								</div>
								<div style={{margin: "0px 10px"}}>
									<img
										src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
										alt="Second slide"
										className="slick-image detail-img"
									/>
								</div>
								<div style={{margin: "0px 10px"}}>
									<img
										src="https://m.raregems.io/c/21725?optimizer=image&amp;width=400"
										alt="Third slide"
										className="slick-image detail-img"
									/>
								</div>
							</Carousel>
						</div>
					</GridItem>
					<GridItem xs={12} sm={12} md={6} lg={6}>
						<h3 className="header">List item for sale</h3>
						{
							!isBundle &&
							<>
								<p className="text-label display-flex flex-between">
									<span>Type</span>
									<Tooltip
										id="tooltip-top"
										title="Learn more about the two types of listing options in our Help Center"
										placement="top"
										classes={{ tooltip: classes.tooltip }}
									>
										<ErrorOutline className="tooltip-icon" />
									</Tooltip>
								</p>
								<div className="sell-type-box">
									<div className={"fixed-box" + (isFixed ? " selected" : "")} onClick={() => setIsFixed(true)}>
										<AttachMoney />Fixed Price
									</div>
									<div className={"timed-box" + (!isFixed ? " selected" : "")} onClick={() => setIsFixed(false)}>
										<Timelapse />Timed Auction
									</div>
								</div>
							</>
						}
						{
							isFixed
								? <>
									<p className="text-label display-flex flex-between">
										<span>Price</span>
										<Tooltip
											id="tooltip-top"
											title="List price and listing schedule cannot be edited once the item is listed. You
										will need to cancel your listing and relist the item with the updated price and dates."
											placement="top"
											classes={{ tooltip: classes.tooltip }}
										>
											<ErrorOutline className="tooltip-icon" />
										</Tooltip>
									</p>
									<div className="price-box">
										<Select
											defaultValue={options[0]}
											formatOptionLabel={formatMoneyOptionLabel}
											options={options}
											instanceId='chainSelect'
											className="select-gray flex-1"
										/>
										<input className="bordered-input flex-2" style={{marginLeft: "10px"}} placeholder="Amount"/>
									</div>
								</>
								: <>
									<p className="text-label display-flex flex-between">
										<span>Method</span>
										<Tooltip
											id="tooltip-top"
											title="Sell to the highest bidder or sell with a declining price, which allows
										the listing to reduce in price until a buyer is found"
											placement="top"
											classes={{ tooltip: classes.tooltip }}
										>
											<ErrorOutline className="tooltip-icon" />
										</Tooltip>
									</p>
									<Select
										defaultValue={methodOptions[0]}
										formatOptionLabel={formatMethodOptionLabel}
										options={methodOptions}
										instanceId='chainSelect'
										className="select-gray flex-1"
									/>
									<p className="text-label display-flex flex-between">
										<span>Starting price</span>
									</p>
									<div className="price-box">
										<Select
											defaultValue={options[0]}
											formatOptionLabel={formatMoneyOptionLabel}
											options={options}
											instanceId='chainSelect'
											className="select-gray flex-1"
										/>
										<input className="bordered-input flex-2" style={{marginLeft: "10px"}} placeholder="Amount"/>
									</div>
								</>
						}
						<p className="text-label">Duration</p>
						<div className="date-ranger-box">
							<Datetime
								className="start-date-picker"
								inputProps={{ placeholder: "From" }}
								closeOnSelect={true}
							/>
							<Datetime
								className="end-date-picker"
								inputProps={{ placeholder: "To" }}
								closeOnSelect={true}
							/>
						</div>
						<div className="display-flex flex-between item-center m-t-20">
							<p className="text-label m-0">Sell as a bundle</p>
							<Switch
								checked={isBundle}
								onChange={(event) => setIsBundle(event.target.checked)}
								classes={{
									switchBase: classes.switchBase,
									checked: classes.switchChecked,
									thumb: classes.switchIcon,
									track: classes.switchBar,
								}}
							/>
						</div>
						{
							isBundle &&
							<>
								<input className="bordered-input" style={{margin: "10px 0"}} placeholder="Bundle Name"/>
								<textarea className="bordered-input height-3x" rows="3"
										  placeholder="Bundle description" />
							</>
						}
						<div className="display-flex flex-between item-center m-t-20">
							<p className="text-label m-0">Reserve for specific buyer</p>
							<Switch
								checked={isReserved}
								onChange={(event) => setIsReserved(event.target.checked)}
								classes={{
									switchBase: classes.switchBase,
									checked: classes.switchChecked,
									thumb: classes.switchIcon,
									track: classes.switchBar,
								}}
							/>
						</div>
						<p style={{color: "white"}}>This bundle can be purchased as soon as it's listed.</p>
						{
							isReserved &&
							<input className="bordered-input" placeholder="0x8eA3F..."/>
						}
						<p className="text-label display-flex flex-between">
							<span>Fees</span>
							<Tooltip
								id="tooltip-top"
								title="Listing is free. Once sold, the following fees will be deducted."
								placement="top"
								classes={{ tooltip: classes.tooltip }}
							>
								<ErrorOutline className="tooltip-icon" />
							</Tooltip>
						</p>
						<p className="text-label display-flex flex-between">
							<span style={{fontSize: "15px", fontWeight: 300}}>Service Fee</span>
							<span>2.5%</span>
						</p>
						<div className="send-box">
							<Button className="send-btn">Complete Listing</Button>
						</div>
					</GridItem>
				</GridContainer>
			</div>
		</>
	);
}
