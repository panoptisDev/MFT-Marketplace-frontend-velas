import {defaultFont} from "styles/jss/nextjs-material-kit.js";

import tooltip from "styles/jss/nextjs-material-kit/tooltipsStyle.js";

const headerLinksStyle = (theme) => ({
	img: {
		width: "40px",
		height: "40px",
		borderRadius: "50%",

		"@media (max-width: 576px)": {
			display: "none !important"
		},
	},
	mobileLabel: {
		display: "none",
		marginLeft: "20px",
		lineHeight: "63px",

		"@media (max-width: 576px)": {
			display: "inline !important"
		},
	},
	imageDropdownButton: {
		[theme.breakpoints.down("md")]: {
			top: "0",
			margin: "5px 15px",
		},
		padding: "0 !important",
		margin: "5px 15px !important",
		top: "4px",
		borderRadius: "50%",

		'& b': {
			"@media (min-width: 576px)": {
				display: "none !important"
			}
		}
	},
	actionList: {
		display: "flex",
		flexDirection: "column",

		'& .action-item': {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			borderBottom: "1px solid rgb(229, 232, 235)",
			cursor: "pointer",
			paddingRight: "20px",

			'&:hover': {
				color: "#FFFFFF",
				boxShadow: "0 12px 20px -10px rgb(156 39 176 / 28%), 0 4px 20px 0px rgb(0 0 0 / 12%), 0 7px 8px -5px rgb(156 39 176 / 20%)",
				backgroundColor: "#9c27b0",
			},

			'& .action-icon': {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "60px",
				height: "40px",
			},

			'& .action-label': {
				flex: 1,
				minWidth: "100px",
				fontWeight: 500,
				fontSize: "20px"
			}
		}
	},
	mobileMenu: {
		display: "none !important",

		"@media (max-width: 576px)": {
			display: "block !important"
		},
	},
	imgLink: {
		color: "#333 !important",

		"@media (max-width: 576px)": {
			display: "none !important"
		},

		'&>a': {
			padding: "0px",

			'&>span': {
				width: "52px",
				height: "52px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}
		},

		'& .round-avatar': {
			width: "45px",
			height: "45px",
			borderRadius: "50%"
		}
	},
	list: {
		...defaultFont,
		fontSize: "14px",
		margin: 0,
		paddingLeft: "0",
		listStyle: "none",
		paddingTop: "0",
		paddingBottom: "0",
		color: "inherit",
	},
	listItem: {
		float: "left",
		color: "inherit",
		position: "relative",
		display: "block",
		width: "auto",
		margin: "0",
		padding: "0",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			"&:after": {
				width: "calc(100% - 30px)",
				content: '""',
				display: "block",
				height: "1px",
				marginLeft: "15px",
				backgroundColor: "#e5e5e5",
			},
		},
	},
	listItemText: {
		padding: "0 !important",
	},

	navLink: {
		color: "inherit",
		position: "relative",
		padding: "16px 20px",
		fontWeight: "600",
		fontSize: "14px",
		textTransform: "uppercase",
		borderRadius: "3px",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px 15px",
		display: "inline-flex",
		transition: 'all 0.3s',

		[theme.breakpoints.down("sm")]: {
			width: "calc(100% - 30px)",
			marginLeft: "15px",
			marginBottom: "8px",
			marginTop: "8px",
			textAlign: "left",
			"& > span:first-child": {
				justifyContent: "flex-start",
			},
		},

		'&:before': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			width: 0,
			left: 0,
			height: '2px',
			background: '#fd562a',
			transition: 'width 0.3s ease'
		},

		'&:hover:before': {
			width: '50%',
			transition: 'width 0.5s ease'
		},

		'&:after': {
			content: '""',
			position: 'absolute',
			bottom: 0,
			width: 0,
			right: 0,
			height: '2px',
			background: '#fd562a',
			transition: 'width 0.3s ease'
		},

		'&:hover:after': {
			width: '50%',
			transition: 'width 0.5s ease'
		},

		'&:hover': {
			color: '#fd562a',
			transition: 'all 0.3s'
		}
	},
	activeLink: {
		'& *':{
			color: "#fd562a"
		}
	},
	notificationNavLink: {
		[theme.breakpoints.down("md")]: {
			top: "0",
			margin: "5px 15px",
		},
		color: "#FFF",
		padding: "0.9375rem",
		fontWeight: "400",
		fontSize: "12px",
		textTransform: "uppercase",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px",
		display: "inline-flex",
		top: "4px",
	},
	registerNavLink: {
		[theme.breakpoints.down("md")]: {
			top: "0",
			margin: "5px 15px",
		},
		top: "3px",
		position: "relative",
		fontWeight: "400",
		fontSize: "12px",
		textTransform: "uppercase",
		lineHeight: "20px",
		textDecoration: "none",
		margin: "0px",
		display: "inline-flex",
	},
	navLinkActive: {
		color: "inherit",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	},
	icons: {
		width: "20px",
		height: "20px",
		marginRight: "3px",
	},
	socialIcons: {
		position: "relative",
		fontSize: "20px !important",
		marginRight: "4px",
	},
	dropdownLink: {
		"&,&:hover,&:focus": {
			color: "inherit",
			textDecoration: "none",
			display: "block",
			padding: "10px 20px",
		},
	},
	...tooltip,
	marginRight5: {
		marginRight: "5px",
	},
});

export default headerLinksStyle;
