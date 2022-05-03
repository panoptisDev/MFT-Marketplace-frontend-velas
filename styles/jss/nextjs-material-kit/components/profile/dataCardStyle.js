const style = {
	container: {
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

			'& .card-header': {
				width: "100%",
				webkitBoxAlign: "center",
				alignItems: "center",
				justifyContent: "space-between",
				borderRadius: "10px 10px 0 0",
				border: "1px solid #151b22",
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
	},
};

export default style;
