import React, {useState} from "react";
import { useRouter } from 'next/router'
import GridContainer from "../../components/Grid/GridContainer";
import GridItem  from "../../components/Grid/GridItem";
import SideBar from "../../components/Account/Settings/SideBar";
import Profile from "../../components/Account/Settings/Profile";
import Offer from "../../components/Account/Settings/Offer";
import Notification from "../../components/Account/Settings/Notification";
import Payment from "../../components/Account/Settings/Payment";
import Support from "../../components/Account/Settings/Support";
import Earning from "../../components/Account/Settings/Earning";
import SettingHeaderTabs from "components/Account/Settings/SettingHeaderTabs";

import {makeStyles} from "@material-ui/core/styles";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/collections";
const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Index() {
	const classes = useStyles();
	const router = useRouter()
	const { tab } = router.query
	const [isShowFilter, setIsShowFilter] = useState(false);

	const showFilter = () => {
		setIsShowFilter(!isShowFilter);
	}
	let SettingsBody ;
	switch (tab){
		case 'profile':
			SettingsBody = () =>
				<Profile />
			break;
		case 'notifications':
			SettingsBody = () =>
				<Notification />
			break;
		case 'offers':
			SettingsBody = () =>
				<Offer />
			break;
		case 'payment':
			SettingsBody = () =>
				<Payment />
			break;
		case 'support':
			SettingsBody = () =>
				<Support />
			break;
		case 'earnings':
			SettingsBody = () =>
				<Earning />
			break;
		default:
			SettingsBody = () =>
				<Profile />
	}
	return (
		<div className={classes.container}>
			<SettingHeaderTabs />
			<GridContainer>
				<GridItem xs={12} sm={12} md={4} lg={3} className={'text-center ' + classes.gridFilterContainer + (isShowFilter ? ' ' + classes.showFilter : '')}>
					<SideBar />
				</GridItem>
				<GridItem xs={12} sm={12} md={8} lg={9}>
					<SettingsBody />
				</GridItem>
			</GridContainer>
		</div>
	);
}
