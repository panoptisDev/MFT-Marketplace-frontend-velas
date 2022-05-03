import React from "react";

const formatOptionLabelToken = ({ value, label, customAbbreviation }) => {
	let logo;
	switch (value) {
		case 'dai':
			logo = '/img/tokens/dai-ethereum.svg';
			break;
		case 'ash':
			logo = '/img/tokens/ASH.png';
			break;
		case 'bat':
			logo = '/img/tokens/bat.png'
	}
	return (
		<div style={{ display: "flex", alignItems: "center", background: "transparent" }}>
			<div>
				<img src={logo} alt="chain" width="25px"
					 height="25px" style={{borderRadius: "50%"}} />
			</div>
			<div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
				<div style={{color: "black", fontWeight: "bold"}}>{label}</div>
				<div style={{ color: "black" }}>
					{customAbbreviation}
				</div>
			</div>
		</div>
	);
}

export default formatOptionLabelToken;
