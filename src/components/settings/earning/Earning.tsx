
// style
import './earning.scss'

export default function Offer() {

	return (
		<div className="settingContainer">
			<h2>
				Earnings
			</h2>
			<br />
			<div>
				To access your 2021 Creator Earnings from NFT sales with this wallet using OpenSea, see below.
			</div>
			<br />
			<div>
				As a reminder, you are solely responsible for validating this information and determining what,
				if any, taxes apply to your NFT sales and/or creator earnings. OpenSea cannot determine for
				you what taxes you owe. For any questions, please reach out to
				<a target={'_blank'}rel="noreferrer" href={'mailto:creatorearnings@opensea.io'} className="ALink">&nbsp;creatorearnings@opensea.io.</a>
			</div>
			<br />
			<div>
				Note - this report does not include earnings from NFT sales where you are not the creator,
				and does not include fees earned on
				<a target={'_blank'}rel="noreferrer" href={'https://polygonscan.com/exportData?type=address&a=0x2c7af865dc845ccca1b3d4f64229811d498cbfba'} className="ALink">&nbsp;Polygon</a> or Klaytn. For information on your other
				OpenSea activity, refer to the <a target={'_blank'} rel="noreferrer"href={'/account?tab=activity'} className="ALink">&nbsp;Activity tab</a>.
			</div>
			<br/>
			<div className="textBox">
				This wallet address does not have any creator earnings from sales using OpenSea in 2021.
			</div>
		</div>
	);
}

Offer.propTypes = {};
