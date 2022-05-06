import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
	PhotoFilter, FormatPaint, FavoriteBorder, VisibilityOff, History, Storefront, FormatListBulleted,
	KeyboardArrowDown, Copyright, Facebook, Twitter, Collections, Apps, ArrowDownward, ArrowUpward, PlaylistAddCheck, ErrorOutline
} from '@material-ui/icons';
import styles from "styles/jss/nextjs-material-kit/components/profile/tagListStyle";
import ProfileTabBody from "components/Profile/ProfileTabBody";
const useStyles = makeStyles(styles);
import Button from "components/CustomButtons/Button";
import Popover from "@material-ui/core/Popover";
import {useRouter} from "next/router";

const ProfileTagList = (props) => {
	const classes = useStyles();
	const router = useRouter();
	const [anchorElCreated, setAnchorElCreated] = React.useState(null);
	const [anchorElOffers, setAnchorElOffers] = React.useState(null);
	const [anchorElListings, setAnchorElListings] = React.useState(null);

	const showMoreCreated = (e) => {
		e.preventDefault();
		setAnchorElCreated(e.currentTarget);
	}

	const showMoreOffers = (e) => {
		e.preventDefault();
		setAnchorElOffers(e.currentTarget);
	}

	const showMoreListings = (e) => {
		e.preventDefault();
		setAnchorElListings(e.currentTarget);
	}

	const goToPage = (url) => {
		router.push({
			pathname: '/account',
			query: { tab: url },
		})
	};

	return (
		<div className={classes.container}>
			<div className="tab-header">
				<div className={"tab-item" + (props.tab === "collection" ? " selected" : "")} onClick={() => goToPage("collection")}>
					<PhotoFilter className="tab-icon" />
					<span className="tab-title">Collected</span>
					<span>2</span>
				</div>
				<div className={"tab-item" + (props.tab.includes("created") ? " selected" : "")}
					 onClick={showMoreCreated}>
					<FormatPaint className="tab-icon" />
					<span className="tab-title">Created</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: classes.popover,
					}}
					open={Boolean(anchorElCreated)}
					anchorEl={anchorElCreated}
					onClose={() => setAnchorElCreated(null)}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					style={{marginTop: "8px"}}
				>
					<div className={classes.actionList}>
						<div className="action-item" onClick={() => {
							setAnchorElCreated(null);
							goToPage("created")
						}}>
							<div className="action-icon">
								<Collections />
							</div>
							<div className="action-label">Items</div>
						</div>
						<div className="action-item" onClick={() => {
							setAnchorElCreated(null);
							goToPage("created_collections")
						}}>
							<div className="action-icon">
								<Apps />
							</div>
							<div className="action-label">
								Collections
							</div>
						</div>
					</div>
				</Popover>
				<div className={"tab-item" + (props.tab === "favorites" ? " selected" : "")} onClick={() => goToPage("favorites")}>
					<FavoriteBorder className="tab-icon" />
					<span className="tab-title">Favorited</span>
					<span>2</span></div>
				<div className={"tab-item" + (props.tab === "hidden" ? " selected" : "")} onClick={() => goToPage("hidden")}>
					<VisibilityOff className="tab-icon" />
					<span className="tab-title">Hidden</span>
					<span>2</span>
				</div>
				<div className={"tab-item" + (props.tab === "activity" ? " selected" : "")} onClick={() => goToPage("activity")}>
					<History className="tab-icon" />
					<span className="tab-title">Activity</span>
				</div>
				<div className={"tab-item" + (props.tab.includes("bids") ? " selected" : "")}
					 onClick={showMoreOffers}>
					<FormatListBulleted className="tab-icon" />
					<span className="tab-title">Offers</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: classes.popover,
					}}
					open={Boolean(anchorElOffers)}
					anchorEl={anchorElOffers}
					onClose={() => setAnchorElOffers(null)}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					style={{marginTop: "8px"}}
				>
					<div className={classes.actionList}>
						<div className="action-item" onClick={() => {
							setAnchorElOffers(null);
							goToPage("bids");
						}}>
							<div className="action-icon">
								<ArrowDownward style={{transform: "rotate(45deg)"}} />
							</div>
							<div className="action-label">Offers received</div>
						</div>
						<div className="action-item" onClick={() => {
							setAnchorElOffers(null);
							goToPage("bids_made");
						}}>
							<div className="action-icon">
								<ArrowUpward style={{transform: "rotate(45deg)"}} />
							</div>
							<div className="action-label">
								Offers made
							</div>
						</div>
					</div>
				</Popover>
				<div className={"tab-item" + (props.tab.includes("listings") ? " selected" : "")}
					 onClick={showMoreListings}>
					<Storefront className="tab-icon" />
					<span className="tab-title">Listings</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: classes.popover,
					}}
					open={Boolean(anchorElListings)}
					anchorEl={anchorElListings}
					onClose={() => setAnchorElListings(null)}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					style={{marginTop: "8px"}}
				>
					<div className={classes.actionList}>
						<div className="action-item" onClick={() => {
							setAnchorElListings(null);
							goToPage("listings");
						}}>
							<div className="action-icon">
								<PlaylistAddCheck />
							</div>
							<div className="action-label">Active</div>
						</div>
						<div className="action-item" onClick={() => {
							setAnchorElListings(null);
							goToPage("listings_inactive");
						}}>
							<div className="action-icon">
								<ErrorOutline />
							</div>
							<div className="action-label">
								Inactive
							</div>
						</div>
					</div>
				</Popover>
			</div>
			<ProfileTabBody tab={props.tab} />
		</div>
	);
}

export default ProfileTagList;
