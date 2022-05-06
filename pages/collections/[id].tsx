import React, {Component, useRef, useState} from "react";
import Link from "next/link";
import Popover from "@material-ui/core/Popover";
import GridItem from "components/Grid/GridItem";
import ItemList from "components/Profile/ItemList";
import CopyBox from "components/Collection/Item/CopyBox";
import {makeStyles} from "@material-ui/core/styles";
import {Edit, ViewList, Add, MoreVert, Facebook, Twitter, Storefront, Send, VisibilityOff} from '@material-ui/icons';
import Tooltip from "@material-ui/core/Tooltip";

import styles from "styles/jss/nextjs-material-kit/pages/components";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle";
import pageStyles from "styles/jss/nextjs-material-kit/pages/collectionPageStyle";
import Button from "components/CustomButtons/Button";
import {useWeb3} from "@3rdweb/hooks";
import {useRouter} from "next/router";

const useStyles = makeStyles({...basicsStyles, ...styles, ...pageStyles});

export default function Page({userInfo}) {
	const classes = useStyles();

	const router = useRouter();

	const { connectWallet, address, error } = useWeb3();
	const tab = router.query.tab ? router.query.tab : "collection";
	const [ bannerFile, setBannerFile ] = useState(null);
	const [ avatarFile, setAvatarFile ] = useState(null);
	const [anchorElTop, setAnchorElTop] = React.useState(null);

	const showMoreActions = (e) => {
		e.preventDefault();
		setAnchorElTop(e.currentTarget);
	}

	const onChangeBannerFile =(e) => {
		if (e.target.files && e.target.files.length > 0) {
			setBannerFile(e.target.files[0]);
		}
	}

	const onChangeAvatarFile =(e) => {
		if (e.target.files && e.target.files.length > 0) {
			setAvatarFile(e.target.files[0]);
		}
	}

	return (
		<div className={classes.container + " " + classes.accountContainer}>
			<label className="banner-box">
				<input type="file" id="main_file_input" name="main_file" style={{ display: 'none' }}
					   accept=".jpg,.png,.gif,.svg" onChange={onChangeBannerFile} />
				{
					bannerFile
						? <img src={ URL.createObjectURL(bannerFile) } className="banner-img" />
						: <img src="/img/bg7.jpg" className="banner-img" />
				}
				<div className="hover-back" aria-hidden={false} htmlFor="main_file_input">
					<Edit className="edit-icon" />
				</div>
			</label>
			<div className="sub-box">
				<div className="watch-box">
					<button className="watch-btn m-r-5 m-l-10"><Add />WatchList</button>
					<button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
				</div>
				<div className="user-info-box" htmlFor="avatar_file">
					<label className="avatar-box">
						<input type="file" id="avatar_file" name="avatar_file" style={{ display: 'none' }}
							   accept=".jpg,.png,.gif,.svg" onChange={onChangeAvatarFile} />
						<Edit className="edit-icon" />
						<img src={avatarFile ? URL.createObjectURL(avatarFile) : "/img/faces/avatar.jpg"} className="avatar-img" />
					</label>
					<h2 className="user-name m-0">Untitled Collection</h2>
					<h2 className="user-name m-0">#316120299</h2>
				</div>
				<div className="setting-box">
					<button className="add-btn">Add Item</button>
					<div className="setting-container">
						<div className="share-btn" onClick={showMoreActions}>
							<Edit />
						</div>
						<Link href="/collections/untitled-collection-316120299/payouts">
							<a>
								<Tooltip
									id="tooltip-top"
									title="Creator Earnings"
									placement="top"
									classes={{ tooltip: classes.tooltip }}
								>
									<div className="setting-btn">
										<ViewList />
									</div>
								</Tooltip>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="mobile-func-box">
				<div className="watch-box">
					<button className="watch-btn m-r-5"><Add />WatchList</button>
					<button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
				</div>
				<div className="setting-box">
					<button className="add-btn">Add Item</button>
					<div className="setting-container">
						<div className="share-btn" onClick={showMoreActions}>
							<Edit />
						</div>
						<Link href="/collections/untitled-collection-316120299/payouts">
							<a>
								<Tooltip
									id="tooltip-top"
									title="Creator Earnings"
									placement="top"
									classes={{ tooltip: classes.tooltip }}
								>
									<div className="setting-btn">
										<ViewList />
									</div>
								</Tooltip>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<div className="detail-container">
				<div className="detail-box m-t-20">
					<div className="detail-item item-1">
						<p className="value-label">5</p>
						<p className="m-0">items</p>
					</div>
					<div className="detail-item item-2">
						<p className="value-label">1</p>
						<p className="m-0">owner</p>
					</div>
					<div className="detail-item item-3">
						<p className="value-label"><img src="/img/parts/ether.png" className="eth-icon" />---</p>
						<p className="m-0">floor price</p>
					</div>
					<div className="detail-item item-4">
						<p className="value-label"><img src="/img/parts/ether.png" className="eth-icon" />0.00</p>
						<p className="m-0">volume traded</p>
					</div>
				</div>
				<div style={{textAlign: "center"}} className="m-t-20">Welcome to the home of Untitled Collection #316120299 on OpenSea.</div>
				<div style={{textAlign: "center"}}>Discover the best items in this collection.</div>
			</div>
			<ItemList tab={tab} />
		</div>
	);
}

export async function getStaticProps({params}) {
	// TODO get items of collection from params.companyName, params.groupName
	const userInfo = {}
	return {
		props: {
			userInfo
		}
	}
}

export async function getStaticPaths() {
	// TODO get collection names from db.
	const paths =
		[
			{
				params: {
					id: "untitled-collection-316120299",
				}
			},
		]
	return {
		paths,
		fallback: false
	}
}
