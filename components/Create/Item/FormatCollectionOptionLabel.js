import React from "react";

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent", fontWeight: "bold", color: "black",
		height: "48px" }}>
		{label}
	</div>
);

export default formatOptionLabel;
