const Style = {
	myCollections: {
		'& *:not(li)': {
			color: '#ffffff'
		},
		'& h2': {
			fontWeight: 'bold'
		},
		'& button': {
			textTransform: 'none',
			fontSize: '115%'
		}
	},
	collectionContainer: {
		display: 'flex',
		marginTop: '50px'
	},
	collectionInfo: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '-30px',
		fontSize: '120%'
	},
	collectionItem: {
		border: '1px solid',
		borderRadius: '6px'
	},
	dehazeBtn: {
		marginLeft: '40px',
		padding: '16px',
		'& svg': {
			margin: 0
		}
	}
};

export default Style;
