import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";

import pageStyle from "styles/jss/nextjs-material-kit/components/account/settings/sideBar";
import styles from "styles/jss/nextjs-material-kit/pages/components";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle";
import {AccountBox, Help, LocalOffer, MonetizationOn, Notifications, Payment} from "@material-ui/icons";

const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyle});

export default function SideBar() {
	const classes = useStyles();
	const router = useRouter()
	const { tab } = router.query;
	return (
		<div className={classes.filterOptionContainer}>
			<div className={classes.filterTitle}>
				<h5 style={{ marginTop: '20px' }}>Settings</h5>
			</div>
			<ul className={ classes.tabList }>
				<li>
					<Link href={'/account/settings?tab=profile'}>
						<a className={ classes.tabLink + ' ' +  (tab === 'profile' ? classes.activeLink : '') }>
							<AccountBox />
							<span>Profile</span>
						</a>
					</Link>
					<Link href={'/account/settings?tab=notifications '}>
						<a className={ classes.tabLink + ' ' +  (tab === 'notifications' ? classes.activeLink : '') }>
							<Notifications />
							<span>Notifications</span>
						</a>
					</Link>
					<Link href={'/account/settings?tab=offers'}>
						<a className={ classes.tabLink + ' ' +  (tab === 'offers' ? classes.activeLink : '') }>
							<LocalOffer />
							<span>Offers</span>
						</a>
					</Link>
					<Link href={'/account/settings?tab=payment'}>
						<a className={ classes.tabLink + ' ' +  (tab === 'payment' ? classes.activeLink : '') }>
							<Payment />
							<span>Payment</span>
						</a>
					</Link>
					<Link href={'/account/settings?tab=support'}>
						<a className={ classes.tabLink + ' ' +  (tab === 'support' ? classes.activeLink : '') }>
							<Help />
							<span>Account Support</span>
						</a>
					</Link>
					<Link href={'/account/settings?tab=earnings'}>
						<a className={ classes.tabLink + ' ' +  (tab === 'earnings' ? classes.activeLink : '') }>
							<MonetizationOn />
							<span>Earnings</span>
						</a>
					</Link>
				</li>
			</ul>
		</div>
	);
}

SideBar.propTypes = {};
