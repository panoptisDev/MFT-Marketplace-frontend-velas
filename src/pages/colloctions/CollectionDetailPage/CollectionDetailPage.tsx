import { useEffect, useState } from "react";
import { Edit, ViewList, Add, MoreVert, PhotoFilter, History } from '@material-ui/icons';
import Tooltip from "@material-ui/core/Tooltip";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import './CollectionDetailPage.scss'
import Topbar from "components/topbar/Topbar";
import Loading from "components/loading/Loading";
import { useMediaQuery } from "react-responsive";
import Menu from "components/menu/Menu";
import CollectionTabBody from "../../../components/profile/tabBody/CollectionTabBody";
import { useWeb3React } from "@web3-react/core";

const CollectionDetailPage = (props) => {

    const { user } = props;
    const [collection, setCollection] = useState(null);
    const [items, setItems] = useState([]);
    const location = useLocation();
    useEffect(() => {
        if (!collection) {
            fetchCollection();
        }
    }, [collection]);

    function fetchCollection() {
        const urlData = location.pathname;
        const collectionName = urlData.split("/")[urlData.split("/").length - 1]
        axios.get(`/collection/detail/${collectionName}`)
            .then(res => {
                setCollection(res.data.collection);
                setItems(res.data.items);
            })
            .catch((err) => {
                setCollection(null);
                setItems([]);
            });
    }

    const [loginStatus, setLoginStatus] = useState(false);
    const { connector, library, chainId, account, active } = useWeb3React();
    useEffect(() => {
        const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
        setLoginStatus(isLoggedin);
    }, [connector, library, account, active, chainId]);

    const [searchedUrl, setSearchedUrl] = useState('Items')

    useEffect(() => {
        setSearchedUrl("Items");
    })

    const goToPage = (url: string) => {
        props.history.push({
            pathname: '/account',
            search: `?tab=${url}`,
            state: { address: props.userAddress }
        })
        setSearchedUrl(url);
    };
    const tab = "items";

    const showMoreActions = (e) => {
        e.preventDefault();
        // setAnchorElTop(e.currentTarget);
    }
    const [isLoading, setIsLoading] = useState(false);
    const [isTopLoading, setIsTopLoading] = useState(false);
    const [sectionHeight, setSectionHeight] = useState("0vh");
    const [loadingHeight, setLoadingHeight] = useState(0);

    const [menuOpen, setMenuOpen] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: "screen and (max-width: 450px) and (orientation:portrait)", });
    const isLandOrMobile = useMediaQuery({ query: "screen and (max-height: 450px) and (orientation:landscape)", });
    useEffect(() => {
        if (isLoading || isTopLoading) {
            setLoadingHeight(100)
            setSectionHeight("0vh")
        }
        else {
            setLoadingHeight(0)
            setSectionHeight("100%")
        }

        if (!isLandOrMobile && !isTabletOrMobile) {
            setMenuOpen(false);
        }
    }, [isLoading, isTabletOrMobile, isLandOrMobile, isTopLoading]);

    window.onload = () => {
        setIsLoading(false)
        setIsTopLoading(false)

    };

    return (
        <>
            <Topbar user={user} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setIsLoading={setIsTopLoading} />
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className='page collectionPage'>
                <div className="loding" style={{ width: "100%", height: loadingHeight + "%", display: loadingHeight === 0 ? 'none' : 'flex' }}>
                    <Loading />
                </div>
                <div className="sections" style={{ width: "100%", height: sectionHeight }}>
                    <div className="container">
                        <label className="banner-box">
                            {
                                collection && collection.banner_uri !== "" && <img src={collection.banner_uri} className="banner-img" alt="" />
                            }
                        </label>
                        <div className="sub-box">
                            <div className="watch-box">
                                <button className="watch-btn m-r-5 m-l-10"><Add />WatchList</button>
                                <button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
                            </div>
                            <div className="user-info-box">
                                <label className="avatar-box">
                                    {collection && collection.logo_uri && <img src={collection.logo_uri} className="avatar-img" alt="" />}
                                </label>
                                <h2 className="user-name m-0">{collection && collection.name}</h2>
                            </div>
                            {
                                collection && collection.owner.toLowerCase() === account.toLowerCase() ?
                                <div className="setting-box">
                                    <button className="add-btn">Add Item</button>
                                    <div className="setting-container">
                                        <div className="share-btn" onClick={showMoreActions}>
                                            <Edit />
                                        </div>
                                        <Link to="/collections/untitled-collection-316120299/payouts">
                                            <Tooltip
                                                id="tooltip-top"
                                                title="Creator Earnings"
                                                placement="top"
                                                classes={{ tooltip: "tooltip" }}
                                            >
                                                <div className="setting-btn">
                                                    <ViewList />
                                                </div>
                                            </Tooltip>
                                        </Link>
                                    </div>
                                </div> : <div className="setting-box"/>
                            }

                        </div>
                        <div className="mobile-func-box">
                            <div className="watch-box">
                                <button className="watch-btn m-r-5"><Add />WatchList</button>
                                <button className="watch-btn m-l-5 icon-btn"><MoreVert /></button>
                            </div>
                            <div className="setting-box">
                                <button className="add-btn">Add Item</button>
                                <div className="setting-container">
                                    <div className="share-btn" onClick={showMoreActions}>
                                        <Edit />
                                    </div>
                                    <Link to="/collections/untitled-collection-316120299/payouts">
                                        <Tooltip
                                            id="tooltip-top"
                                            title="Creator Earnings"
                                            placement="top"
                                            classes={{ tooltip: "tooltip" }}
                                        >
                                            <div className="setting-btn">
                                                <ViewList />
                                            </div>
                                        </Tooltip>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-box m-t-20">
                                <div className="detail-item item-1">
                                    <p className="value-label">{items.length}</p>
                                    <p className="m-0">items</p>
                                </div>
                                <div className="detail-item item-2">
                                    <p className="value-label">1</p>
                                    <p className="m-0">owner</p>
                                </div>
                                <div className="detail-item item-3">
                                    <p className="value-label"><img src="/img/parts/ether.png" className="eth-icon" alt="" />---</p>
                                    <p className="m-0">floor price</p>
                                </div>
                                <div className="detail-item item-4">
                                    <p className="value-label"><img src="/img/parts/ether.png" className="eth-icon" alt="" />0.00</p>
                                    <p className="m-0">volume traded</p>
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }} className="m-t-20">Welcome to the home of Untitled Collection #316120299 on OpenSea.</div>
                            <div style={{ textAlign: "center" }}>Discover the best items in this collection.</div>
                            <div className="hline"></div>
                            <CollectionTabBody {...props} tab={tab} items={items} />
                        </div>

                    </div>
                </div>
                <img src="/assets/home_bg.jpg" alt="" className="bg1" />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    // TODO get items of collection from params.companyName, params.groupName
    const userInfo = {}
    return {
        props: {
            userInfo
        }
    }
}

export async function getStaticPaths() {
    // TODO get collection names from db.
    const paths =
        [
            {
                params: {
                    id: "untitled-collection-316120299",
                }
            },
        ]
    return {
        paths,
        fallback: false
    }
}

export default CollectionDetailPage;