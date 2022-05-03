import React from "react";

const formatOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center" }}>
		<div>
			<img src={value === "ethereum" ? "/img/parts/eth.png" : "/img/parts/pol.svg"} alt="chain" width="40px"
				 height="40px" style={{borderRadius: "50%"}} />
		</div>
		<div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
			<div style={{color: "black", fontWeight: "bold"}}>{label}</div>
			<div style={{ color: "black" }}>
				{customAbbreviation}
			</div>
		</div>
	</div>
);

export default formatOptionLabel;
