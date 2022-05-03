const Style = {
	container: {
		display: "none",

		"@media (max-width: 578px)": {
			display: "block",
		},

		'& .tab-header': {
			width: "100%",
			overflowX: "auto",
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			height: "fit-content",
			justifyContent: "center",

			"@media (max-width: 1200px)": {
				justifyContent: "start",
			},

			'& .tab-item': {
				height: "100%",
				width: "180px",
				padding: "20px",
				color: "#8a939b",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				cursor: "pointer",

				'&:hover': {
					color: "white",
				},

				'&.selected': {
					color: "white",
					borderBottom: "4px solid rgb(32, 129, 226)",
				},

				'& .tab-icon': {
					fontSize: "24px",
				},

				'& .tab-title': {
					padding: "0 10px",
					fontSize: "20px",
					lineHeight: "24px",
				},
			},
		}
	}
};

export default Style;
