import React from "react";
import {ArrowDownward} from "@material-ui/icons";

const formatMethodOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent", height: "40px" }}>
		<ArrowDownward style={{transform: "rotate(45deg)"}} />
		<div style={{color: "black", fontWeight: "bold", paddingLeft: "10px"}}>{label}</div>
	</div>
);

export default formatMethodOptionLabel;
