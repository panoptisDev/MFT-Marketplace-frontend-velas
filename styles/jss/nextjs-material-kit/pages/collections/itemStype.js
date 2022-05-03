const itemStyle = {
	detailContainer: {
		paddingTop: "120px",
		height: "100vh",
		width: "100vw",

		'& .detail-div': {
			width: "100%",
			height: "100%",
			margin: "0",
		},

		'& .height-full': {
			height: "unset",
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			position: "unset !important",

			"@media (min-width: 576px)": {
				height: "100%",
			},
		},

		'& .detail-contain': {
			padding: "0",
			height: "100%"
		},

		'& .detail-img': {
			objectFit: "contain",
			width: "100% !important",
			position: "relative !important",
			height: "unset !important",
			margin: "30px",
			borderRadius: "24px",
			maxWidth: "480px"
		},
	}
};

export default itemStyle;
