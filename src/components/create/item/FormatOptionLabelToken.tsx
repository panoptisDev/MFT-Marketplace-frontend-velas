import React from 'react'

type PropsType = {
    value ? : string, 
    label ? :string, 
    customAbbreviation ? : any
}
export default function FormatOptionLabelToken({ value, label, customAbbreviation } : PropsType) {
	let logo;
	switch (value) {
		case 'dai':
			logo = '/assets/img/tokens/dai-ethereum.svg';
			break;
		case 'ash':
			logo = '/assets/img/tokens/ASH.png';
			break;
		case 'bat':
			logo = '/assets/img/tokens/bat.png'
	}
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
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
  )
}
