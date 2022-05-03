const Style = {
	header: {
		'&>h2': {
			color: '#ffffff',
			fontWeight: 'bold',
			margin: '0'
		},
	},
	form: {
		marginTop: '30px',
		'& *': {
			color: '#ffffff'
		},
	},
	formControl: {
		marginBottom: '30px',
	},
	checkGroup: {
		border: '1px solid rgb(229, 232, 235)',
		borderRadius: '6px',
		borderBottomWidth: '0',
	},
	checkItem: {
		display: 'flex',
		flexGrow: '1',
		alignItems: 'center',
		borderBottom: '1px solid rgb(229, 232, 235)',
		'& h4': {
			marginBottom: '5px',
			fontWeight: '600'
		}
	},
	tokenItemStyle: {
		display: "flex",
		alignItems: "center",
		margin: '4px 17px 4px 6px',
		padding: '8px 15px 8px 13px'
	},
	saveBtn: {
		"@media (max-width: 1024px)": {
			display: 'block',
			margin: 'auto',
			width: '100%'
		},
	}
};

export default Style;
