import React from 'react'

type PropsType = {
    name ? : string, 
    logo_uri ? :string, 
    description ? : string
}
export default function FormatOptionLabel({ name, logo_uri, description } : PropsType) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
		<div>
			<img src={logo_uri} alt="chain" width="40px"
				 height="40px" style={{borderRadius: "50%"}} />
		</div>
		<div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
			<div style={{color: "black", fontWeight: "bold"}}>{name}</div>
			<div style={{ color: "black" }}>
				{description}
			</div>
		</div>
	</div>
  )
}
