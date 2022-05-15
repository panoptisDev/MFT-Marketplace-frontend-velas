
// material-ui components
import Select from "react-select";
import FormatOptionLabelToken from "../item/FormatOptionLabelToken";


const options = [
	{ value: "dai", label: "DAI", customAbbreviation: "Ethereum" },
	{ value: "ash", label: "ASH", customAbbreviation: "Ethereum" },
	{ value: "bat", label: "BAT", customAbbreviation: "Ethereum" },
];

const tokenItemStyle = {
	display: "flex",
	alignItems: "center",
	background: "transparent",
	border: '1px solid #fff',
	margin: '1px 6px 6px 1px',
	borderRadius: '5px',
	padding: '8px 13px 8px 13px'
}

const removeIconStyle = {
	display: 'flex',
	alignItems: 'center',
	marginLeft: '15px',
	background: 'none',
	fontSize: '20px',
	border: 'none',
	cursor: 'pointer',
}

const tokenGroupStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	margin: '10px 0'
}

export default function CreateCollection() {
	return (
		<div className={'formControl'}>
			<h4><strong>Payment tokens</strong></h4>
			<p>These tokens can be used to buy and sell your items.</p>
			<div style={ tokenGroupStyle } >
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/assets/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#fff !important'}}>
							<p style={{fontWeight: "bold", color: '#ffffff !important', marginBottom : 0}}>ETH</p>
							<p style={{color: '#dddddd !important', marginBottom : 0}}>
								Ethereum
							</p>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/assets/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
                            <p style={{fontWeight: "bold", color: '#ffffff !important', marginBottom : 0}}>ETH</p>
                            <p style={{color: '#dddddd !important', marginBottom : 0}}>
								Ethereum
							</p>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/assets/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
                            <p style={{fontWeight: "bold", color: '#ffffff !important', marginBottom : 0}}>ETH</p>
							<p style={{color: '#dddddd !important', marginBottom : 0}}>
								Ethereum
							</p>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
				<div style={tokenItemStyle}>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img src={'/assets/img/tokens/eth.svg'} alt="eth" width="25px"
								 height="25px" style={{borderRadius: "50%"}} />
						</div>
						<div style={{display: "flex", flexDirection: "column", marginLeft: "10px", color: '#ffffff !important'}}>
                            <p style={{fontWeight: "bold", color: '#ffffff !important', marginBottom : 0}}>ETH</p>
                            <p style={{color: '#dddddd !important', marginBottom : 0}}>
                                    Ethereum
                                </p>
						</div>
					</div>
					<button style={ removeIconStyle }>
						&times;
					</button>
				</div>
			</div>

			<Select
				defaultValue={options[0]}
				formatOptionLabel={FormatOptionLabelToken}
				options={options}
				className="mySelect"
				instanceId='tokenSelect'
			/>
		</div>
	);
}

CreateCollection.propTypes = {};
