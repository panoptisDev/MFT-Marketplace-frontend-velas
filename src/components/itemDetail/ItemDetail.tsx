import { ShareOutlined, ExpandLess, LocalLibrary } from "@material-ui/icons";
import { Col, Container, Nav, Row, Tab, Tabs } from "react-bootstrap";
import avt from "../../assets/images/avt-8.jpg";

import Timer from "../../components/timer/Timer";

import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";

import {
  Loupe,
  ViewList,
  MoreVert,
  Refresh,
  Visibility,
  Favorite,
  Loyalty,
  ExpandMore,
  Timeline,
  List,
  Description,
} from "@material-ui/icons";

import TaskIcon from "@mui/icons-material/Task";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssessmentIcon from "@mui/icons-material/Assessment";
// import LoupeIcon from '@mui/icons-material/Loupe';
// material-ui components
import "./itemDetail.scss";
import Button from "../MoreComponents/Button";

import { Link } from "react-router-dom";
import {
  bidOnAuction,
  buy,
  delistItem,
  finalizeAuction,
} from "../../utils/contracts";
import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import PlaceBid from "../../pages/sale/PlaceBid";
import { ethers } from "ethers";
import Select from "react-select";
import Expand from "react-expand-animated";
import FormatsortOptionLabel from "./FormatsortOptionLabel";
import MakeOffer from "../../pages/sale/MakeOffer";
import ReactPlayer from "react-player";
import ListItemSalePage from "../../pages/sale/ListItemSalePage";
import CancelListPage from "../../pages/sale/CancelListPage";
// let data = require("./itemdetailpage_example_data.json");
import { data } from "./itemdetailpage_example_data";

// const OwnedCreatedBy = ({ name, title, styles }: any) => {
//   return (
//     <div className="owned-created-by">
//       <img src={avt} alt="" />
//       <div>
//         <span>{title}</span>
//         <Link to="/">{name}</Link>
//       </div>
//     </div>
//   );
// };

const ItemDetail = (props: any) => {
  const { item, fetchItem } = props;
  console.log(item, "this is ITEM");
  const { connector, library, chainId, account, active }: any = useWeb3React();
  const [loginStatus, setLoginStatus] = useState(false);
  const [oldData, setData] = useState(data);

  console.log(oldData, "This is the right time to prevail");

  let newVariable: any = process.env.REACT_APP_NETWORK_ID;
  useEffect(() => {
    const isLoggedin =
      account && active && chainId === parseInt(newVariable, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const [balance, setBalance] = useState<any>(0);
  const [showPlaceBidModal, setShowPlaceBidModal] = useState<any>(false);
  const [bidPrice, setBidPrice] = useState<any>(0);
  useEffect(() => {
    if (loginStatus) fetchBalance();
  }, [loginStatus]);

  const fetchBalance = useCallback(async () => {
    if (!!account && !!library) {
      const rawBalance = await library.getBalance(account);
      const value = parseFloat(ethers.utils.formatEther(rawBalance));
      setBalance(value);
    }
    return () => {
      setBalance(0);
    };
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const onCancelListing = () => {
    setIsLoading(true);
    const load_toast_id = toast.loading("Please wait");
    if (item.pair) {
      delistItem(item.pair.id, chainId, library.getSigner()).then((res) => {
        if (res) {
          axios
            .get(`/sync_block`)
            .then((res) => {
              setIsLoading(false);
              window.location.reload();
              toast.dismiss(load_toast_id);
              toast.success("Listing cancelled successfully");
            })
            .catch((err) => {
              toast.dismiss(load_toast_id);
              toast.error("Unlisting failed");
            });
        } else {
          toast.dismiss(load_toast_id);
          toast.error("Unlisting failed");
        }
      });
    } else if (item.auction) {
      finalizeAuction(item.auction.id, chainId, library.getSigner()).then(
        (res) => {
          if (res) {
            axios
              .get(`/sync_block`)
              .then((res) => {
                setIsLoading(false);
                window.location.reload();
                toast.dismiss(load_toast_id);
                toast.success("Listing cancelled successfully");
              })
              .catch((err) => {
                toast.dismiss(load_toast_id);
                toast.error("Unlisting failed");
              });
          } else {
            toast.dismiss(load_toast_id);
            toast.error("Unlisting failed");
          }
        }
      );
    }
  };

  function onPlaceBidModal() {
    if (loginStatus) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (item.auction.owner.toLowerCase() === account.toLowerCase()) {
      toast.error("You are owner of this item.");
      return;
    }
    setShowPlaceBidModal(true);
  }

  function onPlaceBidClose(value: any) {
    setShowPlaceBidModal(false);
    setBidPrice(value);
  }
  function closePlaceBidModal() {
    setShowPlaceBidModal(false);
    setBidPrice(0);
  }

  function submitPlaceBid(bid_price: number) {
    setBidPrice(bid_price);
    if (!item?.auction.bids && bid_price - item.auction.price < 0) {
      toast.error("Your bid must be higher than minimum bid price!");

      return;
    }

    if (
      item?.auction.bids?.length > 0 &&
      bid_price - item.auction.price * 1.05 <= 0
    ) {
      toast.error("Your bid must be 5% higher than current bid!");
      return;
    }

    if (balance < bid_price) {
      toast.error("Your available balance is less than the bid price!");
      return;
    }
    setIsLoading(true);
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
        axios
          .get(`/sync_block`)
          .then((res) => {
            setIsLoading(false);
            closePlaceBidModal();
            window.location.reload();
            toast.dismiss(load_toast_id);
            toast.success("Placed a Bid Successfully");
            fetchItem();
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

  const [isPriceExpand, setIsPriceExpand] = useState(false);
  const [isEventExpand, setIsEventExpand] = useState(false);
  const [isBidExpand, setIsBidExpand] = useState(false);
  const [isOfferExpand, setIsOfferExpand] = useState(false);
  const styles: any = {
    open: { width: "100%" },
    close: { width: "100%" },
  };
  const transitions: any = ["height", "opacity", "background"];
  const options: any = [
    { value: "1d", label: "1 day", customAbbreviation: "1d" },
    { value: "2d", label: "2 days", customAbbreviation: "2d" },
    { value: "3d", label: "3 days", customAbbreviation: "3d" },
    { value: "7d", label: "7 days", customAbbreviation: "7d" },
    { value: "1m", label: "Bundles", customAbbreviation: "1m" },
  ];
  // Make Offer
  const [showOfferModal, setShowOfferModal] = useState<any>(false);
  const [offerPrice, setOfferPrice] = useState<any>(0);
  function onMakeOfferClose(value: number) {
    setShowOfferModal(false);
    setOfferPrice(value);
    console.log(offerPrice);
  }
  function submitOffer(value: number) {
    setOfferPrice(value);
    console.log(value);
  }
  // Sell page
  const [showSellModal, setShowSellModal] = useState(false);
  function onSellClose(value: number) {
    setShowSellModal(false);
    console.log(offerPrice);
  }
  // Listing
  const [showListingModal, setShowListingModal] = useState(false);
  function onListingClose(isListed: boolean) {
    setShowListingModal(false);
    if (isListed) fetchItem();
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
        axios
          .get(`/api/sync_block`)
          .then((res) => {
            setIsLoading(false);
            setShowBuyModal(false);
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
  };

  // About
  // const [isAboutExpand, setIsAboutExpand] = useState(false);
  // const [isDetailExpand, setIsDetailExpand] = useState(false);
  // const [isLocalExpand, setIsLocalExpand] = useState(false);
  // const [isPropertyExpand, setIsPropertyExpand] = useState(false);
  // const [isStatsExpand, setIsStatsExpand] = useState(false);
  // const [isLevelExpand, setIsLevelExpand] = useState(false);

  return (
    <div className="imageDetail">
      <div className="nftContainer">
        <div className="imgContaner">
          {(item.assetType === "video" || item.assetType === "audio") && (
            <ReactPlayer
              width="100%"
              height="100%"
              url={item.assetUrl}
              playing={true}
              controls
            />
          )}
          {item.assetType === "image" && (
            <img src={item.assetUrl} alt="icon" className="detail-img" />
          )}
        </div>
        {/* <div className="col-div br-div">
          <p className="billy-desc">{item.description}</p>

          {item.lockContent === "" ? (
            <div />
          ) : (
            <div>
              <div className="hline"></div>
              <div
                className="row-div cursor-pointer s-b mt-1"
                onClick={() => {
                  setIsLocalExpand(!isLocalExpand);
                }}
              >
                <h2 className="billy-header">
                  <LocalLibrary /> Lockable Content
                </h2>
                <h2 className="billy-header">
                  {!isLocalExpand ? <ExpandMore /> : <ExpandLess />}
                </h2>
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
          )}
        </div> */}
      </div>
      <div className="velas-club-container">
        <h1 style={{ textAlign: "left", color: "white", marginBottom: "20px" }}>
          “{item.name} ”
        </h1>
        <div className="place-bid-top">
          <div className="owned-created-by">
            <img src={avt} alt="" />
            <div>
              <span>Created By</span>
              <Link to="/">
                {loginStatus &&
                item.ownerUser &&
                item.ownerUser.address.toLowerCase() === account.toLowerCase()
                  ? "You"
                  : String(item.ownerUser && item.ownerUser.address)
                      .substring(2, 7)
                      .toUpperCase()}
              </Link>
            </div>
          </div>
          <br />
          <div className="owned-created-by">
            <img src={avt} alt="" />
            <div>
              <span>Owned By</span>
              <Link to="/">
                {loginStatus &&
                item.ownerUser &&
                item.ownerUser.address.toLowerCase() === account.toLowerCase()
                  ? "You"
                  : String(item.ownerUser && item.ownerUser.address)
                      .substring(2, 7)
                      .toUpperCase()}
              </Link>
            </div>
          </div>
          {/* <OwnedCreatedBy name="Ralf Garraway" title="Created By" /> */}
        </div>
        <div className="property-box">
          <div className="property-div">
            <div className="share-div">
              <Link to="/velas/velas-apes-club" className="link-blue">
                VELAS
              </Link>
              <div className="share-icons">
                <Refresh
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="share-icon"
                />
                <ShareOutlined className="share-icon" />
                <MoreVert className="share-icon" />
              </div>
            </div>
            {/* <h2 className="billy-header">{item.name}</h2> */}
            <div className="row-div">
              <p className="billy-desc">
                <Visibility /> 12 views
              </p>
              <p className="billy-desc hover-blue">
                <Favorite /> 1 favorite
              </p>
            </div>
            {/* <Timer /> */}
            {/* {loginStatus && oldData.auction && (
              <div>
                <div className="hline"></div>
                <div style={{ color: "white" }} className="col-div br-div">
                  Sales ends{" "}
                  {oldData.auction &&
                    new Date(
                      oldData.auction.endTime
                    ).toLocaleString("en-US", { timeZone: "America/New_York" })}
                </div>
              </div>
            )} */}
            <div className="hline"></div>
            <div className="countdown-bid-price">
              {loginStatus && oldData.auction && (
                <div className="countdown-bid-price-div">
                  <span>Highest Bid</span>
                  <span>
                    <strong>
                      {" "}
                      {oldData.auction && oldData.auction.price} VLX
                    </strong>
                    {/* <small> = $12.246</small> */}
                  </span>
                </div>
              )}
              {loginStatus && oldData.auction && (
                <Timer
                  downPhrase="Sales ends"
                  mintStartAt={oldData.auction.endTime}
                  itemDetails={true}
                />
              )}
            </div>
            <div className="hline"></div>
            <div className="col-div br-div">
              {/* {loginStatus && oldData.auction && (
                <div>
                  <p className="billy-desc m-b-5">Highest Bid</p>
                  <div className="row-div m-b-5">
                    <h2 className="billy-header">
                      {oldData.auction && oldData.auction.price} VLX
                    </h2>
                    <p className="billy-desc">($ 20.23)</p>
                  </div>
                </div>
              )} */}
              <div className="row-div auction-bids-btns">
                {/* {
								item.pair && item.pair.owner.toLowerCase() !== account.toLowerCase() &&
								<Button className="outLineBtn" onClick={() => setShowOfferModal(true)}>
									<Loyalty /> Make Offer
								</Button>
							} */}

                <Button
                  itemDetails={true}
                  icon={<Loyalty />}
                  label="Buy Now"
                  className="send-message item-detail m-b-5"
                  onClick={() => setShowBuyModal(true)}
                />
                {loginStatus &&
                  item.pair &&
                  item.pair.owner.toLowerCase() !== account.toLowerCase() && (
                    <Button
                      itemDetails={true}
                      icon={<Loyalty />}
                      label="Buy Now"
                      className="send-message item-detail"
                      onClick={() => setShowBuyModal(true)}
                    />
                  )}
                {loginStatus &&
                  !item.pair &&
                  oldData.auction &&
                  oldData.auction.owner.toLowerCase() !==
                    account.toLowerCase() && (
                    <Button
                      onClick={() => onPlaceBidModal()}
                      itemDetails={true}
                      icon={<ShoppingBag />}
                      label="Place a bid"
                      className="send-message item-detail m-b-5"
                    />
                  )}
                {/* {loginStatus &&
                  !item.pair &&
                  !oldData.auction &&
                  oldData.owner.toLowerCase() === account.toLowerCase() && (
                    <Button
                    label='Sell
                      className="send-message item-detail m-b-5"
                      onClick={() => setShowListingModal(true)}
                    />
                  )} */}
                {/* <Button
                  className="send-message item-detail m-b-5"
                  onClick={() => setShowListingModal(true)}
                  label="Sell"
                />
                <Button
                  className="send-message item-detail m-b-5"
                  label="Cancel Selling"
                  onClick={() => setShowCancelListingModal(true)}
                /> */}
                {loginStatus &&
                  item.pair &&
                  !oldData.auction &&
                  item.pair.owner.toLowerCase() === account.toLowerCase() && (
                    <Button
                      className="outLineBtn"
                      label="Cancel Selling"
                      onClick={() => setShowCancelListingModal(true)}
                    />
                  )}
              </div>
            </div>
            <div className="hline"></div>
            {item.auction && (
              <div>
                <div className="hline"></div>
                <div className="col-div p-t-10 p-b-10">
                  <div
                    className="row-div cursor-pointer s-b"
                    onClick={() => {
                      setIsPriceExpand(!isPriceExpand);
                    }}
                  >
                    <h2 className="billy-header">
                      <Timeline /> Price History
                    </h2>
                    <h2 className="billy-header">
                      {!isPriceExpand ? <ExpandMore /> : <ExpandLess />}
                    </h2>
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
                        instanceId="chainSelect"
                        className="select-gray flex-1 m-r-5"
                      />
                      {oldData.auction.bids.length > 0 ? (
                        <div className="col-div aic jcc">
                          {oldData.auction.bids.map((bid: any, key: any) => {
                            console.log(bid.bidPrice); // 0.002
                            console.log(bid.timestamp); //ex : 1653574771
                            //This should be filtered by above selected date.
                            return (
                              <div key={key}>
                                {/* TODO display graph */}
                                {bid.bidPrice}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="col-div aic jcc">
                          <img src="/assets/no-chart-data.svg" alt="" />
                          <p className="billy-desc">No Price yet</p>
                        </div>
                      )}
                    </div>
                  </Expand>
                </div>
                <div className="hline"></div>
                <div className="col-div p-t-10 p-b-10">
                  <div
                    className="row-div cursor-pointer s-b"
                    onClick={() => {
                      setIsBidExpand(!isBidExpand);
                    }}
                  >
                    <h2 className="billy-header">
                      <List /> Bid
                    </h2>
                    <h2 className="billy-header">
                      {!isBidExpand ? <ExpandMore /> : <ExpandLess />}
                    </h2>
                  </div>
                  <Expand
                    open={isBidExpand}
                    duration={300}
                    styles={styles}
                    transitions={transitions}
                  >
                    <div className="col-div p-t-10 p-b-10">
                      {oldData.auction && oldData.auction.bids.length > 0 ? (
                        <div className="col-div aic jcc">
                          {/* //TODO this data display */}
                          <div>Price</div>
                          <div>Expiration</div>
                          <div>From</div>
                          {oldData.auction.bids.map((bid: any, key: any) => {
                            return (
                              <div key={key}>
                                <div>{bid.bidPrice}</div>
                                <div>
                                  {Math.ceil(
                                    // (parseFloat(item.auction.endTime) -
                                    //   parseFloat(bid.timestamp)) /
                                    (oldData.auction.endTime - bid.timestamp) /
                                      (60 * 60 * 24)
                                  )}{" "}
                                  days
                                </div>
                                <div>
                                  {String(bid.from)
                                    .substring(2, 7)
                                    .toUpperCase()}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="col-div aic jcc">
                          <img src="/assets/empty-asks.svg" alt="" />
                          <p className="billy-desc">No Bid yet</p>
                        </div>
                      )}
                    </div>
                  </Expand>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="place-bid-nav-items">
          <Tab.Container defaultActiveKey="item activity">
            <Nav className="place-bid-nav-item-container">
              {/* <Nav.Item>
                <Nav.Link eventKey="bid-history" className="title-font">
                  Bid History
                </Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
                <Nav.Link eventKey="info" className="title-font">
                  Info
                </Nav.Link>
              </Nav.Item> */}
              {/* <Nav.Item>
              <Nav.Link eventKey="provenance" className="title-font">
                Provenance
              </Nav.Link>
            </Nav.Item> */}
              <Nav.Item>
                <Nav.Link eventKey="item activity" className="title-font">
                  Item Activity
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="details" className="title-font">
                  Details
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className="title-font">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="properties" className="title-font">
                  Properties
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="stats" className="title-font">
                  Stats
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="level" className="title-font">
                  Level
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="items-container-tabs">
              <Tab.Pane eventKey="item activity">
                <div className="place-bid-data-detail">
                  {item.events.length > 0 ? (
                    <div className="col-div aic jcc">
                      <div>Event</div>
                      <div>Price</div>
                      <div>From</div>
                      <div>To</div>
                      <div>Date</div>
                      {item.events.map((event: any, key: any) => {
                        return (
                          <div key={key}>
                            <div>{event.name}</div>
                            <div>
                              {/* //ethereum icon*/}
                              {event.price}ETH
                            </div>
                            <div>
                              {event.from === account && loginStatus
                                ? "You"
                                : String(event.from)
                                    .substring(2, 7)
                                    .toUpperCase()}
                            </div>
                            <div>
                              {event.to === account && loginStatus
                                ? "You"
                                : String(event.to)
                                    .substring(2, 7)
                                    .toUpperCase()}
                            </div>
                            <div>
                              {Math.floor(new Date().getTime() / 1000) -
                                parseFloat(event.timestamp)}{" "}
                              days ago
                            </div>
                            {/* this can be seconds ago, mins ago, hours ago, or days ago */}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="col-div aic jcc">
                      <img src="/assets/no-chart-data.svg" alt="" />
                      <p className="billy-desc">No item activity yet</p>
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="bid-history">
                <div className="place-bid-data-detail">
                  {/* <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} />
                <BidHistory bidHistory={true} /> */}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="info">
                <div className="place-bid-data-detail">
                  {/* <BidHistory /> */}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="about">
                <div className="place-bid-data-detail">
                  <p>
                    This is default collection for boatsail nft marketplace.
                  </p>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="details">
                <div className="place-bid-data-detail">
                  <div className="col-div aic jcc">
                    <div className="row-div cursor-pointer s-b">
                      <p>Contract Address</p>
                      <a
                        href="https://testnets.opensea.io/0x5367b4557D29cE1Ce3F333Ba1ad155d6A1754C68"
                        target={"_blank"}
                        rel="noreferrer"
                        className="billy-desc"
                      >
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
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="stats">
                <div className="place-bid-data-detail">
                  <div className="col-div aic jcc w-100">
                    {item.stats && item.stats.length > 0 ? (
                      <div>
                        {item.stats.map((stat: any, key: any) => {
                          return (
                            <li key={key} className="with-border">
                              <div className="name">{stat.name}</div>
                              <div className="value text-white">
                                {stat.value}
                              </div>
                              <div className="value text-white">
                                {stat.total}
                              </div>
                            </li>
                          );
                        })}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="level">
                <div className="place-bid-data-detail">
                  <div className="col-div aic jcc w-100">
                    {item.levels && item.levels.length > 0 ? (
                      <div>
                        {item.levels.map((level: any, key: any) => {
                          return (
                            <li key={key} className="with-border">
                              <div className="name">{level.name}</div>
                              <div className="value text-white">
                                {level.value}
                              </div>
                              <div className="value text-white">
                                {level.total}
                              </div>
                            </li>
                          );
                        })}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="properties">
                <div className="place-bid-data-detail">
                  <div className="col-div aic jcc w-100">
                    {item.properties && item.properties.length > 0 ? (
                      <div>
                        {item.properties.map((property: any, key: any) => {
                          return (
                            <li key={key} className="with-border">
                              <div className="name">{property.type}</div>
                              <div className="value text-white">
                                {property.name}
                              </div>
                            </li>
                          );
                        })}
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
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
};

export default ItemDetail;
