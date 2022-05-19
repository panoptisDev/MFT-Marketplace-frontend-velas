import {ShareOutlined, Link as LinkIcon} from '@material-ui/icons';

// material-ui components
import './itemDetail.scss'
import Button from "components/customButtons/Button";
import { Link } from "react-router-dom";


const ItemDetail = (props) => {
	const { item } = props;

	const onBid = (val:string) => {
		//	TODO do buy logic
		return;
	}

	return (
		<div className="imageDetail">
			<div className="nftContainer">
			<img src={item.assetUrl} alt="icon"
						 className="detail-img" />
			</div>
			<div className="property-box">
				<div className="property-div">
					<div className="share-div">
						<Link to="/velas/velas-apes-club" className="link-blue">
							velas
						</Link>
						<ShareOutlined className="share-icon" />
					</div>
					<h2 className="billy-header">{item.name}</h2>
					<p className="billy-desc">{item.description}</p>
					<div className="hline"></div>
					<ul className="attrs raw">
						<li>
							<div className="name">BLOCKCHAIN</div>
							<div className="value inline-flex">
								<Link to="/velas/velas-apes-club" className="link-blue">
									<img src="https://s.raregems.io/97/img/chains/velas.svg" width={16} height={16} loading="lazy" alt = ""/>
									<span className="m-l-4">Velas</span>
								</Link>
							</div>
						</li>
						<li>
							<div className="name">CONTRACT ADDR</div>
							<div className="value text-white">
								{item.owner}
							</div>
						</li>
						<li>
							<div className="name">STANDARD</div>
							<div className="value text-white">
								ERC721
							</div>
						</li>
						<li>
							<div className="name">TOKEN ID</div>
							<div className="value text-white">
								{item.tokenId}
							</div>
						</li>
						<li>
							<div className="name">OWNER</div>
							<div className="value link-blue">
								{item.owner}
							</div>
						</li>
						<li>
							<div className="name">EXTERNAL URL</div>
							<div className="value link-blue inline-flex">
								{item.external_link}<LinkIcon />
							</div>
						</li>
					</ul>
					<div className="hline"></div>
					<h2 className="billy-header">
						Attributes<span className="text-green m-l-1em">Rarity Score: 35</span>
					</h2>
					<ul className="attrs raw">
						<li className="with-border">
							<div className="name">background</div>
							<div className="value text-white">Green</div>
						</li>
						<li className="with-border">
							<div className="name">fur</div>
							<div className="value text-white">Light_Brown</div>
						</li>
						<li className="with-border">
							<div className="name">body</div>
							<div className="value text-white">Dog</div>
						</li>
						<li className="with-border">
							<div className="name">mouth</div>
							<div className="value text-white">Normal</div>
						</li>
						<li className="with-border">
							<div className="name">eyes</div>
							<div className="value text-white">Small</div>
						</li>
						<li className="with-border">
							<div className="name">suit</div>
							<div className="value text-white">Blue_Suit</div>
						</li>
					</ul>
					<h2 className="billy-header with-border-bottom">Transfer History</h2>
					<div className="hline"></div>
					<span className="hover-blue">@ block #14773518: 0x0000…0000 ➞ 0xc501…776F </span>
					<div className="buy-div">
						<Button
							className="buyBtn"
							onClick={()=>onBid("injected")}
						>
							Bid
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ItemDetail;
