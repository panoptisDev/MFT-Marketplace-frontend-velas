const collectionsStyle = {
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
	partTitle: {
		textAlign: 'center',

		'& .top': {
			textAlign: 'center',
			color: '#ced4da',
			marginBottom: '16px',
			paddingTop: '32px',
			fontSize: '32px',
			fontWeight: 'bold'
		},

		'& .stats': {
			flexWrap: 'wrap',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '8px',
			margin: '0 5px 32px',
			display: 'flex',
			listStyle: 'none',
			padding: '0',

			'& li': {
				textAlign: 'center',
				background: '#361b97e6',
				borderRadius: '8px',
				padding: '8px 24px',

				'& .name': {
					textTransform: 'uppercase',
					color: '#868e96',
					marginBottom: '4px',
					fontSize: '10px'
				},

				'& .value': {
					color: 'white'
				}
			}
		}
	}
};

export default collectionsStyle;
