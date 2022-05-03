const groupStyle = {
	partTitle: {
		textAlign: 'center',

		'& .top': {
			textAlign: 'center',
			color: '#ced4da',
			marginBottom: '16px',
			paddingTop: '32px',
			fontSize: '32px',
			fontWeight: 'bold',

			'& .img-mark': {
				verticalAlign: "top",
				width: "24px",
				height: "24px",
				marginLeft: "8px"
			},
		},

		'& .desc': {
			color: "#868e96",
			fontSize: "12px"
		},

		'& .other-site .site-item': {
			color: "#868e96",
			width: "24px",
			height: "24px",
			cursor: "pointer",
			margin: "0 5px",

			'& :hover': {
				color: "#228be6"
			}
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
					color: 'white',

					'&.label-blue': {
						color: "#339af0"
					}
				}
			}
		},

		'& .img-mark-16': {
			width: "16px",
			height: "16px"
		},
	}
};

export default groupStyle;
