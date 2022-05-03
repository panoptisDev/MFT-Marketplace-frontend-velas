const collectionsStyle = {

	partTitle: {

		'& .top': {
			color: '#ced4da',
			marginBottom: '16px',
			paddingTop: '32px',
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
				background: '#212529',
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
