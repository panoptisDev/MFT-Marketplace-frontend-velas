import { useEffect, useState } from "react";

import {AccountBox, Help, LocalOffer, MonetizationOn, Notifications, Payment} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import './sideBar.scss'

export default function SideBar() {
	// const classes = useStyles();
	// const router = useHistory()
	const [tab, setTab] = useState('');
	const search = useLocation();
    useEffect(() => {
        const label = search.search.split('=')[1]
        setTab(label)

    }, [setTab, search]);
	
	return (
		<div className="filterOptionContainer">
			<div className="filterTitle">
				<h5 style={{ marginTop: '20px' }}>Settings</h5>
			</div>
			<ul className="tabList">
				<li>
					<Link to={'/account/settings?tab=profile'} className={`tabLink ${tab === 'profile' ? "activeLink" : ''}` }>
							<AccountBox />
							<span>Profile</span>
					</Link>
					<Link to={'/account/settings?tab=notifications'} className={`tabLink ${tab === 'notifications' ? "activeLink" : ''}` }>
							<Notifications />
							<span>Notifications</span>
					</Link>
					<Link to={'/account/settings?tab=offers'} className={`tabLink ${tab === 'offers' ? "activeLink" : ''}`}>
							<LocalOffer />
							<span>Offers</span>
					</Link>
					<Link to={'/account/settings?tab=payment'} className={`tabLink ${tab === 'payment' ? "activeLink" : ''}`}>
							<Payment />
							<span>Payment</span>
					</Link>
					<Link to={'/account/settings?tab=support'} className={`tabLink ${tab === 'support' ? "activeLink" : ''}`}>
							<Help />
							<span>Account Support</span>
					</Link>
					<Link to={'/account/settings?tab=earnings'} className={`tabLink ${tab === 'earnings' ? "activeLink" : ''}`}>
							<MonetizationOn />
							<span>Earnings</span>
					</Link>
				</li>
			</ul>
		</div>
	);
}

SideBar.propTypes = {};
