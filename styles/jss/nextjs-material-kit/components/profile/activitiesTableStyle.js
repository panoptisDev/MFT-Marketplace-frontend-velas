const style = {
	container: {
		width: "100%",
		paddingBottom: "50px",

		'& .mobile-hidden': {
			"@media (max-width: 576px)": {
				display: "none"
			},
		},

		'& .mobile-show': {
			display: "none",
			lineHeight: "4px",

			"@media (max-width: 576px)": {
				display: "table-cell",
			},
		},

		'& .activity-table': {
			width: "100%",
			textAlign: "center",
			color: "white",
			borderSpacing: "0 !important",

			'& thead tr th': {
				height: "50px"
			}
		},

		'& .item-box': {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			width: "100%",
			justifyContent: "center",

			'& .img-box': {
				borderRadius: "4px",
				border: "1px solid rgb(21, 27, 34)",
				display: "flex",
				webkitBoxPack: "center",
				justifyContent: "center",
				flex: "0 0 auto",
				height: "48px",
				width: "48px",

				'& img': {
					objectFit: "contain",
					width: "auto",
					height: "auto",
					maxWidth: "100%",
					maxHeight: "100%",
					borderRadius: "inherit"
				}
			},

			'& .detail-box': {
				marginLeft: "5px",
				display: "flex",
				flexDirection: "column",

				'& .collection-label': {
					fontSize: "13px"
				},
			},
		},

		'& .activity-row': {
			cursor: "pointer",

			'& td': {
				padding: "10px 0",
			},

			'&:hover': {
				backgroundColor: "rgba(0, 0, 0, 0.4)"
			}
		},
	},
};

export default style;
