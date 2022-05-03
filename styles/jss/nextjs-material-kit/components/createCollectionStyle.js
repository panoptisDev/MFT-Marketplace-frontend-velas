const formStyle = {
	form: {
		'& *': {
			color: '#ced4da'
		},

		'& .requireHead:after': {
			content: '" *"',
			color: 'red'
		},

		'& .formControl': {
			marginBottom: '30px',

			'& .logoImgInput': {
				cursor: 'pointer',
				borderRadius: '50%',
				outline: '3px dashed rgb(204, 204, 204)',
				outlineOffset: '4px',
				width: '160px',
				height: '160px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				background: 'none',
				transition: 'background 100ms ease 0s',

				'& .imgIcon': {
					fontSize: '4.5em',
					opacity: '0',
					transition: 'opacity 100ms ease 0s'
				},

				'& .fa:not(.imgIcon)': {
					opacity: '1',
					transition: 'opacity 100ms ease 0s'
				},

				'& .logoImg': {
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					position: 'absolute',
					padding: '4px',

					'& img': {
						maxWidth: "100%",
						height: "100%",
						borderRadius: '50%',
						transition: 'opacity 100ms ease 0s',
						opacity: '1'
					}
				}
			},

			'& .logoImgInput:hover': {
				background: '#353840',
				'& .imgIcon': {
					zIndex: '1',
					opacity: '1',
					color: 'rgb(179, 179, 179)'
				},

				'& img': {
					opacity: '0.7 !important'
				},

				'& .fa:not(.imgIcon)': {
					opacity: '0.7'
				},

			},

			'& .FeaturedImgInput': {
				borderRadius: '10px',
				outline: '3px dashed rgb(204, 204, 204)',
				outlineOffset: '4px',
				transition: 'background 100ms ease 0s',
				width: '300px',
				height: '200px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',

				'& label': {
					height: '100%',
					width: '100%',
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				},

				'& .FeaturedImgIcon': {
					fontSize: '4.5em',
					opacity: '0',
					transition: 'opacity 100ms ease 0s'
				},

				'& .fa:not(.FeaturedImgIcon)': {
					opacity: '1',
					transition: 'opacity 100ms ease 0s'
				},

				'& .FeaturedImg': {
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					position: 'absolute',
					padding: '4px',

					'& img': {
						maxWidth: "100%",
						height: "100%",
						borderRadius: '10px',
						transition: 'opacity 100ms ease 0s',
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
					fontSize: '38px',
					transition: 'opacity 100ms ease 0s',
					cursor: 'pointer'
				}
			},

			'& .FeaturedImgInput:hover': {
				background: '#353840',
				'& .FeaturedImgIcon': {
					zIndex: '1',
					opacity: '1',
					color: 'rgb(179, 179, 179)'
				},

				'& img': {
					opacity: '0.7 !important'
				},

				'& .fa:not(.imgIcon)': {
					opacity: '0.7'
				},
			},

			'& .BannerImgInput': {
				borderRadius: '10px',
				outline: '3px dashed rgb(204, 204, 204)',
				outlineOffset: '4px',
				transition: 'background 100ms ease 0s',
				maxWidth: '700px',
				height: '200px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',

				'& label': {
					height: '100%',
					width: '100%',
					cursor: 'pointer',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				},

				'& .BannerImgIcon': {
					fontSize: '4.5em',
					opacity: '0',
					transition: 'opacity 100ms ease 0s'
				},

				'& .fa:not(.BannerImgIcon)': {
					opacity: '1',
					transition: 'opacity 100ms ease 0s'
				},

				'& .BannerImg': {
					width: '100%',
					height: '100%',
					overflow: 'hidden',
					position: 'absolute',
					padding: '4px',

					'& img': {
						maxWidth: "100%",
						height: "100%",
						borderRadius: '10px',
						transition: 'opacity 100ms ease 0s',
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
					fontSize: '38px',
					transition: 'opacity 100ms ease 0s',
					cursor: 'pointer'
				}
			},

			'& .BannerImgInput:hover': {
				background: '#353840',
				'& .BannerImgIcon': {
					zIndex: '1',
					opacity: '1',
					color: 'rgb(179, 179, 179)'
				},

				'& img': {
					opacity: '0.7 !important'
				},

				'& .fa:not(.imgIcon)': {
					opacity: '0.7'
				}
			},

			'& .textInput': {
				background: '#353840',
				color: '#ffffff',
				width: '100%',
				height: '48px',
				border: '1px solid #ced4da',
				borderRadius: '6px',
				fontSize: '107%',
				paddingLeft: '10px',
				paddingRight: '10px'
			},

			'& .textareaInput': {
				background: '#353840',
				color: '#ffffff',
				width: '100%',
				border: '1px solid #ced4da',
				borderRadius: '6px',
				fontSize: '107%',
				paddingLeft: '10px',
				paddingRight: '10px'
			},

			'& .linkInput': {
				display: 'flex',
				alignItems: 'center',
				border: '1px solid #ced4da',
				borderBottomWidth: '0',


				'& i': {
					fontSize: '1.5em',
					padding: '0 16px'
				},

				'& input': {
					background: '#353840',
					border: 'none',
					height: '48px',
					flexGrow: '1'
				}
			}
		},
	},

	mySelect: {
		'&>div:first-of-type': {
			background: '#353840',
			'& div' :{
				color: '#ffffff !important'
			}
		}
	}
};

export default formStyle;
