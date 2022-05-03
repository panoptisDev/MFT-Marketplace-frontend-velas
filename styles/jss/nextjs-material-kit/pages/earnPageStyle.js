const style = {
	earnContainer: {
		maxWidth: "1280px",
		paddingLeft: "24px",
		paddingRight: "24px",
		paddingBottom: "50px",

		'& .header-label': {
			fontWeight: "bold",
			color: "white",
			fontSize: "40px",
		},

		'& .desc-label': {
			fontWeight: 400,
			fontSize: "16px",
			color: "rgb(138, 147, 155)"
		}
	},
	earnCardBox: {
		paddingBottom: "70px",

		"@media (max-width: 576px)": {
			paddingTop: "24px",
			paddingLeft: "24px",
			paddingRight: "24px",
		},

		'& .card-box': {
			borderRadius: "10px",
			border: "1px solid rgb(21, 27, 34)",
			color: "rgb(255, 255, 255)",
			backgroundColor: "#303339",
			overflow: "hidden",

			'& .card-sub-header': {
				display: "flex",
				borderBottom: "1px solid rgb(21, 27, 34)",
				backgroundColor: "#262b2f",
				justifyContent: "space-between",
				overflowX: "auto",

				'& .sub-item': {
					paddingTop: "10px",
					paddingBottom: "10px",
					minWidth: "160px"
				},
			},

			'& .card-header': {
				width: "100%",
				webkitBoxAlign: "center",
				alignItems: "center",
				justifyContent: "space-between",
				borderRadius: "10px 10px 0 0",
				borderBottom: "1px solid #151b22",
				cursor: "pointer",
				display: "flex",
				fontSize: "16px",
				fontWeight: 600,
				padding: "20px",
				userSelect: "none",
				backgroundColor: "rgb(38, 43, 47)",

				'& .card-title-box': {
					display: "inline-flex",
				},

				'& .card-detail-box': {
					color: "#2081e2",
					display: "inline-flex",

					"@media (max-width: 576px)": {
						display: "none"
					},
				}
			},

			'& .card-body': {
				display: "flex",
				flexDirection: "column",

				'& .empty-box': {
					padding: "24px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}
			}
		}
	}
};

export default style;
