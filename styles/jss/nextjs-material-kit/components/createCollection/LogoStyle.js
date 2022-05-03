const style = {
	themeGroup: {
		display: 'flex',
		'& .item' : {
			border: '1px solid rgb(229, 232, 235)',
			borderRadius: '10px',
			cursor: 'pointer',
			height: '100%',
			padding: '12px 12px 20px',
			textAlign: 'center',
			flex: 1,
			margin: '0 6px 0 6px'
		},
		'& .item:hover': {
			border: '1px solid #228be6',
		},

		'& .activeTheme': {
			border: '1px solid #228be6',
			position: 'relative'
		},

		'& .activeTheme:after': {
			content: '" "',
			width: '24px',
			height: '24px',
			background: 'url(/img/verified.svg) 0 0/contain',
			position: 'absolute',
			top: '-6px',
			right: '-6px'
		}
	}
};

export default style;
