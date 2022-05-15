import React from 'react'

type PropsType = {
    value ? : string, 
    label ? :string, 
    customAbbreviation ? : any
}
export default function FormatOptionLabel({ value, label, customAbbreviation } : PropsType) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
		<div>
			<img src={value === "ethereum" ? "/assets/img/parts/eth.png" : "/assets/img/parts/pol.svg"} alt="chain" width="40px"
				 height="40px" style={{borderRadius: "50%"}} />
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
