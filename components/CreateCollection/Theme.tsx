import React, {useState} from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/createCollection/ThemesStyle";

const useStyles = makeStyles(styles);

const options = [
	{ value: "dai", label: "DAI", customAbbreviation: "Ethereum" },
	{ value: "ash", label: "ASH", customAbbreviation: "Ethereum" },
	{ value: "bat", label: "BAT", customAbbreviation: "Ethereum" },
];
// const itemStyle = {
// 	border: '1px solid rgb(229, 232, 235)',
// 	borderRadius: '10px',
// 	cursor: 'pointer',
// 	height: '100%',
// 	padding: '12px 12px 20px',
// 	textAlign: 'center',
// 	flex: 1
// }
// const midItem = {
// 	marginLeft: '10px',
// 	marginRight: '10px',
// 	border: '1px solid rgb(229, 232, 235)',
// 	borderRadius: '10px',
// 	cursor: 'pointer',
// 	height: '100%',
// 	padding: '12px 12px 20px',
// 	textAlign: 'center',
// 	flex: 1
// }

export default function CreateCollection() {
	const classes = useStyles();
	const [ theme, setTheme ] = useState('contain');
	const themeHandle = (val = 'contain') => {
		setTheme(val)
	}
	return (
		<div className={'formControl'}>
			<h4><strong>Display theme</strong></h4>
			<div>

			</div>
			<p>Change how your items are shown.</p>
			<div className={classes.themeGroup}>
				{
					theme === 'padded' ?
						<div className={'item activeTheme'}>
							<img src={"/img/theme/card-display-padded.svg"} alt={"padded"} style={{width: '100%', height: '100%'}}/>
							<h4>Padded</h4>
							<div>Recommended for assets with transparent background</div>
						</div> :
						<div className={'item'} onClick={() => themeHandle('padded')}>
							<img src={"/img/theme/card-display-padded.svg"} alt={"padded"} style={{width: '100%', height: '100%'}}/>
							<h4>Padded</h4>
							<div>Recommended for assets with transparent background</div>
						</div>
				}
				{
					theme === 'contain' ?
						<div className={'item activeTheme'}>
							<img src={"/img/theme/card-display-contain.svg"} alt={"Contain"} style={{width: '100%'}}/>
							<h4>Contained</h4>
							<div>Recommended for assets that are not a 1:1 ratio</div>
						</div> :
						<div className={'item'} onClick={() => themeHandle('contain')}>
							<img src={"/img/theme/card-display-contain.svg"} alt={"Contain"} style={{width: '100%'}}/>
							<h4>Contained</h4>
							<div>Recommended for assets that are not a 1:1 ratio</div>
						</div>
				}
				{
					theme === 'cover' ?
						<div className={'item activeTheme'}>
							<img src={"/img/theme/card-display-cover.svg"} alt={"Cover"} style={{width: '100%'}}/>
							<h4>Covered</h4>
							<div>Recommended for assets that can extend to the edge</div>
						</div> :
						<div className={'item'} onClick={() => themeHandle('cover')}>
							<img src={"/img/theme/card-display-cover.svg"} alt={"Cover"} style={{width: '100%'}}/>
							<h4>Covered</h4>
							<div>Recommended for assets that can extend to the edge</div>
						</div>
				}
			</div>
		</div>
	);
}

CreateCollection.propTypes = {};
