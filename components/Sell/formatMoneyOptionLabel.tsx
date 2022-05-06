import React from "react";

const formatMoneyOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent" }}>
		<div>
			<img src="/img/parts/eth.png" alt="chain" width="40px" height="40px" style={{borderRadius: "50%"}} />
		</div>
		<div style={{color: "black", fontWeight: "bold", paddingLeft: "10px"}}>{label}</div>
	</div>
);

export default formatMoneyOptionLabel;
