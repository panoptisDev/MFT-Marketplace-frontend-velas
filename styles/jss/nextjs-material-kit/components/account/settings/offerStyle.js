const Style = {
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

	noOffers: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		border: '1px solid',
		padding: '100px 16px',
		borderRadius: '6px'
	}
};

export default Style;
