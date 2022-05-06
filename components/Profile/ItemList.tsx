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
		<div className={classes.container} style={{marginTop: "20px !important"}}>
			<ProfileTabBody tab={props.tab} />
		</div>
	);
}

export default ProfileTagList;
