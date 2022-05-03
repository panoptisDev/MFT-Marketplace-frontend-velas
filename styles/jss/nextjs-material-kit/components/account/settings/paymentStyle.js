const Style = {
	payment: {
		'& *': {
			color: '#ffffff'
		},
		'& h2, h1, h3, h4, h5': {
			fontWeight: 'bold'
		},
		marginBottom: '15px'
	},
	smallHead: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: '30px 0'
	},
	verify: {
		padding: '20px',
		'& .main': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			'& svg': {
				fontSize: '60px',
			},
			'&>div': {
				margin: '0 20px',
				flex: '1',
				'&>h4': {
					margin: '0'
				}
			}
		}
	}
};

export default Style;
