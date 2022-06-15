import { ShareOutlined, ExpandLess, LocalLibrary } from "@material-ui/icons";
import Accordion from "react-bootstrap/Accordion";
import { BsInfoCircleFill } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import TradingHistory from "../../components/TradingHistory/TradingHistory";
import Timer from "../../components/timer/Timer";
import { ReactComponent as NoChartData } from "../../assets/no-chart-data.svg";
import { ReactComponent as ShoppingBag } from "../../assets/icons/shopping-bag.svg";
import { ReactComponent as EmptyAsks } from "../../assets/empty-asks.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  // Loupe,
  // ViewList,
  MoreVert,
  Refresh,
  Visibility,
  Favorite,
  Loyalty,
  ExpandMore,
  Timeline,
  List,
  // Description,
} from "@material-ui/icons";

// import TaskIcon from "@mui/icons-material/Task";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
// import AssessmentIcon from "@mui/icons-material/Assessment";
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
// import { data } from "./itemdetailpage_example_data";
import AccordionComponent from "../Accordion/Accordion";
// import ItemActivityTable from "../Table/Table";
import { BiDetail } from "react-icons/bi";
import ItemDetailFilter from "../MoreComponents/ItemDetailFilter";
// import SellPage from "../../pages/sale/SellPage";
import BuyNowPage from "../../pages/sale/BuyNowPage";
import { CartesianAxis } from "recharts";
import BiddingHistory from "../TradingHistory/BiddingHistory";
// import BidModal from "../connectModal/BidModal";

const ItemDetail = (props: any) => {
  const { item, fetchItem, rate } = props;
  const { connector, library, chainId, account, active }: any = useWeb3React();
  const [loginStatus, setLoginStatus] = useState(false);
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
    if (!loginStatus) {
      toast.error("Please connect your wallet.");
      return;
    }
    if (item?.auction.owner.toLowerCase() === account.toLowerCase()) {
      toast.error("You are owner of this item.");
      return;
    }
    setShowPlaceBidModal(true);
  }

  // function onPlaceBidClose(value: any) {
  //   setShowPlaceBidModal(false);
  //   setBidPrice(value);
  // }
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
  // const [isEventExpand, setIsEventExpand] = useState(false);
  const [isBidExpand, setIsBidExpand] = useState(false);
  // const [isOfferExpand, setIsOfferExpand] = useState(false);
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
  // const [showSellModal, setShowSellModal] = useState(false);

  // function onSellClose(value: number) {
  //   setShowSellModal(false);
  //   console.log(offerPrice);
  // }
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
    if (!loginStatus) {
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
      item?.pair.id,
      item?.pair.price,
      chainId,
      library.getSigner()
    ).then((tokenId) => {
      if (tokenId) {
        axios
          .get(`/sync_block`)
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
  // const onBidAccept = (bid: any) => {
  //   // The logic to accept bid.
  // };

  // About
  // const [isAboutExpand, setIsAboutExpand] = useState(false);
  // const [isDetailExpand, setIsDetailExpand] = useState(false);
  const [isLocalExpand, setIsLocalExpand] = useState(false);
  // const [isPropertyExpand, setIsPropertyExpand] = useState(false);
  // const [isStatsExpand, setIsStatsExpand] = useState(false);
  // const [isLevelExpand, setIsLevelExpand] = useState(false);

  const data = [
    {
      name: "1/2",
      name2: "A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "1/3",
      name2: "B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "1/4",
      name2: "C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "1/5",
      name2: "D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "1/6",
      name2: "E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "1/7",
      name2: "F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "1/8",
      name2: "G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="image-details__accordion">
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
          <div className="col-div br-div">
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
          </div>
          <Accordion
            style={{ width: "100%" }}
            defaultActiveKey={["0"]}
            alwaysOpen
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <BiDetail /> Description{" "}
              </Accordion.Header>
              <Accordion.Body>
                <div>
                  <span>Created By</span>
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    to={{
                      pathname: "/account/" + item?.ownerUser.address,
                      search: "?tab=collections",
                    }}
                  >
                    {loginStatus &&
                    item?.ownerUser.address.toLowerCase() ===
                      account.toLowerCase()
                      ? "You"
                      : String(item.ownerUser && item.ownerUser.address)
                          .substring(2, 7)
                          .toUpperCase()}
                  </Link>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <br />
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <BsInfoCircleFill /> About{" "}
              </Accordion.Header>
              <Accordion.Body>{item?.description}</Accordion.Body>
            </Accordion.Item>
            <br />
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <TbListDetails /> Details{" "}
              </Accordion.Header>
              <Accordion.Body>
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
                    <p>{item.royalty}%</p>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br />
        </div>
        <div className="velas-club-container">
          <h1
            style={{ textAlign: "left", color: "white", marginBottom: "20px" }}
          >
            “{item.name}”
          </h1>
          {/* <div className="place-bid-top">
            <div className="owned-created-by">
              <img src={avt} alt="" />
            </div>
            <br />
            <div className="owned-created-by">
              <img src={avt} alt="" />
              <div></div>
            </div>
          </div> */}
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
                <span style={{ color: "white", marginRight: "10px" }}>
                  Owned By
                </span>
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  to={{
                    pathname: "/account/" + item?.ownerUser.address,
                    search: "?tab=collections",
                  }}
                >
                  {loginStatus &&
                  item.ownerUser &&
                  item.ownerUser.address.toLowerCase() === account.toLowerCase()
                    ? "You"
                    : String(item.ownerUser && item.ownerUser.address)
                        .substring(2, 7)
                        .toUpperCase()}
                  {!loginStatus &&
                    String(item.ownerUser && item.ownerUser.address)
                      .substring(2, 7)
                      .toUpperCase()}
                </Link>
                <p className="billy-desc">
                  <Visibility /> 12 views
                </p>
                <p className="billy-desc hover-blue">
                  <Favorite /> 1 favorite
                </p>
              </div>
              <div className="hline"></div>
              {item?.lastSold !== 0 && (
                <div className="countdown-bid-price">
                  <div className="countdown-bid-price-div">
                    <span>Last Sold Price</span>
                    <span>
                      <strong> {item?.lastSold} VLX</strong>
                      <small> = {(item?.lastSold * rate).toFixed(3)} USD</small>
                    </span>
                  </div>
                </div>
              )}
              {item?.lastBid !== 0 && (
                <div className="countdown-bid-price">
                  <div className="countdown-bid-price-div">
                    <span>Highest Bid Price</span>
                    <span>
                      <strong> {item?.lastBid} VLX</strong>
                      <small> = {(item?.lastBid * rate).toFixed(3)} USD</small>
                    </span>
                  </div>
                </div>
              )}
              <div className="countdown-bid-price">
                {item?.auction && (
                  <div className="countdown-bid-price-div">
                    <span>Current Bid Price</span>
                    <span>
                      <strong> {item?.auction.price} VLX</strong>
                      <small>
                        {" "}
                        = {(item?.auction.price * rate).toFixed(3)} USD
                      </small>
                    </span>
                  </div>
                )}
                {item?.pair && (
                  <div className="countdown-bid-price-div">
                    <span>Current Price</span>
                    <span>
                      <strong> {item?.pair.price} VLX</strong>
                      <small>
                        {" "}
                        = {(item?.pair.price * rate).toFixed(3)} USD
                      </small>
                    </span>
                  </div>
                )}
                {!item?.pair && !item?.auction && (
                  <div className="countdown-bid-price-div">
                    <span>Not Listed</span>
                  </div>
                )}
                {loginStatus && item?.auction && (
                  <Timer
                    downPhrase="Sales ends"
                    mintStartAt={item?.auction.endTime}
                    itemDetails={true}
                  />
                )}
              </div>
              <div className="hline"></div>
              <div className="col-div br-div">
                <div className="row-div auction-bids-btns">
                  {loginStatus &&
                    item?.pair &&
                    item?.pair.owner.toLowerCase() !==
                      account.toLowerCase() && (
                      <Button
                        itemDetails={true}
                        icon={<Loyalty />}
                        label="Buy Now"
                        className="send-message item-detail"
                        onClick={() => setShowBuyModal(true)}
                      />
                    )}
                  {loginStatus &&
                    !item?.pair &&
                    item?.auction &&
                    item?.auction.owner.toLowerCase() !==
                      account.toLowerCase() && (
                      <Button
                        onClick={() => onPlaceBidModal()}
                        itemDetails={true}
                        icon={<ShoppingBag />}
                        label="Place a bid"
                        className="send-message item-detail m-b-5"
                      />
                    )}
                  {loginStatus &&
                    !item.pair &&
                    !item?.auction &&
                    item?.owner.toLowerCase() === account.toLowerCase() && (
                      <Button
                        label="Sell"
                        className="send-message item-detail m-b-5"
                        onClick={() => setShowListingModal(true)}
                      />
                    )}
                  {loginStatus &&
                    (item.pair || item?.auction) &&
                    item.itemOwner.toLowerCase() === account.toLowerCase() && (
                      <Button
                        className="send-message item-detail m-b-5"
                        label="Cancel Listing"
                        onClick={() => setShowCancelListingModal(true)}
                      />
                    )}
                </div>
              </div>
              <div className="hline"></div>
              {item.auction && (
                <Accordion
                  style={{ width: "100%" }}
                  defaultActiveKey={["0"]}
                  alwaysOpen
                >
                  <br />
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <Timeline /> Price History
                    </Accordion.Header>
                    <Accordion.Body>
                      {item?.auction.bids?.length > 0 ? (
                        <div className="col-div aic jcc">
                          {item?.auction.bids.map((bid: any, key: any) => {
                            console.log(bid.bidPrice); // 0.002
                            console.log(bid.timestamp); //ex : 1653574771
                            //This should be filtered by above selected date.
                            return (
                              <div key={key}>
                                {/* TODO display graph */}
                                {/* {bid.bidPrice} */}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="col-div aic jcc">
                          <img src="/assets/no-chart-data.svg" alt="" />
                          {/* <NoChartData /> */}
                          <p className="billy-desc">No Price yet</p>
                          {/* <ResponsiveContainer width="100%" height="100%"> */}
                          <LineChart
                            width={500}
                            height={200}
                            data={data}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid
                              vertical={false}
                              strokeDasharray="1"
                            />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="pv"
                              stroke="#8884d8"
                              activeDot={{ r: 8 }}
                            />
                          </LineChart>
                          {/* </ResponsiveContainer> */}
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                  <br />
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <List /> Bid
                    </Accordion.Header>
                    <Accordion.Body>
                      {item?.auction.bids?.length > 0 ? (
                        <BiddingHistory item={item} />
                      ) : (
                        // <div className="col-div aic jcc">
                        //   {/* //TODO this data display */}
                        //   <div>Price</div>
                        //   <div>Expiration</div>
                        //   <div>From</div>
                        //   {item?.auction.bids.map((bid: any, key: any) => {
                        //     return (
                        //       <div key={key}>
                        //         <div>{bid.bidPrice}</div>
                        //         <div>
                        //           {Math.ceil(
                        //             // (parseFloat(item.auction.endTime) -
                        //             //   parseFloat(bid.timestamp)) /
                        //             (item?.auction.endTime - bid.timestamp) /
                        //               (60 * 60 * 24)
                        //           )}{" "}
                        //           days
                        //         </div>
                        //         <div>
                        //           {String(bid.from)
                        //             .substring(2, 7)
                        //             .toUpperCase()}
                        //         </div>
                        //       </div>
                        //     );
                        //   })}
                        // </div>
                        <div className="col-div aic jcc">
                          <img src="/assets/empty-asks.svg" alt="" />
                          <EmptyAsks />
                          <p className="billy-desc">No Bid yet</p>
                        </div>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
            </div>
          </div>
          <AccordionComponent
            loginStatus={loginStatus}
            account={account}
            item={item}
          />
        </div>
        {showPlaceBidModal && (
          <PlaceBid
            onClose={closePlaceBidModal}
            onSubmit={submitPlaceBid}
            balance={balance}
            nftFee={0}
            rate={rate}
          />
        )}
        {showOfferModal && (
          <MakeOffer
            onClose={onMakeOfferClose}
            onSubmit={submitOffer}
            balance={balance}
            nftFee={0}
            rate={rate}
          />
        )}
        {showBuyModal && (
          <BuyNowPage
            onClose={onBuyClose}
            onSubmit={submitBuy}
            balance={balance}
            nftFee={0}
            rate={rate}
          />
        )}
        {showListingModal && (
          <ListItemSalePage
            onClose={onListingClose}
            onSubmit={onCancelListing}
            balance={balance}
            nftFee={0}
            item={item}
            rate={rate}
          />
        )}
        {showCancelListingModal && (
          <CancelListPage
            onClose={onCancelListingClose}
            onSubmit={onCancelListing}
            balance={balance}
            nftFee={0}
            rate={rate}
          />
        )}
      </div>
      <Accordion
        className="item-activity__accordion"
        style={{ width: "100%" }}
        defaultActiveKey={["0"]}
        alwaysOpen
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <FiActivity /> Item Activity
          </Accordion.Header>
          <Accordion.Body style={{ width: "100%" }}>
            <ItemDetailFilter />
            <TradingHistory
              account={account}
              loginStatus={loginStatus}
              item={item}
            />
            {/* <ItemActivityTable loginStatus={loginStatus} item={item} /> */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ItemDetail;
