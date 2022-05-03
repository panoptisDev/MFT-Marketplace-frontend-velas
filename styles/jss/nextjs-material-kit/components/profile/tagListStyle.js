const style = {
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
				transition: "all 0.2s ease 0s",
				boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px",
				backgroundColor: "rgb(251, 253, 255)"
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

	container: {
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
	},
};

export default style;
