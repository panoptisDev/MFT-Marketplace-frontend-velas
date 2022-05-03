import React, {useState} from "react";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "../../CustomButtons/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import styles from "styles/jss/nextjs-material-kit/components/propertyModalStyle";
import modalStyle from "styles/jss/nextjs-material-kit/modalStyle.js";

const useStyles = makeStyles({...styles, ...modalStyle});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";


export default function PropertyModal(props) {
	const classes = useStyles();
	const defaultData =
		props.target === "property" ? {type: "", name: ""}
		: (props.target === "level" ? {name: "", total: 5, value: 3}
		: {name: "", total: 5, value: 3});
	const [ proItems, setProItems ] = useState([defaultData]);

	const removeData = (key) => {
		const data = proItems;
		data.splice(key,1);
		setProItems([...data]);
	}

	const addItem = () => {
		const data = proItems;
		data.push(defaultData);
		setProItems([...data]);
	}

	const handleChangeInput = (e, key) => {
		const temp = proItems;
		temp[key][e.target.name] = e.target.value;
		setProItems([...temp]);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		props.handleClose(proItems);
	}

	return (
		<Dialog
			classes={{
				root: classes.center,
				paper: classes.modal,
			}}
			open={props.isShow}
			TransitionComponent={Transition}
			keepMounted
			onClose={() => {
				props.handleClose(null);
			}}
			aria-labelledby="classic-modal-slide-title"
			aria-describedby="classic-modal-slide-description"
		>
			<DialogTitle
				id="classic-modal-slide-title"
				disableTypography
				className={classes.modalHeader}
				style={{borderBottom: "1px solid #e5e8eb"}}
			>
				<IconButton
					className={classes.closeModal}
					key="close"
					aria-label="Close"
					color="inherit"
					onClick={() => {
						props.handleClose(null);
					}}
				>
					<Close width="30px" height="30px" />
				</IconButton>
				<h3 className={classes.modalTitle} style={{fontWeight: "bold", textAlign: "center"}}>Add {
					props.target === "property" ? "Properties"
					: (props.target === "level" ? "Levels"
					: "Stats")}
				</h3>
			</DialogTitle>
			<DialogContent
				id="classic-modal-slide-description"
				className={classes.modalBody + " " + classes.propertyModal}
				style={{borderBottom: "1px solid #e5e8eb"}}
			>
				{
					props.target === "property" &&
					<p>
						Properties show up underneath your item, are clickable, and can be filtered in your
						collection's sidebar.
					</p>
				}
				{
					props.target === "level" &&
					<p>
						Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
					</p>
				}
				{
					props.target === "stats" &&
					<p>
						Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
					</p>
				}
				<div className="properties-list">
					<div className="properties-row">
						<div className="properties-close border-none" />
						<div className="properties-type header">
							{props.target === "property" ? "Type" : "Name"}
						</div>
						<div className="properties-name header">
							{props.target === "property" ? "Name" : "Value"}
						</div>
					</div>
					{
						proItems.map((item, key) =>
							<div key={key}>
								<div className="properties-row">
									<div className="properties-close">
										<Close className="text-gray" onClick={() => {
											removeData(key);
										}} />
									</div>
									<div className="properties-type">
										<input className="bordered-input"
											   placeholder={props.target === "property" ? "Character" : "Speed"}
											   name={props.target === "property" ? "type" : "name"}
											   onChange={(e) => {handleChangeInput(e, key);}} />
									</div>
									<div className="properties-name">
										{
											props.target === "property"
											? <input className="bordered-input" placeholder="Male" name="name"
												   onChange={(e) => {handleChangeInput(e, key);}} />
									   		: <div className="progress-box">
													<input className="bordered-input first" type="number" name="value"
														   onChange={(e) => {handleChangeInput(e, key);}}
														   value={item.value} />
													<div className="properties-close br-0">Of</div>
													<input className="bordered-input last" type="number" name="total"
														   onChange={(e) => {handleChangeInput(e, key);}}
														   value={item.total} />
											</div>
										}
									</div>
								</div>
							</div>
						)
					}
					<Button onClick={addItem} className="add-btn" size="lg">Add more</Button>
				</div>
			</DialogContent>
			<DialogActions className={classes.displayCenter}>
				<Button color="info" size="lg" onClick={handleSubmit}>Save</Button>
			</DialogActions>
		</Dialog>
	);
}
