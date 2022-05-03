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
	accountContainer: {
		margin: 0,
		maxWidth: "none",
		paddingLeft: 0,
		paddingRight: 0,

		'& .edit-icon': {
			color: "white",
			fontSize: "2rem",
			zIndex: 5
		},

		'& .banner-box': {
			cursor: "pointer",
			position: "relative",
			height: "225px",
			display: "block",
			backgroundColor: "black",

			'& .hover-back': {
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "225px",
				display: 'none',
				zIndex: 1,
			},

			'&:hover .hover-back': {
				display: "flex"
			},

			'& .banner-img': {
				width: "100%",
				height: "100%",
				objectFit: "cover",
				position: "absolute",

				'&:hover': {
					opacity: "0.5",
				}
			},

			'& .empty-banner': {
				height: "100%",
				width: "100%",
				position: "absolute",
				backgroundColor: "rgba(0,0,0,0.7)",

				'&:hover': {
					backgroundColor: "#151b22",
				}
			}
		},

		'& .sub-box': {
			width: "100%",
			display: "flex",
			flexDirection: "row",

			'& .user-info-box': {
				flex: 1,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",

				'& .avatar-box': {
					zIndex: 10,
					border: "2px solid rgb(38, 43, 47)",
					backgroundColor: "black",
					marginTop: "-64px",
					borderRadius: "50%",
					width: "130px",
					minWidth: "130px",
					height: "130px",
					minHeight: "130px",
					position: "relative",
					cursor: "pointer",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",

					'& .edit-icon': {
						position: "absolute",
						display: "none"
					},

					'&:hover .edit-icon': {
						display: "block !important"
					},

					'& .avatar-img': {
						width: "100%",
						height: "100%",
						borderRadius: "50%",
						opacity: 1
					},

					'&:hover .avatar-img': {
						opacity: 0.5
					},
				},

				'& .user-name': {
					color: "white",
					fontSize: "30px",
					fontWeight: 600,
					minHeight: "40px",
					marginBottom: "12px",
					marginTop: "12px"
				},

				'& .joined-label': {
					fontWeight: 400,
					fontSize: "16px",
					color: "rgb(138, 147, 155)",
					marginTop: "0px",
					marginBottom: 0,
				}
			},

			'& .empty-box': {
				"@media (max-width: 576px)": {
					display: "none",
				},
			},

			'& .setting-box': {
				flex: 1,
				display: "flex",
				flexDirection: "row-reverse",
				marginRight: "20px",
				marginTop: "20px",
				color: "rgb(229, 232, 235)",
				width: "fit-content",

				"@media (max-width: 576px)": {
					display: "none",
				},

				'& .share-btn': {
					cursor: "pointer",
					width: "50px",
					height: "50px",
					display: "inline-flex",
					flexDirection: "row",
					webkitBoxAlign: "center",
					alignItems: "center",
					borderRadius: "10px 0 0 10px",
					webkitBoxPack: "center",
					justifyContent: "center",
					fontSize: "16px",
					fontWeight: 600,
					padding: "12px",
					backgroundColor: "transparent",
					border: "1px solid rgb(112, 122, 131)",
					color: "rgb(229, 232, 235)",
				},

				'& .setting-btn': {
					cursor: "pointer",
					width: "50px",
					height: "50px",
					display: "inline-flex",
					flexDirection: "row",
					webkitBoxAlign: "center",
					alignItems: "center",
					borderRadius: "0 10px 10px 0",
					webkitBoxPack: "center",
					justifyContent: "center",
					fontSize: "16px",
					fontWeight: 600,
					padding: "12px",
					backgroundColor: "transparent",
					border: "1px solid rgb(112, 122, 131)",
					color: "rgb(229, 232, 235)",
				},
			}
		}
	}
};

export default style;
