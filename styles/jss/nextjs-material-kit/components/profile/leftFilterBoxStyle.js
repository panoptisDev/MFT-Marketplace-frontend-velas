const style = {
	container: {
		width: "100%",
		height: "100%",
		minHeight: "300px",
		display: "flex",
		flexDirection: "column",

		'& .filter-header': {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			borderBottom: "1px solid rgb(21, 27, 34)",
			color: "white"
		},

		'& .blue-label': {
			color: "#2081e2",
		},

		'& .m-l-10': {
			marginLeft: "10px !important"
		},

		'& .m-r-10': {
			marginRight: "10px !important"
		},

		'& .flex-1': {
			flex: 1
		},

		'& .color-white': {
			color: "white",
		},

		'& .header-label': {
			lineHeight: "60px",
			fontSize: "20px",
			fontWeight: 700,
			margin: 0
		},

		'& .toggle-box': {
			cursor: "pointer",
			color: "#8a939b",
			width: "60px",
			height: "60px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",

			'&:hover': {
				boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px",
				color: "white"
			}
		},

		'& .filter-row': {
			display: "flex",
			flexDirection: "row",
			borderBottom: "1px solid rgb(21, 27, 34)",
			cursor: "pointer",

			'& .filter-header-label': {
				color: "white",
				flex: 1,
				margin: 0,
				lineHeight: "60px",
				fontSize: "20px",
				fontWeight: 700,
				paddingLeft: "20px"
			},

			'& .toggle-more': {
				width: "60px",
				height: "60px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "#8a939b",
			},

			'&:hover .toggle-more': {
				color: "white"
			}
		},

		'& .filter-bar': {
			display: "flex",
			flexFlow: "wrap",
			padding: "20px",
			color: "white",
			borderBottom: "1px solid rgb(21, 27, 34)",

			'& .filter-btn': {
				webkitBoxAlign: "center",
				alignItems: "center",
				border: "1px solid rgb(21, 27, 34)",
				borderRadius: "10px",
				color: "rgb(229, 232, 235)",
				backgroundColor: "rgb(53, 56, 64)",
				display: "flex",
				height: "40px",
				margin: "4px",
				padding: "10px",
				width: "calc(50% - 8px)",
				cursor: "pointer",

				'& .select-gray': {
					'&>div:first-of-type': {
						background: '#353840',
						'& div' :{
							color: '#ffffff !important'
						}
					}
				},

				'&.selected': {
					backgroundColor: "rgb(32, 129, 226)",
					borderColor: "rgb(32, 129, 226)",
				}
			}
		},

		'& .icon-30': {
			height: "30px",
			width: "30px",
			margin: "5px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "50%",
			overflow: "hidden",

			'& img': {
				width: "30px",
				height: "30px",
			}
		},

		'& .w-100-pro': {
			width: "100% !important",
		},

		'& .filter-btn-full': {
			width: "100%",
			textTransform: "uppercase",

			'&>label>span:last-of-type': {
				color: "white"
			}
		},

		'& .p-0': {
			padding: "0px",
		},

		'& .h-48': {
			height: "48px !important",
		},

		'& .m-0': {
			margin: "0px !important"
		},

		'& .m-t-12': {
			marginTop: "12px !important"
		},
	},
};

export default style;
