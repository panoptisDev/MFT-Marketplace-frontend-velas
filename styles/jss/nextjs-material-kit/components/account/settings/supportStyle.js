const Style = {
	support: {
		'& *': {
			color: '#ffffff'
		},
		'& h2, h1, h3, h4, h5': {
			fontWeight: 'bold'
		}
	},
	helpItem: {
		border: '1px solid',
		borderBottomWidth: '0',

		'& .buttonText': {
			"@media (max-width: 576px)": {
				"fontSize": "12px !important",
			}
		},

		'& button' : {
			background: 'none',
			boxShadow: 'none',
			display: 'block',
			width: '100%',
			padding: '20px 30px',
			'&:hover': {
				background: 'none',
				boxShadow: 'none'
			},
			'&:focus': {
				background: 'none',
				boxShadow: 'none'
			},
			'& .buttonText': {
				fontWeight: 'bold',
				fontSize: '140%',
				overflow: 'hidden',
				textOverflow: 'ellipsis'
			},
			'&>span': {
				display: 'flex',
				justifyContent: 'space-between'
			}
		},
		'& .itemDesc': {
			padding:'0 10px 10px 30px'
		}
	},
	textBox: {
		border: '1px solid',
		padding: '15px',
		background: 'rgb(150 191 150 / 30%)',
		margin: '0 30px 30px 30px',
		display: 'flex',
		'& svg': {
			margin: '10px 10px 10px 0',
			alignContent: 'center'
		}
	},
};

export default Style;
