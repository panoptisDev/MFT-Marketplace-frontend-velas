const propertyModalStyle = {
	closeModal: {
		color: "#999999",
		float: "right",
		border: 0,
		cursor: "pointer",
		opacity: ".9",
		padding: 0,
		fontSize: "inherit",
		background: "0 0",
		marginTop: 0,
		fontWeight: "700",
		lineHeight: 1,
		textShadow: "none",
		webkitAppearance: "none"
	},
	displayCenter: {
		justifyContent: "center"
	},
	propertyModal: {
		'& .properties-list': {
			'& .properties-row': {
				margin: "3px 0",
				display: "flex",
				justifyContent: "start",
				alignItems: "center",

				'& .properties-close': {
					width: "40px",
					padding: "8px",
					cursor: "pointer",
					border: "1px solid rgb(229, 232, 235)",
					borderRadius: "8px"
				},

				'& .properties-type': {
					borderRadius: "8px",
					marginLeft: "3px",
					flex: 1,

					'& .header': {
						fontWeight: "bold",
					},

					'&:focus-within': {
						boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px"
					}
				},

				'& .properties-name': {
					borderRadius: "8px",
					flex: 1,
					marginLeft: "3px",

					'&:focus-within': {
						boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px"
					}
				}
			}
		},

		'& .bordered-input': {
			width: "100%",
			height: "48px",
			fontSize: "20px",
			background: "transparent",
			border: "1px solid rgb(229, 232, 235)",
			borderRadius: "8px",
			padding: "10px",
			color: "black",
		},

		'& .progress-box': {
			width: "100%",
			height: "48px",
			fontSize: "20px",
			background: "transparent",
			color: "black",
			display: "flex",
			flexDirection: "row",

			'& *': {
				border: "1px solid rgb(229, 232, 235)",
				borderRadius: "8px",
			},

			'& div': {
				borderRadius: "0px"
			},

			'& input': {
				flex: 1,

				'&.first': {
					borderRadius: "8px 0 0 8px"
				},

				'&.last': {
					borderRadius: "0 8px 8px 0"
				}
			}
		},

		'& .header': {
			fontWeight: "bold",
		},

		'& .border-none': {
			border: "0px !important",
		},

		'& .text-gray': {
			color: "#707a83",
		},

		'& .br-0': {
			borderRadius: "0px !important",
		},

		'& .add-btn': {
			display: "inline-flex",
			flexDirection: "row",
			webkitBoxAlign: "center",
			alignItems: "center",
			borderRadius: "10px",
			webkitBoxPack: "center",
			justifyContent: "center",
			fontSize: "16px",
			fontWeight: 600,
			padding: "12px 20px",
			backgroundColor: "rgb(255, 255, 255)",
			border: "1px solid rgb(32, 129, 226)",
			color: "rgb(32, 129, 226)",
		}
	}
};

export default propertyModalStyle;
