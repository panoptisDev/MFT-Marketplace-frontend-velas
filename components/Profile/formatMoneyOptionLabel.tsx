import React from "react";
import {AttachMoney} from '@material-ui/icons';

const formatMoneyOptionLabel = ({ value, label, customAbbreviation }) => (
	<div style={{ display: "flex", alignItems: "center", background: "transparent" }}>
		<div>
			{
				value === "usd" ?
				<div style={{width: "40px", height: "40px", fontSize: "40px", borderRadius: "50%", display: "flex",
					justifyContent: "center", alignItems: "center", backgroundColor: "black"}}>
					<AttachMoney />
				</div> : (value === "eth" ?
				<img src="/img/parts/ether.png" alt="ether" width="40px" height="40px" style={{borderRadius: "50%"}} /> :
				<img src="/img/parts/solana.svg" alt="solana" width="40px" height="40px" style={{borderRadius: "50%"}} />)
			}
		</div>
		<div style={{color: "black", fontWeight: "bold", paddingLeft: "10px"}}>{label}</div>
	</div>
);

export default formatMoneyOptionLabel;
