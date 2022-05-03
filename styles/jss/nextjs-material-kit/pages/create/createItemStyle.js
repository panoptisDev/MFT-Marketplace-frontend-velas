const createItemFormStyle = {
	createItemForm: {
		maxWidth: "1280px",
		textAlign: "left",
		color: "white",
		padding: "24px",

		'& .top': {
			color: '#ced4da',
			marginBottom: '16px',
			paddingTop: '32px',
			fontWeight: 'bold'
		},

		'& .fileContainer': {
			border: '3px dashed rgb(204, 204, 204)',
			width: '350px',
			height: '260px',
			borderRadius: '10px',
			padding: "4px",

			'&.w-h-160': {
				width: '160px',
				height: '160px'
			},

			'& .rbFileInput': {
				cursor: 'pointer',
				borderRadius: '10px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				height: "100%",
				width: "100%",

				'&:hover': {
					background: '#212529'
				},

				'& .video-change': {
					height: "50px",
					lineHeight: "50px",
					textAlign: "center",
					color: "white",
					fontSize: "20px",

					'&:hover': {
						color: "#339af0 !important"
					},
				},

				'& .rbFileIcon': {
					fontSize: '4.5em',
					opacity: '0',
					transition: 'opacity 400ms ease 0s'
				},

				'& .fa:not(.rbFileIcon)': {
					opacity: '1',
					transition: 'opacity 400ms ease 0s'
				},

				'& .rbFile': {
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					position: 'absolute',
					padding: '4px',

					'& img': {
						width: "100%",
						height: "100%",
						borderRadius: '10px',
						transition: 'opacity 400ms ease 0s',
						opacity: '1',
						objectFit: 'cover'
					}
				},

				'& .removeImg': {
					position: 'absolute',
					top: '12px',
					right: '12px',
					color: 'rgb(204, 204, 204)',
					lineHeight: '50%',
					fontSize: '38px'
				}
			},
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

		'& .modal-box': {
			borderBottom: "1px solid darkgray",

			'& .pro-item-list': {
				display: "flex",
				flexWrap: "wrap",
				marginBottom: "10px",

				'& .pro-item': {
					margin: "5px",
					width: "150px",
					borderRadius: "6px",
					border: "1px solid rgb(21, 178, 229)",
					padding: "10px",
					textAlign: "center",
					background: '#212529',

					'& .pro-item-type': {
						color: "rgb(21, 178, 229)",
						fontSize: "11px",
						fontWeight: 500,
						textTransform: "uppercase"
					},

					'& .pro-item-name': {
						color: "white",
						fontSize: "15px",
						fontWeight: 500,
						lineHeight: "30px",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					}
				}
			},

			'& .lvl-item-list': {
				display: "flex",
				flexDirection: "column",
				marginBottom: "10px",

				'& .lvl-item': {
					borderRadius: "10px",
					border: "1px solid rgb(229, 232, 235)",
					background: "#212529",
					padding: "12px",
					maxWidth: "428px",
					marginTop: "8px",

					'& .lvl-item-info': {
						width: "100%",
						display: "inline-flex",
						justifyContent: "space-between",
					},

					'& .lvl-item-bar': {
						backgroundColor: "rgb(251, 253, 255)",
						border: "1px solid rgb(229, 232, 235)",
						borderRadius: "14px",
						height: "14px",
						marginTop: "4px",
						overflow: "hidden",

						'& .lvl-item-content': {
							backgroundColor: "rgb(32, 129, 226)",
							height: "100%",
						}
					}
				}
			},

			'& .box-header': {
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				padding: "12px 10px 0px 10px",
				alignItems: "center",
			},

			'& .round-border': {
				border: "1px solid gray",
				borderRadius: "10px",
				width: "40px",
				height: "40px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "gray",
				cursor: "pointer",

				'&:hover': {
					border: "1px solid darkgray",
					color: "darkgray"
				}
			},

			'& .check-box': {
				width: "40px",
				height: "40px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			},

			'& .content-box': {
				display: "flex",
				flexDirection: "row",
				alignItems: "center"
			}
		},

		'& .text-label': {
			marginTop: "15px",
			fontSize: "18px",
			fontWeight: "bold"
		},

		'& .m-t-4': {
			marginTop: "4px"
		},

		'& .tooltip-icon': {
			marginLeft: "4px",

			'&:hover': {
				color: "#212529"
			}
		},

		'& .m-t-15': {
			marginTop: "15px"
		},

		'& .text-danger': {
			color: "#eb5757",
			margin: "0px 3px"
		},

		'& .text-blue': {
			color: "#339af0",
			margin: "0px 3px"
		},

		'& .display-flex': {
			display: "flex"
		}
	}
};

export default createItemFormStyle;
