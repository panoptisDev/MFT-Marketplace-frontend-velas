import React, {useEffect, useState} from "react";
import {
	PhotoFilter, FormatPaint, FavoriteBorder, VisibilityOff, History, Storefront, FormatListBulleted,
	KeyboardArrowDown, Collections, Apps, ArrowDownward, ArrowUpward, PlaylistAddCheck, ErrorOutline
} from '@material-ui/icons';
import Popover from "@material-ui/core/Popover";
import { useHistory } from "react-router-dom";
// import {useRouter} from "next/router";
import './tagListStyle.scss'
import ProfileTabBody from "../tabBody/ProfileTabBody";
const ProfileTagList = (props) => {
	const router = useHistory();
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
	const [searchedUrl, setSearchedUrl] = useState('collection')
	const goToPage = (url : string) => {
		router.push(`/account?tab=${url}`);
		setSearchedUrl(url);
	};
	useEffect(() => {
		setSearchedUrl(router.location.search.replace('?tab=', ''))
		console.log(router.location.search.replace('?tab=', ''))
    }, [router, setSearchedUrl]);

	return (
		<div className="tagList">
			<div className="tab-header">
				<div 
                className={"tab-item" + (searchedUrl === "collection" ? " selected" : "")} 
                onClick={() => goToPage("collection")}
                >
					<PhotoFilter className="tab-icon" />
					<span className="tab-title">Collected</span>
					<span>2</span>
				</div>
				<div className={"tab-item" + ((searchedUrl === "created" || searchedUrl === "created_collections") ? " selected" : "")}
					 onClick={showMoreCreated}>
					<FormatPaint className="tab-icon" />
					<span className="tab-title">Created</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: "popover",
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
					<div className="actionList">
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
				<div className={"tab-item" + (searchedUrl === "favorites" ? " selected" : "")} onClick={() => goToPage("favorites")}>
					<FavoriteBorder className="tab-icon" />
					<span className="tab-title">Favorited</span>
					<span>2</span></div>
				<div className={"tab-item" + (searchedUrl === ("hidden") ? " selected" : "")} onClick={() => goToPage("hidden")}>
					<VisibilityOff className="tab-icon" />
					<span className="tab-title">Hidden</span>
					<span>2</span>
				</div>
				<div className={"tab-item" + (searchedUrl === ("activity") ? " selected" : "")} onClick={() => goToPage("activity")}>
					<History className="tab-icon" />
					<span className="tab-title">Activity</span>
				</div>
				<div className={"tab-item" + ((searchedUrl === "bids" || searchedUrl === "bids_made") ? " selected" : "")}
					 onClick={showMoreOffers}>
					<FormatListBulleted className="tab-icon" />
					<span className="tab-title">Offers</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: "popover",
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
					<div className="actionList">
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
				<div className={"tab-item" + (searchedUrl.includes("listings") ? " selected" : "")}
					 onClick={showMoreListings}>
					<Storefront className="tab-icon" />
					<span className="tab-title">Listings</span>
					<KeyboardArrowDown />
				</div>
				<Popover
					classes={{
						paper: "popover",
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
					<div className="actionList">
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
			<div className="hline"></div>
			<ProfileTabBody tab={props.tab.split('=')[1] || 'colloection'} />
		</div>
	);
}

export default ProfileTagList;
