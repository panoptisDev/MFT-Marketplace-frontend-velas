import { ShareOutlined, ExpandLess, LocalLibrary } from '@material-ui/icons';
import { Loupe, ViewList, MoreVert, Refresh, Visibility, Favorite, Loyalty, ExpandMore, Timeline, List, Description } from '@material-ui/icons';
import TaskIcon from '@mui/icons-material/Task';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AssessmentIcon from '@mui/icons-material/Assessment';
// import LoupeIcon from '@mui/icons-material/Loupe';
// material-ui components
import './itemDetail.scss'
import Button from "components/customButtons/Button";

import { Link } from "react-router-dom";
import { bidOnAuction, buy, delistItem, finalizeAuction } from 'utils/contracts';
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
import ListItemSalePage from 'pages/sale/ListItemSalePage';
import CancelListPage from 'pages/sale/CancelListPage';

const ItemDetail = (props) => {
	const { item, fetchItem } = props;

	const { connector, library, chainId, account, active } = useWeb3React();
	const [loginStatus, setLoginStatus] = useState(false);
	useEffect(() => {
		const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
		setLoginStatus(isLoggedin);
	}, [connector, library, account, active, chainId]);

	const [balance, setBalance] = useState(0)
	const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
	const [bidPrice, setBidPrice] = useState(0);
	useEffect(() => {
		if (loginStatus) fetchBalance();
	}, [loginStatus])

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
							window.location.reload();
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
							window.location.reload();
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
		if (loginStatus) {
			toast.error("Please connect your wallet.")
			return;
		}
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

	function submitPlaceBid(bid_price: number) {
		setBidPrice(bid_price);
		if (!(item?.auction.bids) && (bid_price - item.auction.price < 0)) {
			toast.error("Your bid must be higher than minimum bid price!")

			return
		}

		if ((item?.auction.bids?.length > 0) && (bid_price - item.auction.price * 1.05 <= 0)) {
			toast.error("Your bid must be 5% higher than current bid!")
			return
		}

		if (balance < bid_price) {
			toast.error("Your available balance is less than the bid price!")
			return
		}
		setIsLoading(true)
		const load_toast_id = toast.loading("Placing a bid");
		bidOnAuction(
			account,
			item.auction.id,
			bid_price,
			chainId,
			library.getSigner(),
			balance
		).then((result) => {
			if (result) {
				axios.get(`/sync_block`)
					.then((res) => {
						setIsLoading(false);
						closePlaceBidModal()
						window.location.reload();
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
	const [isEventExpand, setIsEventExpand] = useState(false)
	const [isBidExpand, setIsBidExpand] = useState(false)
	const [isOfferExpand, setIsOfferExpand] = useState(false)
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
	function onMakeOfferClose(value: number) {
		setShowOfferModal(false);
		setOfferPrice(value)
		console.log(offerPrice)
	}
	function submitOffer(value: number) {
		setOfferPrice(value)
		console.log(value)
	}
	// Sell page
	const [showSellModal, setShowSellModal] = useState(false);
	function onSellClose(value: number) {
		setShowSellModal(false);
		console.log(offerPrice)
	}
	// Listing
	const [showListingModal, setShowListingModal] = useState(false);
	function onListingClose(isListed: boolean) {
		setShowListingModal(false);
		if (isListed) fetchItem()
	}
	// Cancel Listing
	const [showCancelListingModal, setShowCancelListingModal] = useState(false);
	function onCancelListingClose(value: number) {
		setShowCancelListingModal(false);
	}

	//Buy Now
	const [showBuyModal, setShowBuyModal] = useState(false);
	function onBuyClose() {
		setShowBuyModal(false);
	}

	function submitBuy() {
		if (loginStatus) {
			toast.error("Please connect your wallet.");
			return;
		}
		if (!item.pair) {
			console.log("Item Buy is disabled");
			return;
		}
		if (balance < item.pair.price) {
			toast.error("Your available balance is less than the price!");
			return;
		}
		setIsLoading(true);
		const load_toast_id = toast.loading("Please wait...");
		buy(
			account,
			item.pair.id,
			item.pair.price,
			chainId,
			library.getSigner()
		).then((tokenId) => {
			if (tokenId) {
				axios.get(`/api/sync_block`)
					.then((res) => {
						setIsLoading(false);
						setShowBuyModal(false)
						toast.dismiss(load_toast_id);
						toast.success("Bought Successfully");
						window.location.reload();
						return true;
					})
					.catch((error) => {
						if (error.response) {
							toast.dismiss(load_toast_id);
							toast.error("Failed Transaction");
							setIsLoading(false);
							setShowBuyModal(false);
						}
					});
			} else {
				toast.dismiss(load_toast_id);
				toast.error("Failed Transaction");
				setIsLoading(false);
				setShowBuyModal(false);
			}
		});
	}

	//Accept Bid
	const onBidAccept = (bid: any) => {
		// The logic to accept bid.
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
					{(item.assetType === 'video' || item.assetType === 'audio') &&
						<ReactPlayer width="100%" height="100%" url={item.assetUrl}
							playing={true} controls />
					}
					{item.assetType === 'image' && <img src={item.assetUrl} alt="icon" className="detail-img" />}
				</div>
				<div className="col-div br-div">
					<h2 className="billy-header"><Description /> Description</h2>
					<div className="hline"></div>
					<p className="billy-desc">Created by
						<a href='' target="_blank" rel="noopener noreferrer" className="billy-desc">
							{loginStatus && item.creator.toLowerCase() === account.toLowerCase() ? "You" : String(item.creator).substring(2, 7).toUpperCase()}
						</a>
					</p>
					<p className="billy-desc">{item.description}</p>
					<div className="hline"></div>
					<div className="row-div cursor-pointer s-b m-b" onClick={() => { setIsAboutExpand(!isAboutExpand) }}>
						<h2 className="billy-header"><ViewList /> About {item.collection && item.collection.name}</h2>
						<h2 className="billy-header">{!isAboutExpand ? <ExpandMore /> : <ExpandLess />}</h2>

					</div>
					<Expand
						open={isAboutExpand}
						duration={300}
						styles={styles}
						transitions={transitions}
					>
						<div className="col-div aic jcc">
							<p className="billy-desc">{item.collection && item.collection.description}</p>
						</div>
					</Expand>
					<div className="row-div cursor-pointer s-b mt-1" onClick={() => { setIsDetailExpand(!isDetailExpand) }}>
						<h2 className="billy-header"><Loupe /> Details</h2>
						<h2 className="billy-header">{!isDetailExpand ? <ExpandMore /> : <ExpandLess />}</h2>
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
								<a href="https://testnets.opensea.io/0x5367b4557D29cE1Ce3F333Ba1ad155d6A1754C68" target={'_blank'} rel="noreferrer" className="billy-desc">
									{item.itemCollection}
									{/* TODO truncate string */}
								</a>
							</div>
							<div className="row-div cursor-pointer s-b">
								<p>Token ID</p>
								<p>{item.tokenId}</p>
							</div>
							<div className="row-div cursor-pointer s-b">
								<p>Token Standard</p>
								<p>ERC-721</p>
							</div>
							<div className="row-div cursor-pointer s-b">
								<p>Blockchain</p>
								<p>Velas</p>
							</div>
							<div className="row-div cursor-pointer s-b">
								<p>Creator Fees</p>
								<p>{item.royalty}</p>
							</div>
						</div>
					</Expand>
					<div className="hline"></div>

					<div className="row-div cursor-pointer s-b mt-1" onClick={() => { setIsPropertyExpand(!isPropertyExpand) }}>
						<h2 className="billy-header"><TaskIcon /> Properties</h2>
						<h2 className="billy-header">{!isPropertyExpand ? <ExpandMore /> : <ExpandLess />}</h2>
					</div>
					<Expand
						open={isPropertyExpand}
						duration={300}
						styles={styles}
						transitions={transitions}
					>
						<div className="col-div aic jcc w-100">
							{
								item.properties && item.properties.length > 0 ?
									<div>
										{item.properties.map((property, key) => {
											return <li key={key} className="with-border">
												<div className="name">{property.type}</div>
												<div className="value text-white">{property.name}</div>
											</li>
										})}

									</div> : <div />
							}
						</div>
					</Expand>
					<div className="hline"></div>
					<div className="row-div cursor-pointer s-b mt-1" onClick={() => { setIsStatsExpand(!isStatsExpand) }}>
						<h2 className="billy-header"><SettingsApplicationsIcon /> Stats</h2>
						<h2 className="billy-header">{!isStatsExpand ? <ExpandMore /> : <ExpandLess />}</h2>
					</div>
					<Expand
						open={isStatsExpand}
						duration={300}
						styles={styles}
						transitions={transitions}
					>
						<div className="col-div aic jcc w-100">
							{
								item.stats && item.stats.length > 0 ?
									<div>
										{item.stats.map((stat, key) => {
											return <li key={key} className="with-border">
												<div className="name">{stat.name}</div>
												<div className="value text-white">{stat.value}</div>
												<div className="value text-white">{stat.total}</div>
											</li>
										})}

									</div> : <div />
							}
						</div>
					</Expand>
					<div className="hline"></div>
					<div className="row-div cursor-pointer s-b mt-1" onClick={() => { setIsLevelExpand(!isLevelExpand) }}>
						<h2 className="billy-header"><AssessmentIcon /> Level</h2>
						<h2 className="billy-header">{!isLevelExpand ? <ExpandMore /> : <ExpandLess />}</h2>
					</div>
					<Expand
						open={isLevelExpand}
						duration={300}
						styles={styles}
						transitions={transitions}
					>
						<div className="col-div aic jcc w-100">
							{
								item.levels && item.levels.length > 0 ?
									<div>
										{item.levels.map((level, key) => {
											return <li key={key} className="with-border">
												<div className="name">{level.name}</div>
												<div className="value text-white">{level.value}</div>
												<div className="value text-white">{level.total}</div>
											</li>
										})}

									</div> : <div />
							}
						</div>
					</Expand>
					{
						item.lockContent === "" ? <div /> : <div>
							<div className="hline"></div>
							<div className="row-div cursor-pointer s-b mt-1" onClick={() => { setIsLocalExpand(!isLocalExpand) }}>
								<h2 className="billy-header"><LocalLibrary /> Lockable Content</h2>
								<h2 className="billy-header">{!isLocalExpand ? <ExpandMore /> : <ExpandLess />}</h2>
							</div>
							<Expand
								open={isLocalExpand}
								duration={300}
								styles={styles}
								transitions={transitions}
							>
								<div className="col-div aic jcc">
									<p>{item.lockContent}</p>
								</div>
							</Expand>

						</div>
					}

				</div>


			</div>
			<div className="property-box">
				<div className="property-div">
					<div className="share-div">
						<Link to="/velas/velas-apes-club" className="link-blue">
							VELAS
						</Link>
						<div className="share-icons">
							<Refresh onClick={() => { window.location.reload() }} className="share-icon" />
							<ShareOutlined className="share-icon" />
							<MoreVert className="share-icon" />
						</div>

					</div>
					<h2 className="billy-header">{item.name}</h2>
					<div className="row-div">

						<p className="billy-desc">Owned by
							<a href='' target="_blank" rel="noopener noreferrer" className="billy-desc">
								{loginStatus && item.ownerUser && item.ownerUser.address.toLowerCase() === account.toLowerCase() ? "You" :
									String(item.ownerUser && item.ownerUser.address).substring(2, 7).toUpperCase()}
							</a>
						</p>
						<p className="billy-desc"><Visibility /> 12 views</p>
						<p className="billy-desc hover-blue"><Favorite /> 1 favorite</p>
					</div>
					{
						loginStatus && item.auction && <div>
							<div className="hline"></div>
							<div className="col-div br-div">
								Sales ends {item.auction && new Date(parseFloat(item.auction.endTime) * 1000).toLocaleString('en-US', { timeZone: 'America/New_York' })}
							</div>
						</div>
					}

					<div className="hline"></div>
					<div className="col-div br-div">
						{
							loginStatus && item.auction && <div>
								<p className="billy-desc m-b-5">Highest Bid</p>
								<div className="row-div m-b-5">
									<h2 className="billy-header">{item.auction && item.auction.price} VLX</h2>
									{/* <p className="billy-desc">($ 20.23)</p> */}
								</div>
							</div>
						}

						<div className="row-div">
							{/* {
								item.pair && item.pair.owner.toLowerCase() !== account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowOfferModal(true)}>
									<Loyalty /> Make Offer
								</Button>
							} */}
							{
								loginStatus && item.pair && item.pair.owner.toLowerCase() !== account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowBuyModal(true)}>
									<Loyalty /> Buy Now
								</Button>
							}
							{
								loginStatus && !item.pair && item.auction && item.auction.owner.toLowerCase() !== account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => onPlaceBidModal()}>
									Place Bid
								</Button>
							}
							{
								loginStatus && !item.pair && !item.auction && item.owner.toLowerCase() === account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowListingModal(true)}>
									Sell
								</Button>
							}
							{
								loginStatus && item.pair && !item.auction && item.pair.owner.toLowerCase() === account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowCancelListingModal(true)}>
									Cancel Selling
								</Button>
							}
							{
								loginStatus && !item.pair && item.auction && item.auction.owner.toLowerCase() === account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowCancelListingModal(true)}>
									Cancel Auction
								</Button>
							}
						</div>
					</div>
					<div className="hline"></div>
					<div className="col-div p-t-10 p-b-10">
						<div className="row-div cursor-pointer s-b" onClick={() => { setIsEventExpand(!isEventExpand) }}>
							<h2 className="billy-header"><Timeline />Item Activity</h2>
							<h2 className="billy-header">{!isEventExpand ? <ExpandMore /> : <ExpandLess />}</h2>

						</div>
						<Expand
							open={isEventExpand}
							duration={300}
							styles={styles}
							transitions={transitions}
						>

							<div className="col-div p-t-10 p-b-10">
								{item.events.length > 0 ?
									<div className="col-div aic jcc">
										<div>Event</div>
										<div>Price</div>
										<div>From</div>
										<div>To</div>
										<div>Date</div>
										{
											item.events.map((event, key) => {
												return <div key={key}>
													<div>{event.name}</div>
													<div>{/* //ethereum icon*/}{event.price}ETH</div>
													<div>{event.from === account && loginStatus ? "You" : String(event.from).substring(2, 7).toUpperCase()}</div>
													<div>{event.to === account && loginStatus ? "You" : String(event.to).substring(2, 7).toUpperCase()}</div>
													<div>{Math.floor(new Date().getTime() / 1000) - parseFloat(event.timestamp)} days ago</div>
													{/* this can be seconds ago, mins ago, hours ago, or days ago */}
												</div>
											})
										}
									</div> :
									<div className="col-div aic jcc">
										<img src="/assets/no-chart-data.svg" alt="" />
										<p className="billy-desc">No item activity yet</p>
									</div>
								}


							</div>
						</Expand>
					</div>
					{item.auction &&
						<div>
							<div className="hline"></div>
							<div className="col-div p-t-10 p-b-10">
								<div className="row-div cursor-pointer s-b" onClick={() => { setIsPriceExpand(!isPriceExpand) }}>
									<h2 className="billy-header"><Timeline /> Price History</h2>
									<h2 className="billy-header">{!isPriceExpand ? <ExpandMore /> : <ExpandLess />}</h2>

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
										{item.auction.bids.length > 0 ?
											<div className="col-div aic jcc">
												{
													item.auction.bids.map((bid, key) => {
														console.log(bid.bidPrice) // 0.002
														console.log(bid.timestamp) //ex : 1653574771
														//This should be filtered by above selected date.
														return <div key={key}>
															{/* TODO display graph */}
															{bid.bidPrice}
														</div>
													})
												}
											</div> :
											<div className="col-div aic jcc">
												<img src="/assets/no-chart-data.svg" alt="" />
												<p className="billy-desc">No Price yet</p>
											</div>
										}
									</div>
								</Expand>
							</div>
							<div className="hline"></div>

							<div className="col-div p-t-10 p-b-10">
								<div className="row-div cursor-pointer s-b" onClick={() => { setIsBidExpand(!isBidExpand) }}>
									<h2 className="billy-header"><List /> Bid</h2>
									<h2 className="billy-header">{!isBidExpand ? <ExpandMore /> : <ExpandLess />}</h2>

								</div>
								<Expand
									open={isBidExpand}
									duration={300}
									styles={styles}
									transitions={transitions}
								>
									<div className="col-div p-t-10 p-b-10">
										{
											item.auction && item.auction.bids.length > 0 ?
												<div className="col-div aic jcc">
													{/* //TODO this data display */}
													<div>Price</div>
													<div>Expiration</div>
													<div>From</div>
													{
														item.auction.bids.map((bid, key) => {
															return <div key={key}>
																<div>{bid.bidPrice}</div>
																<div>{Math.ceil((parseFloat(item.auction.endTime) - parseFloat(bid.timestamp)) / (60 * 60 * 24))} days</div>
																<div>{String(bid.from).substring(2, 7).toUpperCase()}</div>
															</div>
														})
													}
												</div> :
												<div className="col-div aic jcc">
													<img src="/assets/empty-asks.svg" alt="" />
													<p className="billy-desc">No Bid yet</p>
												</div>
										}
									</div>
								</Expand>
							</div>
						</div>
					}

				</div>
			</div>
			{showPlaceBidModal && (
				<PlaceBid
					onClose={closePlaceBidModal}
					onSubmit={submitPlaceBid}
					balance={balance}
					nftFee={0}
				/>
			)}

			{showOfferModal && (
				<MakeOffer
					onClose={onMakeOfferClose}
					onSubmit={submitOffer}
					balance={balance}
					nftFee={0}
				/>
			)}

			{showBuyModal && (
				<MakeOffer
					onClose={onBuyClose}
					onSubmit={submitBuy}
					balance={balance}
					nftFee={0}
				/>
			)}
			{showListingModal && (
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
					onSubmit={onCancelListing}
					balance={balance}
					nftFee={0}
				/>
			)}
		</div>
	);
}

export default ItemDetail;


