const style = {
	transferBox: {
		position: "fixed",
		bottom: 0,
		height: "100px",
		width: "100vw",
		background: "#303339",
		borderTop: "1px solid rgb(21, 27, 34)",
		padding: "0 24px",
		display: "flex",

		'& .cart-container': {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			width: "100%",
			fontSize: "19px",

			'& .cart-box': {
				height: "80px",
				flex: 1,
				display: "flex",

				"@media (max-width: 768px)": {
					display: "none"
				},

				'& p': {
					color: "white",
					margin: 0,
				},

				'& .cart-item': {
					width: "80px",
					padding: "10px"
				},

				'& .cart-img': {
					width: "60px",
					height: "60px",
					borderRadius: "15px",
					overflow: "hidden"
				}
			},

			'& .transfer-btn': {
				height: "48px",
				width: "130px",
				textTransform: "none",
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
			},

			'& .transfer-cancel-btn': {
				height: "48px",
				width: "130px",
				marginLeft: "4px",
				textTransform: "none",
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
				backgroundColor: "rgb(32, 34, 37)",
				border: "1px solid rgb(112, 122, 131)",
				color: "rgb(229, 232, 235)",
			}
		}
	},

	filterButton: {
		display: "none",

		'@media (max-width: 478px)': {
			position: "fixed",
			bottom: "10px",
			height: "50px",
			width: "100vw",
			display: "flex",
			justifyContent: "center",

			'& .filter-btn': {
				height: "50px",
				width: "120px",
				textAlign: "center",
				background: "#2081e2",
				lineHeight: "50px",
				fontSize: "21px",
				fontWeight: "bold",
				cursor: "pointer",
				color: "white",
				borderRadius: "25px",
			}
		},
	},

	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		borderTop: "1px solid #fd562a",

		'& .mobile-filter-bar': {
			position: "fixed",
			height: "100vh",
			width: "100vw",
			backgroundColor: "#202225",
			top: "87px",
			zIndex: 10,
		},

		'& .left-filter-bar': {
			width: "60px",
			borderRight: "1px solid #fd562a",
			minHeight: "300px",

			'@media (max-width: 478px)': {
				display: "none"
			},

			'&.active': {
				width: "340px"
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
			}
		},

		'& .flex-1': {
			flex: 1,
		},

		'& .m-r-5': {
			marginRight: "5px",
		},

		'& .m-l-5': {
			marginLeft: "5px",
		},

		'& .select-gray': {
			'&>div:first-of-type': {
				background: '#353840',
				borderColor: "#353840",
				'& div' :{
					color: '#ffffff !important'
				},
				'& input' :{
					// display: 'none !important'
				}
			}
		},

		'& .content-box': {
			flex: 4,
			display: "flex",
			flexDirection: "column",
			padding: "24px",

			'@media (max-width: 478px)': {
				padding: "0"
			},

				'& .search-box': {
				display: "flex",
				flexDirection: "row",

				"@media (max-width: 576px)": {
					flexDirection: "column",
					padding: "24px"
				},

				'& .sort-box': {
					marginLeft: "5px",
					display: "flex",
					flexDirection: "row",

					"@media (max-width: 576px)": {
						marginLeft: 0,
						marginTop: "5px",
					},
				}
			},

			'& .filter-content': {
				display: "flex",
				flexWrap: "wrap",
				alignItems: "center",
				marginTop: "10px",

				"@media (max-width: 576px)": {
					padding: "0 24px"
				},

				'& .filter-button': {
					webkitBoxAlign: "center",
					alignItems: "center",
					cursor: "pointer",
					display: "flex",
					minHeight: "54px",
					padding: "10px 20px",
					borderWidth: "1px",
					borderStyle: "solid",
					backgroundColor: "rgb(32, 34, 37)",
					borderColor: "rgb(21, 178, 229)",
					fontSize: "14.5px",
					borderRadius: "10px",
					margin: "0 10px 10px 0",
					color: "white",

					'& .filter-close': {
						marginLeft: "5px",
						color: "#8a939b",
					},

					'&:hover': {
						borderColor: "white",

						'& .filter-close': {
							color: "white"
						}
					}
				},

				'& .clear-btn': {
					webkitBoxAlign: "center",
					alignItems: "center",
					cursor: "pointer",
					minHeight: "54px",
					fontSize: "16px",
					fontWeight: 500,
					color: "rgb(32, 129, 226)",
					padding: "10px 20px",
				},
			}
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
	},
};

export default style;
