const itemListStyle = {
	items: {
		listStyle: 'none',
		padding: 0,
		grid: 'none/repeat(auto-fit,minmax(160px,200px))',
		justifyContent: 'center',
		alignItems: 'start',
		gap: '32px',
		margin: '32px',
		fontSize: '13px',
		display: 'grid',

		"@media (max-width: 496px)": {
			grid: 'none/repeat(auto-fit,calc(50vw - 39px))',
			gap: '16px',
			margin: '32px 16px'
		},

		'& li': {
			background: '#212529',
			contain: 'none',
			borderRadius: '8px',
			position: 'relative',
			boxShadow: '0 2px 8px rgb(0 0 0 / 40%)',

			'&>a': {
				color: '#f8f9fa',
				padding: 0,
				textDecoration: 'none',
				display: 'block',
				overflow: 'hidden',

				'&:hover .media img': {
					webkitTransform: "scale(1.1)",
					transform: "scale(1.1)"
				},
			},

			'&:hover': {
				boxShadow: "0 0 0 2px #228be6",
				borderRadius: '8px'
			},

			'&.verified': {
				'&:after': {
					content: "",
					width: '24px',
					height: '24px',
					background: 'url(/img/verified.svg) 0 0/contain',
					position: 'absolute',
					top: '-6px',
					right: '-6px'
				}
			},

			'&.verified:after': {
				content: '" "',
				width: '24px',
				height: '24px',
				background: 'url(/img/verified.svg) 0 0/contain',
				position: 'absolute',
				top: '-6px',
				right: '-6px'
			}
		},

		'& .media': {
			width: 'auto',
			height: '200px',
			background: 'rgba(0,0,0,.4)',
			borderRadius: '8px 8px 0 0',
			justifyContent: 'center',
			display: 'flex',
			overflow: 'hidden',

			"@media (max-width: 496px)": {
				height: 'calc(50vw - 24px)'
			},

			'& img': {
				width: '100%',
				height: '100%',
				objectFit: 'contain',
				margin: 'auto',
				transition: '-webkit-transform .2s,transform .2s'
			}
		},

		'& .meta': {
			whiteSpace: 'nowrap',
			background: '#212529',
			borderRadius: '0 0 8px 8px',
			padding: '16px'
		},

		'& .chain': {
			color: '#868e96',
			display: 'block',
			marginBottom: '4px',
			fontSize: '12px',

			'& img': {
				width: '12px',
				height: '12px',
				verticalAlign: '-2px',
				display: 'inline'
			}
		},

		'& .name': {
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			fontWeight: 700,
			overflow: 'hidden'
		},

		'& .scores': {
			color: '#868e96',
			marginTop: '4px',
			fontSize: '10px'
		},

		'& .buy-container': {
			marginTop: '10px',
			display: 'flex',
			justifyContent: 'center',

			'& .buy-btn': {
				height: "30px"
			},

			'& .buy-btn:hover': {
				webkitTransform: "scale(1.1)",
				transform: "scale(1.1)"
			}
		}
	}
};

export default itemListStyle;
