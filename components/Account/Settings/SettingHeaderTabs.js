import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import Popper from "@material-ui/core/Popper";

// core components
import Button from "components/CustomButtons/Button.js";

import styles from "styles/jss/nextjs-material-kit/components/account/settings/headerStyle.js";
import {
	Apps, ArrowDownward, ArrowUpward,
	Collections, ErrorOutline,
	FavoriteBorder, FormatListBulleted,
	MonetizationOn, History,
	Help,
	Payment, LocalOffer, Notifications,
	AccountBox
} from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
import {useRouter} from "next/router";

const useStyles = makeStyles(styles);

export default function SettingHeaderTabs(props) {
	const classes = useStyles();
	const router = useRouter();
	const tab = router.query.tab ? router.query.tab : "profile";

	const goToPage = (url) => {
		router.push({
			pathname: '/account/settings',
			query: { tab: url },
		})
	};

	return (
		<div className={classes.container}>
			<div className="tab-header">
				<div className={"tab-item" + (tab === "profile" ? " selected" : "")} onClick={() => goToPage("profile")}>
					<AccountBox className="tab-icon" />
					<span className="tab-title">Profile</span>
				</div>
				<div className={"tab-item" + (tab === "notifications" ? " selected" : "")} onClick={() => goToPage("notifications")}>
					<Notifications className="tab-icon" />
					<span className="tab-title">Notifications</span>
				</div>
				<div className={"tab-item" + (tab === "offers" ? " selected" : "")} onClick={() => goToPage("offers")}>
					<LocalOffer className="tab-icon" />
					<span className="tab-title">Offers</span>
				</div>
				<div className={"tab-item" + (tab === "payment" ? " selected" : "")} onClick={() => goToPage("payment")}>
					<Payment className="tab-icon" />
					<span className="tab-title">Payments</span>
				</div>
				<div className={"tab-item" + (tab === "support" ? " selected" : "")} onClick={() => goToPage("support")}>
					<Help className="tab-icon" />
					<span className="tab-title">Support</span>
				</div>
				<div className={"tab-item" + (tab === "earnings" ? " selected" : "")} onClick={() => goToPage("earnings")}>
					<MonetizationOn className="tab-icon" />
					<span className="tab-title">Earnings</span>
				</div>
			</div>
		</div>
	);
}
