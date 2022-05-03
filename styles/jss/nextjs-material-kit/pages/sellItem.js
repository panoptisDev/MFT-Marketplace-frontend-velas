const pageStyle = {
	sellStyle: {
		paddingBottom: "50px",

		'& .preview-box': {
			'& .img-box': {
				display: "flex",
				justifyContent: "center"
			},

			'& .detail-img': {
				objectFit: "contain",
				width: "100% !important",
				position: "relative !important",
				height: "unset !important",
			},
		},

		'& .price-box': {
			display: "flex",
			flexDirection: "row"
		},

		'& .flex-1': {
			flex: 1,
		},

		'& .flex-2': {
			flex: 2,

			"@media (max-width: 576px)": {
				flex: 1,
			},
		},

		'& .carousel-box': {
			marginTop: "24px",
			maxWidth: "480px",

			"@media (max-width: 576px)": {
				maxWidth: "360px",
			},
		},

		'& .flex-3': {
			flex: 3,
		},

		'& .header': {
			color: "white",
			fontWeight: 700,
		},

		'& .display-flex': {
			display: "flex",
		},

		'& .flex-between': {
			justifyContent: "space-between",
		},

		'& .bordered-input': {
			width: "100%",
			height: "48px",
			fontSize: "20px",
			background: "#353840",
			border: "1px solid #212529",
			borderRadius: "8px",
			padding: "10px",
			color: "white",

			'&.height-3x': {
				height: '144px',
			},
		},

		'& .select-gray': {
			'&>div:first-of-type': {
				background: '#353840',
				'& div' :{
					color: '#ffffff !important'
				}
			}
		},

		'& .text-label': {
			marginTop: "20px",
			fontSize: "18px",
			color: "white",
			fontWeight: 700,
		},

		'& .date-ranger-box': {
			display: "flex",
			flexDirection: "row",

			"@media (max-width: 576px)": {
				flexDirection: "column",
			},

			'& .start-date-picker': {
				flex: 1,

				"@media (min-width: 576px)": {
					marginRight: "5px",
				},
			},

			'& .end-date-picker': {
				flex: 1,


				"@media (min-width: 576px)": {
					marginLeft: "5px",
				},
			}
		},

		'& .m-0': {
			margin: 0
		},

		'& .m-t-20': {
			marginTop: "20px",
		},

		'& .item-center': {
			alignItems: "center",
		},

		'& .send-box': {
			display: "flex",
			justifyContent: "center",
			marginTop: "20px",
			paddingBottom: "40px"
		},

		'& .send-btn': {
			display:" inlineFlex",
			flexDirection: "row",
			webkitBoxAlign: "center",
			alignItems: "center",
			borderRadius: "10px",
			webkitBoxPack: "center",
			justifyContent: "center",
			fontSize: "16px",
			fontWeight: 600,
			padding: "12px 20px",
			backgroundColor: "rgb(32, 129, 226)",
			border: "1px solid rgb(32, 129, 226)",
			color: "rgb(255, 255, 255)",
			textTransform: "lowercase"
		},

		'& .sell-type-box': {
			width: "100%",
			height: "108px",
			display: "flex",
			cursor: "pointer",

			'& .fixed-box': {
				flex: 1,
				display: "inline-flex",
				flexDirection: "column",
				webkitBoxAlign: "center",
				alignItems: "center",
				borderRadius: "10px 0 0 10px",
				webkitBoxPack: "center",
				justifyContent: "center",
				fontSize: "16px",
				fontWeight: 600,
				padding: "12px 20px",
				backgroundColor: "rgb(32, 34, 37)",
				border: "1px solid rgb(112, 122, 131)",
				color: "rgb(229, 232, 235)",

				'&.selected': {
					color: "rgb(255, 255, 255)",
					opacity: 1,
					backgroundColor: "rgb(38, 43, 47)",
					borderTopColor: "rgb(251, 253, 255)",
					borderRightColor: "rgb(251, 253, 255)",
					borderBottomColor: "rgb(251, 253, 255)",
					borderLeft: "1px solid",
				}
			},

			'& .timed-box': {
				flex: 1,
				display: "inline-flex",
				flexDirection: "column",
				webkitBoxAlign: "center",
				alignItems: "center",
				borderRadius: "0 10px 10px 0",
				webkitBoxPack: "center",
				justifyContent: "center",
				fontSize: "16px",
				fontWeight: 600,
				padding: "12px 20px",
				backgroundColor: "rgb(32, 34, 37)",
				border: "1px solid rgb(112, 122, 131)",
				color: "rgb(229, 232, 235)",

				'&.selected': {
					color: "rgb(255, 255, 255)",
					opacity: 1,
					backgroundColor: "rgb(38, 43, 47)",
					borderTopColor: "rgb(251, 253, 255)",
					borderRightColor: "rgb(251, 253, 255)",
					borderBottomColor: "rgb(251, 253, 255)",
					borderLeft: "1px solid",
				}
			}
		}
	}
};

export default pageStyle;
