import {  ShareOutlined, ExpandLess, LocalLibrary } from '@material-ui/icons';
import {Loupe, ViewList, MoreVert, Refresh, Visibility, Favorite, Loyalty, ExpandMore, Timeline, List, Description} from '@material-ui/icons';
import TaskIcon from '@mui/icons-material/Task';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AssessmentIcon from '@mui/icons-material/Assessment';
// import LoupeIcon from '@mui/icons-material/Loupe';
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
import Select from "react-select";
import Expand from "react-expand-animated";
import FormatsortOptionLabel from './FormatsortOptionLabel';
import MakeOffer from 'pages/sale/MakeOffer';
import ReactPlayer from 'react-player';
import SellPage from 'pages/sale/SellPage';
import ListItemSalePage from 'pages/sale/ListItemSalePage';
import CancelListPage from 'pages/sale/CancelListPage';

const ItemDetail = (props) => {
	const { item, fetchItem } = props;

	const { account, chainId, library } = useWeb3React();
	const [balance, setBalance] = useState(0)
	const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
	const [bidPrice, setBidPrice] = useState(0);
	useEffect(() => {
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
	}, []);

	const onSell = () => {
		// props.history.push({
		// 	pathname: `/item/${item.itemCollection}/${item.tokenId}/sell`,
		// 	state: { item: item }
		// })
		// return;
	}
	


	const [isLoading, setIsLoading] = useState(false);
	const onCancelListing = () => {
		setIsLoading(true);
		const load_toast_id = toast.loading("Please wait");
		if (item.pair) {
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
		} else if (item.auction) {
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
		if (item.auction.owner.toLowerCase() === account.toLowerCase()) {
			toast.error("You are owner of this item.");
			return
		}
		setShowPlaceBidModal(true);
	}
	function onPlaceBidClose(value) {
		setShowPlaceBidModal(false);
		setBidPrice(value);
	}
	


	function closePlaceBidModal() {
		setShowPlaceBidModal(false)
		setBidPrice(0)
	}

	function submitPlaceBid() {

		if (!(item?.auction.bids) && (bidPrice - item.auction.price < 0)) {
			toast.error("Your bid must be higher than minimum bid price!")

			return
		}

		if ((item?.auction.bids?.length > 0) && (bidPrice - item.auction.price * 1.05 <= 0)) {
			toast.error("Your bid must be 5% higher than current bid!")
			return
		}

		if (balance - bidPrice < 0) {
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

	const [isPriceExpand, setIsPriceExpand] = useState(false)
	const [isListExpand, setIsListExpand] = useState(false)
	const styles = {
        open: { width: "100%" },
        close: { width: "100%" }
    };
    const transitions = ["height", "opacity", "background"];
	const options = [
		{ value: "1d", label: "1 day", customAbbreviation: "1d" },
		{ value: "2d", label: "2 days", customAbbreviation: "2d" },
		{ value: "3d", label: "3 days", customAbbreviation: "3d" },
		{ value: "7d", label: "7 days", customAbbreviation: "7d" },
		{ value: "1m", label: "Bundles", customAbbreviation: "1m" },
	];
	// Make Offer
	const [showOfferModal, setShowOfferModal] = useState(false);
	const [offerPrice, setOfferPrice] = useState(0);
	function onMakeOfferClose(value:number) {
		setShowOfferModal(false);
		setOfferPrice(value)
		console.log(offerPrice)
	}
	function submitOffer(value:number) {
		setOfferPrice(value)
		console.log(value)
	}
	// Sell page
	const [showSellModal, setShowSellModal] = useState(false);
	function onSellClose(value:number) {
		setShowSellModal(false);
		console.log(offerPrice)
	}
	// Listing
	const [showListingModal, setShowListingModal] = useState(false);
	function onListingClose(value:number) {
		setShowListingModal(false);
		console.log(offerPrice)
	}
	// Cancel Listing
	const [showCancelListingModal, setShowCancelListingModal] = useState(false);
	function onCancelListingClose(value:number) {
		setShowCancelListingModal(false);
		console.log(offerPrice)
	}

	// About 
	const [isAboutExpand, setIsAboutExpand] = useState(false)
	const [isDetailExpand, setIsDetailExpand] = useState(false)
	const [isLocalExpand, setIsLocalExpand] = useState(false)
	const [isPropertyExpand, setIsPropertyExpand] = useState(false)
	const [isStatsExpand, setIsStatsExpand] = useState(false)
	const [isLevelExpand, setIsLevelExpand] = useState(false)
	return (
		<div className="imageDetail">
			<div className="nftContainer">
				<div className="imgContaner">
					{item && (item.assetType === 'video' || item.assetType === 'audio')&& 
					<ReactPlayer width="100%" height="100%" url={item.assetUrl}
					playing={ true } controls />
					}
					{item && item.assetType === 'image' && <img src={item.assetUrl} alt="icon" className="detail-img" />}
				</div>
				<div className="col-div br-div">
					<h2 className="billy-header"><Description/> Description</h2>
					<div className="hline"></div>
					<p className="billy-desc">Created by <a href="https://testnets.opensea.io/0x5367b4557D29cE1Ce3F333Ba1ad155d6A1754C68" target={'_blank'} className="billy-desc">5367B4</a></p>
					<p className="billy-desc">{item.description}</p>
					<div className="hline"></div>
						<div className="row-div cursor-pointer s-b m-b" onClick={()=>{setIsAboutExpand(!isAboutExpand)}}>
							<h2 className="billy-header"><ViewList/> About Boatsail NFT V2</h2>
							<h2 className="billy-header">{!isAboutExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						
						</div>
						<Expand
                                open={isAboutExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc">
									<p className="billy-desc">This collection has no description yet. Contact the owner of this collection about setting it up on OpenSea!</p>
								</div>
						</Expand>
						<div className="row-div cursor-pointer s-b mt-1" onClick={()=>{setIsDetailExpand(!isDetailExpand)}}>
							<h2 className="billy-header"><Loupe/> Details</h2>
							<h2 className="billy-header">{!isDetailExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						</div>
						<Expand
                                open={isDetailExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc">
									<div className="row-div cursor-pointer s-b">
										<p>Contract Address</p>
										<a href="https://testnets.opensea.io/0x5367b4557D29cE1Ce3F333Ba1ad155d6A1754C68" target={'_blank'} rel="noreferrer"className="billy-desc">0xb170...8508</a>
									</div>
									<div className="row-div cursor-pointer s-b">
										<p>Token ID</p>
										<p>2</p>
									</div>
									<div className="row-div cursor-pointer s-b">
										<p>Token Standard</p>
										<p>ERC-721</p>
									</div>
									<div className="row-div cursor-pointer s-b">
										<p>Blockchain</p>
										<p>Rinkeby</p>
									</div>
									<div className="row-div cursor-pointer s-b">
										<p>Creator Fees</p>
										<p>0%</p>
									</div>
								</div>
						</Expand>
						<div className="hline"></div>

						<div className="row-div cursor-pointer s-b mt-1" onClick={()=>{setIsPropertyExpand(!isPropertyExpand)}}>
							<h2 className="billy-header"><TaskIcon/> Properties</h2>
							<h2 className="billy-header">{!isPropertyExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						</div>
						<Expand
                                open={isPropertyExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc w-100">
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
								</div>
						</Expand>
						<div className="hline"></div>
						<div className="row-div cursor-pointer s-b mt-1" onClick={()=>{setIsStatsExpand(!isStatsExpand)}}>
							<h2 className="billy-header"><SettingsApplicationsIcon/> Stats</h2>
							<h2 className="billy-header">{!isStatsExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						</div>
						<Expand
                                open={isStatsExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc">
										<p>Stats</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum obcaecati numquam nihil quasi dolor possimus similique accusamus nam sequi quo repellat aliquid ullam fugit nemo, quae et! Aut, consequatur totam!</p>
								</div>
						</Expand>
						<div className="hline"></div>
						<div className="row-div cursor-pointer s-b mt-1" onClick={()=>{setIsLevelExpand(!isLevelExpand)}}>
							<h2 className="billy-header"><AssessmentIcon/> Level</h2>
							<h2 className="billy-header">{!isLevelExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						</div>
						<Expand
                                open={isLevelExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc">
										<p>Stats</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum obcaecati numquam nihil quasi dolor possimus similique accusamus nam sequi quo repellat aliquid ullam fugit nemo, quae et! Aut, consequatur totam!</p>
								</div>
						</Expand>
						<div className="hline"></div>
						<div className="row-div cursor-pointer s-b mt-1" onClick={()=>{setIsLocalExpand(!isLocalExpand)}}>
							<h2 className="billy-header"><LocalLibrary/> Localable Content</h2>
							<h2 className="billy-header">{!isLocalExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						</div>
						<Expand
                                open={isLocalExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
								<div className="col-div aic jcc">
										<p>Locakable Content</p>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum obcaecati numquam nihil quasi dolor possimus similique accusamus nam sequi quo repellat aliquid ullam fugit nemo, quae et! Aut, consequatur totam!</p>
								</div>
						</Expand>

				</div>
				
				
			</div>
			<div className="property-box">
				<div className="property-div">
					<div className="share-div">
						<Link to="/velas/velas-apes-club" className="link-blue">
							velas
						</Link>
						<div className="share-icons">
						<Refresh className="share-icon"/>
						<ShareOutlined className="share-icon" />
						<MoreVert className="share-icon"/>
						</div>
						
					</div>
					<h2 className="billy-header">{item.name}</h2>
					<div className="row-div">
						
						<p className="billy-desc">Owned by <a href="https://testnets.opensea.io/0x5367b4557D29cE1Ce3F333Ba1ad155d6A1754C68" target={'_blank'} rel="noreferrer"className="billy-desc">5367B4</a></p>
						<p className="billy-desc"><Visibility/> 12 views</p>
						<p className="billy-desc hover-blue"><Favorite/> 1 favorite</p>
					</div>
					<div className="hline"></div>
					<div className="col-div br-div">
						<p className="billy-desc m-b-5">Highest offer</p>
						<div className="row-div m-b-5">
							<h2 className="billy-header">0.01</h2>
							<p className="billy-desc">($ 20.23)</p>
						</div>
						<div className="row-div">
						{
							item && item.owner.toLowerCase() !== account.toLowerCase() && item.pair &&
							<Button className="outLineBtn" onClick={() => setShowOfferModal(true)}>
								<Loyalty/> Make Offer
							</Button>
						}
						{
							item && item.owner.toLowerCase() !== account.toLowerCase() && !item.pair && item.auction && 
								<Button className="outLineBtn" onClick={() => onPlaceBidModal()}>
									Place Bid
								</Button>
						}
						{
							item && item.owner.toLowerCase() === account.toLowerCase() && !item.pair && !item.auction && 
								<Button className="outLineBtn" onClick={() => setShowListingModal(true)}>
									Sell
								</Button>
						}

						{
							item && item.owner.toLowerCase() === account.toLowerCase() && item.pair && !item.auction && 
								<Button className="outLineBtn" onClick={() => setShowCancelListingModal(true)}>
									Cancel Listing
								</Button>
						}
						</div>
					</div>
					<div className="hline"></div>
					<div className="col-div p-t-10 p-b-10">
						<div className="row-div cursor-pointer s-b" onClick={()=>{setIsPriceExpand(!isPriceExpand)}}>
						<h2 className="billy-header"><Timeline/> Price History</h2>
						<h2 className="billy-header">{!isPriceExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						
						</div>
						<Expand
                                open={isPriceExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
                               
							   <div className="col-div p-t-10 p-b-10">
								<Select
									defaultValue={options[0]}
									formatOptionLabel={FormatsortOptionLabel}
									options={options}
									instanceId='chainSelect'
									className="select-gray flex-1 m-r-5"
								/>
								<div className="col-div aic jcc">
									<img src="/assets/no-chart-data.svg" alt="" />
									<p className="billy-desc">No item activity yet</p>
								</div>
									
							   </div>
                            </Expand>
					</div>
					<div className="hline"></div>

					<div className="col-div p-t-10 p-b-10">
						<div className="row-div cursor-pointer s-b" onClick={()=>{setIsListExpand(!isListExpand)}}>
						<h2 className="billy-header"><List/> Listings</h2>
						<h2 className="billy-header">{!isListExpand ? <ExpandMore/>:<ExpandLess/>}</h2>
						
						</div>
						<Expand
                                open={isListExpand}
                                duration={300}
                                styles={styles}
                                transitions={transitions}
                            >
                               
							   <div className="col-div p-t-10 p-b-10">
								
								<div className="col-div aic jcc">
									<img src="/assets/empty-asks.svg" alt="" />
									<p className="billy-desc">No listings yet</p>
								</div>
									
							   </div>
                            </Expand>
					</div>
					<div className="hline"></div>
					<h2 className="billy-header with-border-bottom">Transfer History</h2>
					<div className="hline"></div>
					<span className="hover-blue">@ block #14773518: 0x0000…0000 ➞ 0xc501…776F </span>
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

			{showOfferModal&& (
				<MakeOffer
					onClose={onMakeOfferClose}
					onSubmit={submitOffer}
					balance={balance}
					nftFee={0}
				/>
			)}
			{showSellModal && (
				<SellPage
					onClose={onSellClose}
					onSubmit={onSell}
					balance={balance}
					nftFee={0}
				/>
			)}
			{showListingModal && item && (
				<ListItemSalePage
					onClose={onListingClose}
					onSubmit={onCancelListing}
					balance={balance}
					nftFee={0}
					item={item}
				/>
			)}
			{showCancelListingModal && (
				<CancelListPage
					onClose={onCancelListingClose}
					onSubmit={onCancelListingClose}
					balance={balance}
					nftFee={0}
				/>
			)}
		</div>
	);
}

export default ItemDetail;
