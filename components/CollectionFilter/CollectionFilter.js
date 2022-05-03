import React from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";

import styles from "styles/jss/nextjs-material-kit/pages/components.js";
import basicsStyles from "styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle.js";

const useStyles = makeStyles({...basicsStyles, ...styles});

export default function CollectionFilter() {
	const classes = useStyles();
	return (
		<div className={classes.filterOptionContainer}>
			<div className={classes.filterTitle}>
				<h3>Filter By</h3>
			</div>
			<div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
				<FormControlLabel
					control={
						<Checkbox
							tabIndex={-1}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
						/>
					}
					classes={{ label: classes.label, root: classes.labelRoot }}
					label="Price"
				/>
			</div>
			<div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
				<FormControlLabel
					control={
						<Checkbox
							tabIndex={-1}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
						/>
					}
					classes={{ label: classes.label, root: classes.labelRoot }}
					label="Latest"
				/>
			</div>
			<div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
				<FormControlLabel
					control={
						<Checkbox
							tabIndex={-1}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
						/>
					}
					classes={{ label: classes.label, root: classes.labelRoot }}
					label="Oldest"
				/>
			</div>
			<div className={classes.checkboxAndRadio + " " + classes.checkboxAndRadioHorizontal}>
				<FormControlLabel
					control={
						<Checkbox
							tabIndex={-1}
							checkedIcon={<Check className={classes.checkedIcon} />}
							icon={<Check className={classes.uncheckedIcon} />}
							classes={{
								checked: classes.checked,
								root: classes.checkRoot,
							}}
						/>
					}
					classes={{ label: classes.label, root: classes.labelRoot }}
					label="Must Sold"
				/>
			</div>
		</div>
	);
}

CollectionFilter.propTypes = {};
