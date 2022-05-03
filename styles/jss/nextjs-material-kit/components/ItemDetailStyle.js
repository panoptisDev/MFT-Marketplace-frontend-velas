const ItemDetailStyle = {
	imageDetail: {
		padding: "16px",

		"@media (min-width: 576px)": {
			height: "100%",
		},

		'& .property-box': {
			background: "rgba(54, 27, 154, 0.8)",
			borderRadius: "24px",
			padding: "30px",
			height: "100%",
		},

		'& .property-div': {
			height: "100%",

			"@media (min-width: 576px)": {
				overflowY: "auto",

				'&::-webkit-scrollbar': {
					width: "7px",
				},

				'&::-webkit-scrollbar-track': {
					backgroundColor: "darkgray",
					borderRadius: "5px"
				},

				'&::-webkit-scrollbar-thumb': {
					backgroundColor: "#9c27b0",
					borderRadius: "5px",
					cursor: "pointer",
					boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",

					'&:hover': {
						backgroundColor: "#820099",
						cursor: "pointer"
					}
				}
			}
		},

		'& .share-div': {
			display: "flex",
			justifyContent: "space-between"
		},

		'& .link-blue': {
			color: "#339af0",

			'&:hover': {
				color: "#1971c2"
			}
		},

		'& .share-icon': {
			width: "24px",
			height: "27px",
			color: "#868e96",
			marginRight: "10px",

			'&:hover': {
				color: "#495057"
			}
		},

		'& .billy-header': {
			color: "white",
			fontWeight: "bold",
		},

		'& .billy-desc': {
			color: "#868e96",
			fontSize: "15px"
		},

		'& ul': {
			margin: 0,
			padding: 0,
			listStyle: "none"
		},

		'& .attrs': {
			flexWrap: "wrap",
			gap: "8px",
			display: "flex",

			'&.raw': {
				gap: "16px",
				marginTop: "32px",

				'& li': {
					textAlign: "left",
					padding: 0
				}
			},

			'& .name': {
				color: "#868e96",
				textTransform: "uppercase",
				fontSize: "10px"
			},

			'& .value': {
				marginTop: "4px",
				fontSize: "16px",
				display: "block"
			},
		},

		'& .m-l-1em': {
			marginLeft: "1em",
			fontSize: "13px",
			fontWeight: "400"
		},

		'& .buy-div': {
			display: "flex",
			justifyContent: "center",
			marginTop: "15px",

			'& .buy-btn': {
				width: "200px",

				'&:hover': {
					webkitTransform: "scale(1.1)",
					transform: "scale(1.1)"
				},
			},
		},

		'& .text-white': {
			color: "white",
		},

		'& .text-green': {
			color: "#12b886",
		},

		'& .inline-flex': {
			display: "inline-flex !important",
		},

		'& .m-l-4': {
			marginLeft: "4px",
		},

		'& .with-border': {
			backgroundColor: "#343a40",
			textAlign: "center !important",
			borderRadius: "8px",
			padding: "8px 24px !important"
		},

		'& .with-border-bottom': {
			borderBottom: "2px solid #343a40"
		},

		'& .hover-blue': {
			color: "#868e96",
			fontSize: "12px",
			lineHeight: "24px",
			marginLeft: "5px",

			'&:hover': {
				color: "#228be6"
			}
		},
	}
};

export default ItemDetailStyle;
