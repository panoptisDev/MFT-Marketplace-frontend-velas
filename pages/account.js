import React, {Component, useRef, useState} from "react";
import Link from "next/link";
import Popover from "@material-ui/core/Popover";
import GridItem from "components/Grid/GridItem";
import ProfileTagList from "components/Profile/ProfileTagList";
import ItemList from "components/Collection/Item/ItemList";
import CopyBox from "components/Collection/Item/CopyBox";
import {makeStyles} from "@material-ui/core/styles";
import {Edit, Share, Settings, Copyright, Facebook, Twitter, Storefront, Send, VisibilityOff} from '@material-ui/icons';

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";
import pageStyles from "styles/jss/nextjs-material-kit/pages/accountPageStyle.js";
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
				<div className="empty-box" style={{flex: 1}} />
				<div className="user-info-box" htmlFor="avatar_file">
					<label className="avatar-box">
						<input type="file" id="avatar_file" name="avatar_file" style={{ display: 'none' }}
							   accept=".jpg,.png,.gif,.svg" onChange={onChangeAvatarFile} />
						<Edit className="edit-icon" />
						<img src={avatarFile ? URL.createObjectURL(avatarFile) : "/img/faces/avatar.jpg"} className="avatar-img" />
					</label>
					<h2 className="user-name">Unnamed</h2>
					<CopyBox value={address} />
					<p className="joined-label">Joined April 2022</p>
				</div>
				<div className="setting-box">
					<div className="setting-container">
						<div className="share-btn" onClick={showMoreActions}>
							<Share />
						</div>
						<Popover
							classes={{
								paper: classes.popover,
							}}
							open={Boolean(anchorElTop)}
							anchorEl={anchorElTop}
							onClose={() => setAnchorElTop(null)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "right",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							style={{marginTop: "8px"}}
						>
							<div className={classes.actionList}>
								<div className="action-item" onClick={() => {
									setAnchorElTop(null);
									props.handleClickCommand("sell", props.info.token);
								}}>
									<div className="action-icon">
										<Copyright />
									</div>
									<div className="action-label">Copy Link</div>
								</div>
								<div className="action-item" onClick={() => {
									setAnchorElTop(null);
									props.handleClickCommand("transfer", props.info.token);
								}}>
									<div className="action-icon">
										<Facebook />
									</div>
									<div className="action-label">
										Share on Facebook
									</div>
								</div>
								<div className="action-item" onClick={() => {
									setAnchorElTop(null);
									props.handleClickCommand("hide", props.info.token);
								}}>
									<div className="action-icon">
										<Twitter />
									</div>
									<div className="action-label">Share to Twitter</div>
								</div>
							</div>
						</Popover>
						<Link href="/account/settings">
							<a>
								<div className="setting-btn">
									<Settings />
								</div>
							</a>
						</Link>
					</div>
				</div>
			</div>
			<ProfileTagList tab={tab} />
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
