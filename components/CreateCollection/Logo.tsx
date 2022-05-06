import React, {useState} from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import styles from "styles/jss/nextjs-material-kit/components/createCollection/LogoStyle";

const useStyles = makeStyles(styles);

export default function CreateCollection({ onChange }) {
	const classes = useStyles();
	const [ logo, setLogo ] = useState('');
	const logoChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setLogo(e.target.files[0]);
			onChange(e);
		}
	}
	return (
		<div className={'formControl'}>
			<h4 className="requireHead"><strong>Logo image</strong></h4>
			<p>This image will also be used for navigation. 350 x 350 recommended.</p>
			<label className="logoImgInput" htmlFor="logoInput">
				<input type="file" id="logoInput" name="logoInput" accept="image/*" style={{ display: 'none' }} onChange={logoChange} />
				{ !logo ? <i className="fa fa-image" style={{ fontSize: '4.5em' }} /> :
					<i className="fa fa-image imgIcon" /> }
				{ logo && <div className="logoImg">
					<img src={ URL.createObjectURL(logo) } width={160} height={160} />
				</div> }
			</label>
		</div>
	);
}

CreateCollection.propTypes = {};
