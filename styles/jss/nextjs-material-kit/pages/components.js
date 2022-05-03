import {container} from "styles/jss/nextjs-material-kit.js";

const componentsStyle = {
	container: {
		...container,
		paddingTop: '90px',
		"@media (min-width: 576px)": {
			maxWidth: "540px",
			paddingTop: '120px'
		},
		"@media (min-width: 768px)": {
			maxWidth: "720px",
			paddingTop: '120px'
		},
		"@media (min-width: 992px)": {
			maxWidth: "960px",
			paddingTop: '120px'
		},
		"@media (min-width: 1200px)": {
			maxWidth: "1140px",
			paddingTop: '120px'
		},
		"@media (min-width: 1500px)": {
			maxWidth: "1480px",
			paddingTop: '120px'
		},
		"@media (min-width: 1920px)": {
			maxWidth: "1800px",
			paddingTop: '120px'
		},
		'& .items li a:hover .media img':  {
			transform: 'scale(1.1)'
		},
	},
	filterOptionContainer: {
		background: 'rgba(54, 27, 151, 0.9)',
		height: 'calc(100vh - 100px)',
		borderRadius: '10px',
		color: 'white',
		paddingLeft: '30px',
		textAlign: 'left'
	},
	brand: {
		color: "#FFFFFF",
		textAlign: "left",
	},
	title: {
		fontSize: "4.2rem",
		fontWeight: "600",
		display: "inline-block",
		position: "relative",
	},
	filterTitle: {
		fontSize: "4.2rem",
		fontWeight: "600",
		display: "inline-block",
		position: "relative",
		marginBottom: '15px'
	},
	subtitle: {
		fontSize: "1.313rem",
		maxWidth: "510px",
		margin: "10px 0 0",
	},
	main: {
		background: "#FFFFFF",
		position: "relative",
		zIndex: "3",
	},
	mainRaised: {
		margin: "-60px 30px 0px",
		borderRadius: "6px",
		boxShadow:
			"0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
		"@media (max-width: 830px)": {
			marginLeft: "10px",
			marginRight: "10px",
		},
	},
	link: {
		textDecoration: "none",
	},
	textCenter: {
		textAlign: "center",
	},
	mobileFilterButton: {
		position: 'fixed',
		zIndex: 2,
		bottom: '20px',
		textAlign: 'center',
		width: '100%',
		"@media (min-width: 992px)": {
			display: 'none'
		},
	},
	gridFilterContainer: {
		position: 'fixed',
		zIndex: 1,
		display: 'none',
		"@media (min-width: 992px)": {
			position: 'relative',
			display: 'block'
		}
	},
	showFilter: {
		display: 'block'
	}
};

export default componentsStyle;
