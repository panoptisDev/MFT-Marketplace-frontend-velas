const profileStyle = {
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		'& *': {
			color: '#ffffff',
		},
		'&>h2': {
			fontWeight: 'bold',
			margin: '0'
		},
	},
	form: {
		marginTop: '30px',
		'& *': {
			color: '#ffffff'
		},
		'& .formControl': {
			marginBottom: '30px',
		},
		'&>div' :{
			display: 'flex',
			flexDirection: 'row',
			"@media (max-width: 1024px)": {
				flexDirection: 'column'
			},
		}
	},

	inputGroup: {
		flexGrow: 1,
		"@media (min-width: 1024px)": {
			marginRight: '80px'
		},
	},

	formControl: {
		marginBottom: '30px',
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

		'& .linkInput': {
			display: 'flex',
			alignItems: 'center',
			border: '1px solid #ced4da',
			borderBottomWidth: '0',

			'& svg': {
				margin: '0 12px'
			},

			'& input': {
				background: '#353840',
				border: 'none',
				height: '48px',
				flexGrow: '1'
			}
		},

		'& .iconInput': {
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			background: '#353840',
			color: '#ffffff',
			width: '100%',
			height: '48px',
			border: '1px solid #ced4da',
			borderRadius: '6px',
			fontSize: '107%',
			paddingLeft: '10px',
			paddingRight: '10px',
			'&>input': {
				background: '#353840',
				color: '#ffffff',
				border: 'none',
				flex: '1',
				overflow: 'hidden',
				textOverflow: 'ellipsis'
			}
		}
	},

	avatarImgInput: {
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
		margin: 'auto',

		'& .imgIcon': {
			fontSize: '4.5em',
			opacity: '0',
			transition: 'opacity 100ms ease 0s'
		},

		'& .fa:not(.imgIcon)': {
			opacity: '1',
			transition: 'opacity 100ms ease 0s'
		},

		'& .avatarImg': {
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
		},

		'&:hover': {
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
	},

	BannerImgInput: {
		borderRadius: '10px',
		outline: '3px dashed rgb(204, 204, 204)',
		outlineOffset: '4px',
		transition: 'background 100ms ease 0s',
		width: '160px',
		height: '160px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		margin: 'auto',

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
		},

		'&:hover': {
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
			},
		},

	},
	saveBtn: {
		"@media (max-width: 1024px)": {
			display: 'block',
			margin: 'auto',
			width: '100%'
		},
	}


};

export default profileStyle;
