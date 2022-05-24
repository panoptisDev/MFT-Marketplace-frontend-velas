import { ShareOutlined, Link as LinkIcon } from '@material-ui/icons';

// material-ui components
import './itemDetail.scss'
import Button from "components/customButtons/Button";
import { Link } from "react-router-dom";
import { bidOnAuction, delistItem, finalizeAuction } from 'utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PlaceBid from 'pages/sale/PlaceBid';
import { ethers } from 'ethers';

const ItemDetail = (props) => {
	const { item, fetchItem } = props;

	const { account, active, chainId, library} = useWeb3React();
	const [ balance, setBalance] = useState(0)
	const [ showPlaceBidModal, setShowPlaceBidModal] = useState(false);
	const [ bidPrice, setBidPrice ] = useState(0);
	useEffect(() => {
		console.log(item.auction);
		console.log(account);
		fetchBalance();
	}, [account, chainId, library])

	const fetchBalance = useCallback(async () => {
		if (!!account && !!library) {
			const rawBalance = await library.getBalance(account);
			const value = parseFloat(ethers.utils.formatEther(rawBalance));
			setBalance(value);         
		}
		return () => {
			setBalance(0)
		}
	},[]);

	const onSell = () => {
		props.history.push({
			pathname: `/item/${item.itemCollection}/${item.tokenId}/sell`,
			state: { item: item }
		})
		return;
	}
	const [isLoading, setIsLoading] = useState(false);
	const onCancelListing = () => {
		setIsLoading(true);
		const load_toast_id = toast.loading("Please wait");
		if (item.pair){
			delistItem(
				item.pair.id,
				chainId,
				library.getSigner()
			).then((res) => {
				if (res) {
					axios.get(`/sync_block`)
						.then((res) => {
							setIsLoading(false);
							toast.dismiss(load_toast_id);
							toast.success("Listing cancelled successfully");
						})
						.catch((err) => {
							toast.dismiss(load_toast_id);
							toast.error("Unlisting failed")
						});
				} else {
					toast.dismiss(load_toast_id);
					toast.error("Unlisting failed")
				}
			});
		}else if (item.auction){
			finalizeAuction(
				item.auction.id,
				chainId,
				library.getSigner()
			).then((res) => {
				if (res) {
					axios.get(`/sync_block`)
						.then((res) => {
							setIsLoading(false);
							toast.dismiss(load_toast_id);
							toast.success("Listing cancelled successfully");
						})
						.catch((err) => {
							toast.dismiss(load_toast_id);
							toast.error("Unlisting failed")
						});
				} else {
					toast.dismiss(load_toast_id);
					toast.error("Unlisting failed")
				}
			});
		}
		
	}

	function onPlaceBidModal() {
		if (item.auction.owner.toLowerCase() === account.toLowerCase()){
			toast.error("You are owner of this item.");
			return
		}
		setShowPlaceBidModal(true);
	  }
	  function onPlaceBidClose(value) {
		setShowPlaceBidModal(false);
		setBidPrice(value);
	  }

	  function closePlaceBidModal(){
        setShowPlaceBidModal(false)
        setBidPrice(0)
    }

	function submitPlaceBid() {
		
        if ( !(item?.auction.bids) && (bidPrice - item.auction.price  < 0)) {
            toast.error("Your bid must be higher than minimum bid price!")
                        
            return
        }
        
        if ((item?.auction.bids?.length > 0) && (bidPrice - item.auction.price * 1.05  <= 0)){
            toast.error("Your bid must be 5% higher than current bid!")
            return
        }   
        
        if (balance - bidPrice < 0 ){              
            toast.error("Your available balance is less than the bid price!")
            return
        }
        setIsLoading(true)
		const load_toast_id = toast.loading("Placing a bid");
        bidOnAuction(
            account,
            item.auction.id,
            bidPrice,
            chainId,
            library.getSigner()
        ).then((result) => {
            if (result) {
                axios.get(`/sync_block`)
                .then((res) => {
                    setIsLoading(false);
                    closePlaceBidModal()
					toast.dismiss(load_toast_id);
                    toast.success("Placed a Bid Successfully");
                    fetchItem()                    
                    return true;
                })
                .catch((error) => {
                    if (error.response) {
                        setIsLoading(false);
						toast.dismiss(load_toast_id);
                        toast.error(error.response.data.message);    
                    }
                });
            } else {
                setIsLoading(false);
				toast.dismiss(load_toast_id);
                toast.error("Failed Transaction");
            }
        });       
        
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
									<img src="https://s.raregems.io/97/img/chains/velas.svg" width={16} height={16} loading="lazy" alt="" />
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
					{
						item && !item.pair && item.auction && <div className="buy-div">
						<Button className="buyBtn" onClick={() => onPlaceBidModal()}>
							Place Bid
						</Button>
					</div>

					}
					{
						item && !item.pair && !item.auction && <div className="buy-div">
							<Button className="buyBtn" onClick={() => onSell()}>
								Sell
							</Button>
						</div>
					}

					{
						item && item.pair && !item.auction && <div className="buy-div">
							<Button className="buyBtn" onClick={() => onCancelListing()}>
								Cancel Listing
							</Button>
						</div>
					}


				</div>
			</div>
			{showPlaceBidModal && (
				<PlaceBid
					onClose={onPlaceBidClose}
					onSubmit={submitPlaceBid}
					balance={balance}
					nftFee={0}
				/>
      		)}
		</div>
	);
}

export default ItemDetail;
