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

		'& .add-btn': {
			display: "inline-flex",
			flexDirection: "row",
			webkitBoxAlign: "center",
			alignItems: "center",
			borderRadius: "10px",
			webkitPoxPack: "center",
			justifyContent: "center",
			fontSize: "16px",
			fontWeight: 600,
			padding: "12px 20px",
			backgroundColor: "rgb(32, 129, 226)",
			border: "1px solid rgb(32, 129, 226)",
			color: "rgb(255, 255, 255)",
			height: "50px",
			marginLeft: "10px",
			cursor: "pointer",

			'&:hover': {
				backgroundColor: "rgb(66, 160, 255)",
				border: "1px solid rgb(66, 160, 255)",
			}
		},

		'& .m-l-5': {
			marginLeft: "5px !important",
		},

		'& .m-r-5': {
			marginRight: "5px !important",
		},

		'& .m-l-10': {
			marginLeft: "10px !important",
		},

		'& .m-0': {
			margin: "0px !important",
		},

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
			backgroundColor: "#151b22",

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

		'& .mobile-func-box': {
			display: "none",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",

			"@media (max-width: 576px)": {
				display: "flex",
			},

			'& .setting-box': {
				flex: 1,
				display: "flex",
				flexDirection: "row-reverse",
				marginTop: "20px",
				color: "rgb(229, 232, 235)",
				width: "fit-content",

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
			},

			'& .watch-box': {
				flex: 1,
				display: "flex",
				flexDirection: "row",
				marginTop: "20px",
				color: "rgb(229, 232, 235)",
				width: "fit-content",

				'& .icon-btn': {
					width: "50px"
				},

				'& .watch-btn': {
					cursor: "pointer",
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
					backgroundColor: "rgb(32, 34, 37)",
					border: "1px solid rgb(112, 122, 131)",
					color: "rgb(229, 232, 235)",
					height: "50px",
				}
			},
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
			},

			'& .watch-box': {
				flex: 1,
				display: "flex",
				flexDirection: "row",
				marginRight: "20px",
				marginTop: "20px",
				color: "rgb(229, 232, 235)",
				width: "fit-content",

				"@media (max-width: 576px)": {
					display: "none",
				},

				'& .icon-btn': {
					width: "50px"
				},

				'& .watch-btn': {
					cursor: "pointer",
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
					backgroundColor: "rgb(32, 34, 37)",
					border: "1px solid rgb(112, 122, 131)",
					color: "rgb(229, 232, 235)",
					height: "50px",
				}
			},


		},

		'& .detail-container': {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			color: "white",

			'& .m-t-20': {
				marginTop: "20px",
			},

			'& .detail-box': {
				width: "fit-content",
				webkitBoxAlign: "center",
				alignItems: "center",
				borderRadius: "10px",
				display: "flex",
				flexWrap: "wrap",
				justifyContent: "center",

				'& .detail-item': {
					border: "1px solid rgb(21, 27, 34)",
					width: "144px",
					height: "88px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#202225",
					cursor: "pointer",

					'&:hover': {
						transition: "all 0.2s ease 0s",
						boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px",
					},

					'& .value-label': {
						lineHeight: "36px",
						height: "36px",
						fontSize: "24px",
						fontWeight: 600,
						display: "flex",
						alignItems: "center",

						'& .eth-icon': {
							width: "17px",
							height: "30px",
							marginRight: "5px"
						}
					}
				},

				'& .item-1': {
					borderRadius: "10px 0 0 10px",
					borderRight: 0,
				},

				'& .item-2': {
					borderRight: 0,
				},

				'& .item-4': {
					borderRadius: "0 10px 10px 0",
					borderLeft: 0,
				},

				"@media (max-width: 576px)": {
					'& .item-1': {
						borderRadius: "10px 0 0 0",
						borderRight: 0,
						borderBottom: 0,
					},

					'& .item-2': {
						borderRadius: "0 10px 0 0",
						borderBottom: 0
					},

					'& .item-3': {
						borderRadius: "0 0 0 10px",
						borderRight: 0,
					},

					'& .item-4': {
						borderRadius: "0 0 10px 0",
						borderLeft: "1px solid rgb(21, 27, 34) !important",
					},
				},
			}
		}
	}
};

export default style;
